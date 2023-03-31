<template>
  <div>
    <v-container v-if="!(this.$store.state.errors.isError) && this.$store.state.data.currentOrg!==null">

    <p>Id : {{this.$store.state.data.currentOrg._id}}</p>
    <p>Name : {{this.$store.state.data.currentOrg.name}}</p>
    <p> Password : {{this.$store.state.data.currentOrg.secret}}</p>
      <v-data-table
          :headers="headersTeams"
          :items="this.$store.state.data.currentOrg.teams"
          class="elevation-1"
          density="compact"
          item-key="id"
      >
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>Teams</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="teamDialog" max-width="500px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                    color="primary"
                    dark
                    class="mb-2"
                    v-bind="attrs"
                    v-on="on"
                >
                  Add Team
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">Add Team</span>
                </v-card-title>
                <v-card-text>
                  <v-select
                      :items="availableTeams"
                      item-text="name"
                      item-value="_id"
                      label="Select a team"
                      v-model="selectedTeam"
                      @change="validateBtnActive = true"
                  ></v-select>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeTeamDialog">
                    Cancel
                  </v-btn>
                  <v-btn
                      color="blue darken-1"
                      text
                      :disabled="!validateBtnActive"
                      @click="addTeam"
                  >
                    Validate
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
            @click="goToTeam(item)"
        >
          select
        </v-btn>
        <v-icon
            small
            class="mr-2"
            @click="deleteTeam(item)"
        >
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>

    </v-container>
    <v-container v-else>
      <v-dialog v-model="dialogVisible">
        <v-card>
          <v-card-title>
            <span class="headline">Nothing to show</span>
          </v-card-title>
          <v-card-text>
            Verify you have the good id and password.
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="redirectToOrgs()">
              Ok
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </div>

</template>

<script>
import {mapActions, mapMutations} from "vuex";
export default {
  name: "OrganisationDetail",
  data: () => ({
    dialogVisible: false,
    teamDialog: false,
    availableTeams: [],
    selectedTeam: "",
    validateBtnActive: false,
    headersTeams: [{
      text: 'id',
      align: 'start',
      sortable: false,
      value: '_id',
    },
      {text: 'name', value: 'name'},
      {text: 'nbMembers', value: 'members.length'},
      {text: 'actions', value: 'actions', sortable: false},
    ]
  }),
  methods: {
    ...mapActions('data', ['getCurrentOrgFromAPI','removeTeamFromCurrentOrgToAPI','addTeamToCurrentOrgToAPI','getTeamsFromAPI']),
    ...mapMutations('data' , ['setCurrentOrg']),
    ...mapMutations('errors', ['pushError','popError']),
    goToTeam(item) {
      this.$router.push("/team/" + item._id);
    },
    async redirectToOrgs(){
      this.popError();
      await this.$router.push("/orgs");
    },
    async deleteTeam(item) {
      if (confirm("Are you sure you want to delete this team ?")) {
        await this.removeTeamFromCurrentOrgToAPI({idTeam: item._id});
        await this.getCurrentOrgFromAPI(this.$route.params.id);
      }
    },
    async loadAvailableTeams() {
      await this.getTeamsFromAPI();
      if (this.$store.state.data.currentOrg!==null) {
          this.availableTeams = this.$store.state.data.teams.filter(team => {
            return !this.$store.state.data.currentOrg.teams.some(teamOrg => teamOrg._id === team._id);
          });
      }
    },
    async addTeam() {
      await this.addTeamToCurrentOrgToAPI({idTeam: this.selectedTeam});
      await this.getCurrentOrgFromAPI(this.$route.params.id);
      this.closeTeamDialog();
    },
    closeTeamDialog() {
      this.teamDialog = false;
      this.selectedTeam = "";
      this.validateBtnActive = false;
    },
  },
  async mounted() {
    try {
      await this.getCurrentOrgFromAPI(this.$route.params.id);
      await this.loadAvailableTeams();
    } catch (e) {
      this.dialogVisible = true;
      this.setCurrentOrg(null)
      this.pushError(e);
    }
  },
}
</script>

<style scoped>

</style>