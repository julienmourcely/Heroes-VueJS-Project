<template>
  <v-app>

      <NavDrawer :titles="dynamicTitles">
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
  computed: {
    currentOrg() {
      return this.$store.state.data.currentOrg;
    },
    currentTeam() {
      return this.$store.state.data.currentTeam;
    },
    currentHero() {
      return this.$store.state.data.currentHero
    }
    dynamicTitles() {
      return [
        { text: "Organisations", path: "/orgs" },
        { text: "Teams", path: "/teams" },
        { text: "Heroes", path: "/heroes" },
        {
          text: "Current Organisation",
          path: this.currentOrg ? `/org/${this.currentOrg._id}` : "/org/none",
        },
        {
          text: "Current Team",
          path: this.currentTeam ? `/team/${this.currentTeam._id}` : "/team/none",
        },
        {
          text: "Current Hero",
          path: this.currentHero ? `/hero/${this.currentHero._id}` : "/hero/none",
        }
      ];
    },
  },
};
</script>
