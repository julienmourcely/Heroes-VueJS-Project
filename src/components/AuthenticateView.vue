<template>
  <v-container>
    <v-text-field v-model="password"></v-text-field>

    <v-btn @click="updatePassword(password)">
      Confirm password
    </v-btn>

    <p>Mot de passe actuel : {{this.$store.state.authenticate.currentPassword}}</p>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "AuthenticateView",
  data: () => ({
    password: "",
  }),
  methods: {
    ...mapActions('authenticate', ['updatePassword']),
  },
};
</script>

<style scoped></style>