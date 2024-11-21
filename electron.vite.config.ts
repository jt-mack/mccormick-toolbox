// import { defineConfig } from 'electron-vite'
// import vue from '@vitejs/plugin-vue'
//
// export default defineConfig({
//   main: {
//     build: {
//       lib: {
//         entry: 'electron/main.ts',
//       },
//       rollupOptions: {
//         input: 'electron/main.ts',
//         external: ['mssql']
//       }
//     }
//   },
//   preload: {
//     build: {
//       rollupOptions: {
//         external: ['electron']
//       }
//     }
//   },
//   renderer: {
//     plugins: [vue()]
//   }
// })
// import { resolve } from 'path'
// import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
// import vue from '@vitejs/plugin-vue'
//
// export default defineConfig({
//   main: {
//     plugins: [externalizeDepsPlugin(), vue()],
//     build:{
//       lib:{
//         entry: 'electron/main.ts',
//       }
//     },
//   },
//   preload: {
//     plugins: [externalizeDepsPlugin()],
//     build:{
//       lib:{
//         entry: 'electron/preload.ts',
//       }
//     },
//   },
//
//   renderer: {
//     resolve: {
//       alias: {
//         '@renderer': resolve('.')
//       }
//     },
//     build: {
//       rollupOptions: {
//         input: {
//           main: resolve(__dirname, 'index.html'),
//           renderer: resolve(__dirname, 'src/main.ts')
//         }
//       },
//     },
//     plugins: [vue()]
//   },
// })