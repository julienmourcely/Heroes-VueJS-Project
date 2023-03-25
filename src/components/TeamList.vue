<template>
  <div>
    <v-container>
      <v-data-table
          :headers="headersTeam"
          :items="this.$store.state.teams"
          class="elevation-1"
          density="compact"
          item-key="id">
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Teams</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="addTeamDialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                Add Team
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">Add Team</span>
              </v-card-title>
              <v-card-text>
                <v-text-field label="Team name" v-model="newTeamName"></v-text-field>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeAddTeamDialog">
                  Cancel
                </v-btn>
                <v-btn color="blue darken-1" text :disabled="!newTeamName.trim()" @click="createTeam">
                  Add
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
        <template slot="item.actions" slot-scope="{ item }">
          <v-btn
              small
              class="mr-2"
              @click="goTo(item)"
          >
            select
          </v-btn>
        </template>
      </v-data-table>
    </v-container>
  </div>

</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "TeamList",
  data: () => ({
    addTeamDialog: false,
    newTeamName: "",
    headersTeam: [{
      text: 'id',
      align: 'start',
      sortable: false,
      value: '_id',
    },
      {text: 'name', value: 'name'},
      {text:'nbAffiliations', value:'nbAffiliations'},
      {text:'actions', value:'actions', sortable: false},
    ]

  }),
  methods: {
    ...mapActions(['getTeamsFromAPI','createTeamFromAPI' ]),
    goTo(item) {
      this.$router.push("/team/" + item._id)
    },
    closeAddTeamDialog() {
      this.addTeamDialog = false;
      this.newTeamName = "";
    },
    async createTeam() {
      await this.createTeamFromAPI({name: this.newTeamName})
      this.closeAddTeamDialog();
      await this.getTeamsFromAPI();
    },
  },
  async mounted() {
    await this.getTeamsFromAPI();
  }
}
</script>

<style scoped>
table, tr, td {
  border: 1px solid black;
}
</style>