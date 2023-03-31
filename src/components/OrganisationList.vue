<template>
  <v-container>
    <v-data-table
        :headers="headersOrg"
        :items="this.$store.state.data.orgs"
        class="elevation-1"
        density="compact"
        item-key="id">

      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Organisations</v-toolbar-title>
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
              >Add Organisation</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">Add Organisation</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.name" label="Name"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.secret" label="Password"></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                <v-btn color="blue darken-1" text :disabled="!(editedItem.name.trim() && editedItem.secret.trim())"  @click="save">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>

      <template slot="item.actions" slot-scope="{ item }">
        <v-btn
            @click="goTo(item)"
        >
          Connect
        </v-btn>
      </template>
    </v-data-table>
  </v-container>

</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "OrganisationList",
  data: () => ({
    dialog: false,
    headersOrg: [{
      text: 'id',
      align: 'start',
      sortable: false,
      value: '_id',
    },
      {text: 'name', value: 'name'},
      {text: 'actions', value: 'actions', sortable: false},
    ],
    editedItem: {
      name: '',
      secret: ''
    },
    defaultItem: {
      name: '',
      secret: ''
    },

    }),
  watch: {
    dialog (val) {
      val || this.close()
    },
  },
  methods: {
    ...mapActions('data',['getOrgsFromAPI', 'createOrgFromAPI']),
    goTo(item) {
      this.$router.push("/org/" + item._id);
    },
    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
      })
    },

    async save () {
      await this.createOrgFromAPI(this.editedItem)
      await this.getOrgsFromAPI()
      this.close()
    },

  },
  mounted() {
    this.getOrgsFromAPI();
  }
}
</script>

<style scoped>

</style>