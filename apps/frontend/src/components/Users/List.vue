<script setup lang="ts">
import { ref, onMounted } from 'vue'

const users = ref<Array<{
    id: number;
    username: string;
    email: string;
    document: string;
    link: string;
}>>([]);

const fetchUsers = async () => {
    try {
        const response = await fetch('http://localhost:3000/users/', {
            method: 'GET',
        })

        const data = await response.json()
        
        if (response.ok) {
            if (data.users) {
                data.users = data.users.map((user: any) => ({
                    ...user,
                    link: `http://localhost:3000/users/${user.id}`
                }))
                users.value = data.users
            } else if (Array.isArray(data)) {
                users.value = data.map((user: any) => ({
                   ...user,
                   link: `http://localhost:3000/users/${user.id}`
               }))
            }
        } else {
            console.error('Erro na resposta:', response.status, response.statusText)
        }

        console.log(users.value)
    } catch (error) {
        console.error('Erro na requisição:', error)
    }
}

const maskUserDocument = (document: string): string => {
    if (!document) return '';
    return document.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

onMounted(() => {
    fetchUsers()
})
</script>

<template>
    <div class="main">
        <h1 class="green">Users</h1>
        <div class="user-list">
            <ul>
                <li v-for="user in users" :key="user.id">
                    <a :href="user.link" target="_blank" rel="noopener noreferrer">
                        {{ user.username }} ({{ maskUserDocument(user.document) }})
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped>
    body {
        font-family: 'JetBrains Mono', monospace;
        background-color: #f0f0f0;
        color: #333;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .main {
        display: flex;
        align-items: stretch;
        flex-direction: column;
        gap: 30px;
    }

    .user-list {
        border-radius: 8px;
        border: 1px solid #ff0000;
        text-align: center;
    }

    h1 {
        font-size: 3em;
        text-align: center;
    }

    ul {
        list-style: none;
        font-size: 2em;
        padding: 0%;
    }

    li {
        font-size: 1em;
        text-align: left;
        margin: 10px;

        a {
            text-decoration: none;
            color: inherit;
            border-radius: 8px;
            border: 1px solid #ff0000;
        }

        a:hover {
            cursor: pointer;
        }
    }

    li::marker {
        content: "";
    }
</style>