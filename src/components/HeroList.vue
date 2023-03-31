<template>
  <v-container>
    <v-data-table
        :headers="headersHero"
        :items="this.$store.state.data.heroes"
        class="elevation-1"
        density="compact"
        item-key="id">

      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Heroes</v-toolbar-title>
          <v-divider
              class="mx-4"
              inset
              vertical
          ></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
              >Add Hero</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">Add Hero</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.publicName" label="Public Name"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.realName" label="Real Name"></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                <v-btn color="blue darken-1" text :disabled="!(editedItem.publicName.trim() && editedItem.realName.trim())"  @click="save">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>

      <template slot="item.actions" slot-scope="{ item }">
        <v-btn
            @click="goTo(item)"
        >
          Details
        </v-btn>
      </template>
    </v-data-table>
  </v-container>

</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "HeroList",
  data: () => ({
    dialog: false,
    headersHero: [{
      text: 'id',
      align: 'start',
      sortable: false,
      value: '_id',
    },
      {text: 'publicName', value: 'publicName'},
      {text: 'actions', value: 'actions', sortable: false},
    ],
    editedItem: {
      publicName: '',
      realName: ''
    },
    defaultItem: {
      publicName: '',
      realName: ''
    },

  }),
  watch: {
    dialog (val) {
      val || this.close()
    },
  },
  methods: {
    ...mapActions('data', ['getHeroesFromAPI', 'createHeroFromAPI']),
    goTo(item) {
      this.$router.push("/hero/" + item._id);
    },
    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
      })
    },

    async save () {
      await this.createHeroFromAPI(this.editedItem)
      await this.getHeroesFromAPI()
      this.close()
    },

  },
  async mounted() {
    await this.getHeroesFromAPI();
  }
}
</script>

<style scoped>

</style>