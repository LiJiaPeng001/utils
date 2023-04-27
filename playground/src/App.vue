<script lang='ts' setup>
import { copyText } from '../../src/index'

async function upload() {
  const data = await copyText('我永远喜欢新垣结衣')
  console.log(data, 'data')
}
</script>

<template>
  <button @click="upload">
    upload
  </button>
</template>
