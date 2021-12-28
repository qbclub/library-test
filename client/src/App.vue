<template>
  <v-app>
    <v-app-bar app class="d-flex justify-center">
      |<router-link to="/">Home</router-link>| |
      <router-link to="/about">About</router-link>| |
      <router-link to="/node-methods">node-methods</router-link>|
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
};
</script>
