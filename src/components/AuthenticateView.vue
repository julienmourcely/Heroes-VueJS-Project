<template>

  <v-container>
    <v-text-field
      v-model="password">
    </v-text-field>

    <v-btn
      @click="setCurrentPassword(password)">
      Confirm password
    </v-btn>

    <p>Mot de passe actuel : {{this.$store.state.currentPassword}}</p>

  </v-container>

</template>

<script>

import store from "@/store";

export default {
  name: "AuthenticateView",
  data: () => ({
    password: ''
  }),
  methods: {
    setCurrentPassword(password) {
      store.commit('setCurrentPassword', password)
    },
  },

}
</script>

<style scoped>

</style>