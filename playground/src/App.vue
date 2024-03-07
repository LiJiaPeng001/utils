<script lang="ts" setup>
import { createAuthority } from "../../src/authority";

type Test1 = {
  num?: Number[];
  name?: string;
};

let useTest = createAuthority<Test1>({
  localKey: "test",
  maxAge: 1000 * 5,
  defaultData: {
    name: "哈哈哈",
    num: [22, 33, 44],
  },
});
function save(e) {
  useTest.set({
    num: [1, 2, 3],
    name: "22",
  });
  console.log(useTest.get(), "dd");
}
function getLocal() {
  console.log(useTest.get())
}
</script>

<template>
  <button @click="save">保存</button>
  <button @click="getLocal">获取</button>
</template>

<style>
body {
  height: 500vh;
}
input {
  width: 200px;
  height: 40px;
  border: 1px solid #000;
}
</style>
