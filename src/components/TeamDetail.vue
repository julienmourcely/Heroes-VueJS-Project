<template>
  <v-container v-if="this.$store.state.currentTeam">

    <p>Id : {{this.$store.state.currentTeam._id}}</p>
    <p>Name : {{this.$store.state.currentTeam.name}}</p>
    <p>Members : </p>
    <v-data-table
        :headers="headersMembers"
        :items="heroes"
        class="elevation-1"
        density="compact"
        item-key="id">
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Members</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="addMemberDialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
              >
                Add Member
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">Add Member</span>
              </v-card-title>
              <v-card-text>
                <v-select
                    :items="availableHeroes"
                    item-text="publicName"
                    item-value="_id"
                    label="Select a hero"
                    v-model="selectedHero"
                    @change="validateAddBtnActive = true"
                ></v-select>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeAddMemberDialog">
                  Cancel
                </v-btn>
                <v-btn
                    color="blue darken-1"
                    text
                    :disabled="!validateAddBtnActive"
                    @click="addMember"
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
            @click="goTo(item)"
        >
          Details
        </v-btn>
        <v-icon
            small
            @click="deleteItem(item)"
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
          Verify you have the good id and password, and that you are connected to an Organisation.
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="redirectToTeams()">
            Ok
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "TeamDetail",
  data: () => ({
    dialogVisible: false,
    headersMembers: [{
      text: 'id',
      align: 'start',
      sortable: false,
      value: '_id',
    },
      {text: 'publicName', value: 'publicName'},
      {text: 'realName', value: 'realName'},
      {text:'nbPowers', value:'powers.length'},
      {text: 'actions', value: 'actions', sortable: false},
    ],
    heroes: [],
    addMemberDialog: false,
    selectedHero: null,
    validateAddBtnActive: false,
    availableHeroes: [],
  }),
  methods: {
    ...mapActions([
      'getCurrentTeamFromAPI',
      'getHeroesFromAPI',
      'getCurrentHeroFromAPI',
      'removeHeroesFromCurrentTeamToAPI',
      'addHeroesToCurrentTeamToAPI',
    ]),

    async goTo(item) {
      await this.$router.push("/hero/" + item._id);
    },

    async redirectToTeams() {
      await this.$router.push("/teams");
    },

    async deleteItem(item) {
      if (confirm("Are you sure you want to delete this member?")) {
        await this.removeHeroesFromCurrentTeamToAPI({ idHeroes: [item._id], idTeam: this.$store.state.currentTeam._id });
        await this.getCurrentTeamFromAPI(this.$route.params.id);
        await this.getHeroesInfos(this.$store.state.currentTeam)
      }
    },
    async getHeroesInfos(team) {
      this.heroes = [];
      if (team === null) {
        return
      }
      if (team.members === undefined) return;
      for (let m of team.members) {
        await this.getCurrentHeroFromAPI(m);
        let hero = this.$store.state.currentHero;
        this.heroes.push(hero);
      }
    },
    closeAddMemberDialog() {
      this.selectedHero = null;
      this.validateAddBtnActive = false;
      this.addMemberDialog = false;
    },
    async addMember() {
      if (this.selectedHero) {
        await this.addHeroesToCurrentTeamToAPI({ idHeroes: [this.selectedHero], idTeam: this.$store.state.currentTeam._id });
        await this.getCurrentTeamFromAPI(this.$route.params.id);
        await this.getHeroesInfos(this.$store.state.currentTeam);
        await this.getAvailableHeroes();
        this.selectedHero = null;
      }
      this.closeAddMemberDialog();
    },
    async getAvailableHeroes() {
      await this.getHeroesFromAPI();
      const allHeroes = this.$store.state.heroes;
      this.availableHeroes = allHeroes.filter(
          (hero) => !this.heroes.some((member) => member._id === hero._id)
      );
    },
  },
  async mounted() {
    await this.getCurrentTeamFromAPI(this.$route.params.id);
    if (!this.$store.state.currentTeam) {
      this.dialogVisible = true;
    }
    await this.getHeroesInfos(this.$store.state.currentTeam);
    await this.getAvailableHeroes();
  },
}
</script>

<style scoped>

</style>