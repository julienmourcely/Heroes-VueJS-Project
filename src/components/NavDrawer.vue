<template>
  <div>
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-btn color="red" @click="goToAuthenticate()">
        Authenticate
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" app>
      <v-list>
        <v-list-item v-for="(link, index) in titles" :key="index" @click="goTo(index)">
          <v-list-item-content>
            <v-list-item-title>
              <slot name="link-to" :link="link"> {{link.text}} </slot>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>

export default {
  name: 'App',
  props: {
    titles: Array
  },
  data () {
    return {
      drawer: false
    }
  },
  methods: {
    goTo(index) {
      this.$router.push(this.titles[index].path)
      this.drawer = false
    },
    goToAuthenticate() {
      this.$router.push('/authenticate')
      this.drawer = false
    }
  }
}
</script>

<style scoped>

</style>