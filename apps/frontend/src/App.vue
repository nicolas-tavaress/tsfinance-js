<template>
  <main>
    <nav>
      <router-link to="/" class="nav-link">Início</router-link>
      <router-link to="/users" class="nav-link">Lista de Usuários</router-link>
    </nav>
    <router-view />
  </main>
</template>

<style>
.nav-link {
  margin-right: 10px;
  padding: 10px 15px;
  background-color: #42b883;
  color: white;
  text-decoration: none;
  border-radius: 4px;
}

.nav-link:hover {
  background-color: #369870;
}

nav {
  padding: 0.4rem 0 1rem calc(var(--section-gap) / 2);
  flex: 1;
  margin-left: 1rem;
  margin-bottom: 20px;
}
</style>
