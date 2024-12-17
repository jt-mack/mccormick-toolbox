<template>
  <div class="flex h-full">
    <l-map id="map" ref="map" v-model:zoom="zoom" :center="[-83.83515321156932,34.20828612979084]">
      <l-tile-layer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          layer-type="base"
          name="OpenStreetMap"
      ></l-tile-layer>
      <l-geo-json :geojson="HallJson" :style="{opacity: 5, color:'#fff'}"></l-geo-json>
    </l-map>
  </div>
</template>

<script setup lang="ts">
import "leaflet/dist/leaflet.css";
import {ref} from "vue";
import * as L from "leaflet";
import {LMap, LTileLayer, LGeoJson} from "@vue-leaflet/vue-leaflet";

import HallJson from '../../shared/utils/temp/Hall.json';


// import fs from 'node:fs';
// import path from 'node:path';

// const json=fs.readFileSync(path.resolve(__dirname,'shared/utils/temp/Hall.json'), 'utf8');

const zoom = ref(15);

const geoStyler= (feature) => ({
  opacity: feature.properties.code / 100000,
});
</script>

<style>
#map {
  flex: 1;
  height: 100%;
  width: 100%;
}
</style>