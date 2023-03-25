<template>
  <v-container>
    <v-data-table
        :headers="headersOrg"
        :items="this.$store.state.orgs"
        class="elevation-1"
        density="compact"
        item-key="id">
      <template slot="item.actions" slot-scope="{ item }">
        <v-icon
            small
            class="mr-2"
            @click="print(item)"
        >
          mdi-pencil
        </v-icon>
      </template>
    </v-data-table>
  </v-container>

    <!--tr>
      <td>id</td>
      <td>name</td>
      <td>action</td>
    </tr>
    <tr v-for="(org, index) in this.$store.state.orgs"
       :key="index">
      <td>{{org._id}}</td>
      <td>{{org.name}}</td>
      <td><v-btn>Connect</v-btn></td>
    </tr-->
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "OrganisationList",
  data: () => ({
    headersOrg: [{
      text: 'id',
      align: 'start',
      sortable: false,
      value: '_id',
    },
      {text: 'name', value: 'name'},
      {text: 'actions', value: 'actions', sortable: false},
    ]

    }),
  methods: {
    ...mapActions(['getOrgsFromAPI']),
    print(item) {
      console.log(item);
    }
  },
  mounted() {
    this.getOrgsFromAPI();
  }
}
</script>

<style scoped>
table, tr, td {
  border: 1px solid black;
}
</style>