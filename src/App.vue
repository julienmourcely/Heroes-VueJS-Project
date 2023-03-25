<template>
  <v-app>

      <NavDrawer :titles="titles">
        <template v-slot:link-to={link}>
          <span>
          {{link.text}}
          </span>
        </template>
      </NavDrawer>

    <v-main>
      <router-view name="central"/>
    </v-main>
  </v-app>
</template>

<script>

import NavDrawer from "@/components/NavDrawer.vue";

export default {
  name: 'App',
  components: {NavDrawer},
  data: () => ({
    titles: [
      {text: 'Organisations', path: '/orgs'},
      {text: 'Teams', path: '/teams'},
      {text: 'Heroes', path: '/heroes'},
    ]
  }),
  methods: {
    goTo(path) {
      this.$router.push(path)
    }
  },
};
</script>
