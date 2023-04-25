<script lang="ts" setup>
import { createAuthority } from '../../src/authority'

const auth = createAuthority({
  localKey: 'IU-Peeeng',
  localType: localStorage,
  maxAge: 30 * 1000 * 60 * 60 * 24,
})

console.log(auth.set({ name: 'lijiapeng' }))
console.log(auth.get())
</script>

<template>
  <div class="w-full h-100vh" />
</template>

<style scoped>
.container {
  position: relative;
}
</style>
