<script lang="ts" setup>
import { createAuthority } from "../../src/authority";

type User =  {
  name: string,
  age: number,
  name1:string
}

async function upload() {
  let useAuth = createAuthority<User>({ localKey: 'user' })
  let user = useAuth.get()
}
</script>

<template>
  <button @click="upload">upload</button>
</template>
