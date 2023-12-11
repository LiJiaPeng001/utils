<script lang="ts" setup>
import { createAuthority } from "../../src/authority";

type Test1 = Number[]

let useTest = createAuthority<Test1>({
  localKey:'test'
})
function save(e)
{
  useTest.set([Math.random()])
  let num = useTest.get()
  console.log(num)
}
</script>

<template>
  <button @click="save">保存</button>
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
