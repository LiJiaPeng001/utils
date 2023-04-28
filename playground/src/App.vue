<script lang="ts" setup>
import { copyText } from "../../src/index";

async function upload() {
  const data = await copyText("1651513676538318848");
  console.log(data, "data");
}
</script>

<template>
  <button @click="upload">upload</button>
</template>
