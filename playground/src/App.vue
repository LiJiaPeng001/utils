<script lang="ts" setup>
import { throttle, debounce } from "../../src/fn";

window.addEventListener("scroll", throttle(scroll,{delay:1000}));

function scroll<Event>(e) {
  console.log(e, "scroll");
}
function changeInput(e) {
  console.log(e.target.value, "vv");
}
let debounceInput = debounce(changeInput, 300)
</script>

<template>
  <!-- <button @click="upload"></button> -->
  <input type="text" @input="debounceInput" />
</template>

<style>
body {
  height: 500vh;
}
input{
  width: 200px;
  height: 40px;
  border: 1px solid #000;
}
</style>
