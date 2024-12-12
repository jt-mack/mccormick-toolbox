<template>
  <div class="overflow-auto">
    <slot name="filters">
      <!-- <div class="search-bar" style="margin-bottom: 1rem;">
        <InputText
            v-model="searchQuery"
            placeholder="Search..."
            style="width: 100%;"
        />
      </div> -->
    </slot>
    <DataTable
        v-bind="$attrs"
        :size="size"
        :value="filteredData"
        paginator
        :lazy="lazy"
        :rows="rowsPerPage"
        :rowsPerPageOptions="[5, 10, 20]"
        :totalRecords="filteredData.length"
        :sortField="sortField"
        :sortOrder="sortOrder"
        :loading="isLoading"
        scrollable
        scroll-height="fit"
        @page="onPage"
        @sort="onSort"
    >
    <template #header>
        <div class="flex flex-wrap gap-2 align-items-center justify-content-between">
            <h4 class="m-0">{{title}}</h4>
            <IconField>
                <InputIcon>
                    <i class="pi pi-search" />
                </InputIcon>
                <InputText v-model="searchQuery" placeholder="Search..." />
            </IconField>
        </div>
    </template>
    <template #empty>
      <div class="flex justify-content-center gap-2 my-auto align-items-center py-2"><i class="pi pi-database"></i><span>No Data Found</span></div>
    </template>
      <Column
          v-for="col in columnsToRender"
          :key="col.field"
          :field="col.field"
          :header="toProperCase(col.header)"
          sortable
      >
        <template #body="{ data }">
          {{ data[col.field] instanceof Date ? data[col.field].toLocaleDateString() : data[col.field] }}
        </template>
      </Column>
      <Column class="w-24 !text-end" v-if="routeName">
        <template #body="{ data }">
          <Button v-if="data?.id" icon="pi pi-arrow-up-right"
                  @click="router.push({name:routeName,params:{id:data?.id}})"
                  severity="secondary" rounded></Button>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script setup lang="ts">
import {computed, ref, toRefs} from 'vue';
import InputText from 'primevue/inputtext';
import DataTable from 'primevue/datatable';
import {toProperCase} from "@/utils";
import {useRouter} from "vue-router";
import type {PropType} from "vue";
import type {DataTableSortEvent} from "primevue/datatable";

import {useIpcLoader} from "../composables";

const {isLoading} = useIpcLoader();
const router = useRouter();

interface TableColumn {
  field: string;
  header: string;
}

// Props definition
const props = defineProps({
  data: {
    type: Array as PropType<Record<string, any> []>,
    required: true,
  },
  title:{
    type: String,
    required:false,
    default:' '
  },
  size: {
    type: String as PropType<undefined | 'small' | 'large'>,
    default: 'small'
  },
  columns: {
    type: Array as PropType<TableColumn[]>,
    default: null,
  },
  rowsPerPage: {type: Number, default: 10},
  navigate: {
    type: Function,
    required: false,
    default: null
  },
  routeName: {
    type: String,
    required: false,
    default: null
  },
  lazy: {
    type: Boolean,
    required: false,
    default: false
  }
});

// Props destructuring with defaults
const {data, columns = null, rowsPerPage} = toRefs(props);

const searchQuery = ref<string>('');
const currentPage = ref<number>(0);

const sortField = ref<string | undefined>(undefined);
const sortOrder = ref<number>(1); // 1 = ascending, -1 = descending

// Dynamically compute columns if not provided
const columnsToRender = computed(() => {
  if (columns?.value && columns.value?.length > 0) {
    return columns.value;
  }
  if (data.value.length > 0) {
    return Object.keys(data.value[0]).map((key) => ({
      field: key,
      header: key.charAt(0).toUpperCase() + key.slice(1),
    }));
  }
  return [];
});

// Filtered data based on search query
const filteredData = computed(() =>
    searchQuery.value ? data.value.filter((item) =>
        Object.values(item).some((value) =>
            String(value).toLowerCase().includes(searchQuery.value.toLowerCase())
        )
    ) : data.value
);

// Sort filtered data
const sortedData = computed(() => {
  if (!sortField.value) {
    return filteredData.value;
  }
  return [...filteredData.value].sort((a, b) => {
    const valueA = a[sortField.value as string];
    const valueB = b[sortField.value as string];
    if (valueA == null || valueB == null) return 0;
    return (
        (String(valueA).localeCompare(String(valueB)) || 0) *
        (sortOrder.value as number)
    );
  });
});

// Paginated data for the current page
const paginatedData = computed(() => {
  const start = currentPage.value * rowsPerPage.value;
  const end = start + rowsPerPage.value;
  return sortedData.value.slice(start, end);
});

// Update current page when pagination changes
const onPage = (event: { page: number }) => {
  currentPage.value = event.page;
};


// Update sorting field and order
const onSort = (event: DataTableSortEvent) => {
  sortField.value = event.sortField as string;
  sortOrder.value = event?.sortOrder as number;
};
</script>

<style scoped>
.search-bar {
  margin-bottom: 1rem;
}
</style>

