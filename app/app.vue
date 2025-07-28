<script setup lang="ts">
import Uppy from '@uppy/core'
import type { TusBody } from '@uppy/tus'
import Tus from '@uppy/tus'
import { Dashboard } from '@uppy/vue'

import '@uppy/core/dist/style.min.css'
import '@uppy/dashboard/dist/style.min.css'
import { useFetch } from 'nuxt/app'

const { $trpc } = useNuxtApp()

let uppy: Uppy<TusBody, Record<string, never>>
onMounted(() => {
  uppy = new Uppy<TusBody, Record<string, never>>({
    debug: true,
    restrictions: { allowedFileTypes: ['image/*'] },
  }).use(Tus, {
    endpoint: 'api/tus/upload', // we need to add the /upload
    removeFingerprintOnSuccess: true,
  })

  uppy.on('upload-success', async () => await refresh())
})

const { data: files, refresh } = useFetch('/api/files')

const remove = async (id: string) => {
  await $fetch(`/api/tus/${id}`, {
    method: 'DELETE',
    headers: { 'tus-resumable': '1.0.0' },
  })
  await refresh()
}
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-4 p-4">
    <div>
      <ClientOnly>
        <Dashboard :uppy="uppy" />
      </ClientOnly>
    </div>

    <ul>
      <li
        v-for="f in files"
        :key="f"
        class="flex gap-2"
      >
        <span
          class="hover:underline hover:cursor-pointer"
          @click="async () => await remove(f)"
        >X</span>
        <span>{{ f }} </span>
      </li>
    </ul>
  </div>
</template>

<style>
html {
  scrollbar-gutter: stable;
}
</style>
