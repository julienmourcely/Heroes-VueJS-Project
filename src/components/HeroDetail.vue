<template>
  <div>
    <v-container v-if="this.$store.state.currentHero && verif()">

      <p>Id : {{this.$store.state.currentHero._id}}</p>
      <p>Public Name : {{this.$store.state.currentHero.publicName}}</p>
      <p>Real Name : {{this.$store.state.currentHero.realName}}</p>
      <v-dialog v-model="editNameDialog" max-width="500px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" v-bind="attrs" v-on="on" @click="editHero">
            Edit Names
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">Edit Hero Name</span>
          </v-card-title>
          <v-card-text>
            <v-text-field label="Public Name" v-model="newPublicName"></v-text-field>
            <v-text-field label="Real Name" v-model="newRealName"></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeEditNameDialog">
              Cancel
            </v-btn>
            <v-btn color="blue darken-1" text :disabled="!(newPublicName.trim() && newRealName.trim())"  @click="saveHeroName">
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-data-table
          :headers="headersPowers"
          :items="this.$store.state.currentHero.powers"
          class="elevation-1"
          density="compact"
          item-key="id"
      >
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>Powers</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="powerDialog" max-width="500px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                  Add Power
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">Add Power</span>
                </v-card-title>
                <v-card-text>
                  <v-text-field
                      label="Power Name"
                      v-model="newPower.name"
                  ></v-text-field>
                  <v-select
                      :items="powerTypes"
                      label="Power Type"
                      v-model="newPower.type"
                  ></v-select>
                  <v-text-field
                      label="Power Level"
                      type="number"
                      min="0"
                      max="100"
                      v-model="newPower.level"
                  ></v-text-field>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closePowerDialog">
                    Cancel
                  </v-btn>
                  <v-btn
                      color="blue darken-1"
                      text
                      :disabled="!validatePowerBtnActive"
                      @click="addPower"
                  >
                    Validate
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template slot="item.type" slot-scope="{ item }">
          {{ getPowerType(item.type) }}
        </template>
        <template slot="item.actions" slot-scope="{ item }">
          <v-icon
              small
              @click="deletePower(item)"
          >
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>

    </v-container>

    <v-container v-else>
      <p>Nothing to show</p>
    </v-container>
  </div>
</template>

<script>
import {mapActions} from "vuex";
export default {
  name: "HeroDetail",
  data: () => ({
    headersPowers: [
      {text: 'Name', value: 'name'},
      {text: 'Type', value: 'type'},
      {text: 'Level', value: 'level'},
      {text: 'Actions', value: 'actions', sortable: false},
    ],
    editNameDialog: false,
    newPublicName: '',
    newRealName: '',
    powerDialog: false,
    newPower: {
      name: '',
      type: '',
      level: '',
    },
    validatePowerBtnActive: false,
    powerTypes: [
      'force',
      'vitesse',
      'endurance',
      'magie',
      'effrayant',
      'furtivité',
      'stupidité',
    ],
  }),
  methods: {
    ...mapActions(['getCurrentHeroFromAPI', 'updateCurrentHeroToAPI',"clearCurrentHero" ]),
    async editHero() {
      this.newPublicName = this.$store.state.currentHero.publicName;
      this.newRealName = this.$store.state.currentHero.realName;
    },
    async saveHeroName() {
      const updatedHero = {
        ...this.$store.state.currentHero,
        publicName: this.newPublicName,
        realName: this.newRealName
      };
      await this.updateCurrentHeroToAPI(updatedHero);
      await this.getCurrentHeroFromAPI(this.$route.params.id);
      this.editNameDialog = false;
    },
    closeEditNameDialog() {
      this.editNameDialog = false;
      this.newPublicName = '';
      this.newRealName = '';
    },
    async deletePower(power) {
      if (confirm("Are you sure you want to delete this power?")) {
        const updatedPowers = this.$store.state.currentHero.powers.filter(p => p !== power);
        const updatedHero = {
          ...this.$store.state.currentHero,
          powers: updatedPowers
        };
        await this.updateCurrentHeroToAPI(updatedHero);
        await this.getCurrentHeroFromAPI(this.$route.params.id);
      }
    },
    async verif() {
      if (this.$store.state.currentHero === null) {
        alert("Nothing to show");
        await this.$router.push("/heroes");
        return false;
      } else {
        return true;
      }
    },
    getPowerType(type) {
      const powerTypes = [
        'force',
        'vitesse',
        'endurance',
        'magie',
        'effrayant',
        'furtivité',
        'stupidité',
      ];
      return powerTypes[type - 1];
    },
    closePowerDialog() {
      this.powerDialog = false;
      this.newPower = {
        name: '',
        type: '',
        level: '',
      };
      this.validatePowerBtnActive = false;
    },
    powerTypeToNumber(typeName) {
      const typeMapping = {
        force: 1,
        vitesse: 2,
        endurance: 3,
        magie: 4,
        effrayant: 5,
        furtivité: 6,
        stupidité: 7,
      };
      return typeMapping[typeName];
    },
    async addPower() {
      const newPowerWithTypeNumber = {
        ...this.newPower,
        type: this.powerTypeToNumber(this.newPower.type),
      };
      const updatedPowers = [...this.$store.state.currentHero.powers, newPowerWithTypeNumber];
      const updatedHero = {
        ...this.$store.state.currentHero,
        powers: updatedPowers,
      };
      await this.updateCurrentHeroToAPI(updatedHero);
      await this.getCurrentHeroFromAPI(this.$store.state.currentHero._id);
      this.closePowerDialog();
    },
  },
  async mounted() {
    await this.getCurrentHeroFromAPI(this.$route.params.id);
  },
  watch: {
    "$route.params.id": {
      immediate: true,
      async handler(newId) {
        await this.clearCurrentHero();
        await this.getCurrentHeroFromAPI(newId);
        if (this.$store.state.currentHero === null) {
          alert("Nothing to show");
          await this.$router.push("/heroes");
        }
      },
    },
    newPower: {
      handler(newPower) {
        this.validatePowerBtnActive =
            newPower.name.trim() !== '' &&
            newPower.type !== '' &&
            newPower.level !== '' &&
            newPower.level >= 0 &&
            newPower.level <= 100;
      },
      deep: true,
    },
  },
}
</script>