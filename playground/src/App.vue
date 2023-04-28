<script lang="ts" setup>
import { copyText } from "../../src/index";

async function upload() {
  const data = await copyText("22231231");
  console.log(data, "data");
}
</script>

<template>
  <button @click="upload">upload</button>
</template>
