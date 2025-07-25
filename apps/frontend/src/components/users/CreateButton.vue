<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const pageCreateUser = () => {
    router.push('/users/create')
}
</script>

<template>
    <button @click="pageCreateUser">
        Criar Usuário
    </button>
</template>
