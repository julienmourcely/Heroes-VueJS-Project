<template>
  <div>
    <span v-for="(link, index) in titles" :key="index" @click="goTo(index)">

      <slot name="link-to" :link="link"> {{link.text}} </slot>

    </span>
  </div>
</template>

<script>

export default {
  name: "NavBar",
  props: { titles: Array},
  methods: {
    goTo(index) {
      this.$router.push(this.titles[index].path)
    }
  }
}
</script>

<style scoped>

</style>