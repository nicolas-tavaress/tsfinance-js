<script setup lang="ts">
import { useRouter } from 'vue-router';

interface Props {
  userId: number;
}

const props = defineProps<Props>();
const router = useRouter();

const editUser = () => {
  router.push(`/users/edit?id=${props.userId}`);
}

</script>

<template>
  <button @click="editUser"> Editar </button>
</template>

<style scoped>
button {
  background-color: #005e8a;

  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 1em;
  cursor: pointer;
}

button:hover {
  background-color: darken(#ff0000, 10%);
}
</style>
