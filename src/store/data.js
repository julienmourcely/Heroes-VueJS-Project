import {
    getHeroes,
    getHeroById,
    createHero,
    updateHero,
} from "../services/hero.service";
import {
    getTeams,
    createTeam,
    addHeroToTeam,
    removeHeroFromTeam,
} from "../services/team.service";
import {
    getOrgs,
    getOrgById,
    createOrg,
    addTeamToOrg,
    removeTeamFromOrg,
} from "../services/org.service";
import authenticate from "@/store/authenticate";

export default {
    namespaced: true,
    state: {
        heroes: [],
        currentHero: null,
        teams: [],
        currentTeam: null,
        orgs: [],
        currentOrg: null,
    },
    mutations: {
        setHeroes(state, heroes) {
            state.heroes = heroes;
        },
        setCurrentHero(state, hero) {
            state.currentHero = hero;
        },
        updateHero(state, hero) {
            const idx = state.heroes.findIndex((h) => h.id === hero.id);
            if (idx !== -1) {
                state.heroes.splice(idx, 1, hero);
            }
        },
        setTeams(state, teams) {
            state.teams = teams;
        },
        setCurrentTeam(state, team) {
            state.currentTeam = team;
        },
        updateTeam(state, team) {
            const idx = state.teams.findIndex((t) => t.id === team.id);
            if (idx !== -1) {
                state.teams.splice(idx, 1, team);
            }
        },
        setOrgs(state, orgs) {
            state.orgs = orgs;
        },
        setCurrentOrg(state, org) {
            state.currentOrg = org;
        },
        updateOrg(state, org) {
            const idx = state.orgs.findIndex((o) => o.id === org.id);
            if (idx !== -1) {
                state.orgs.splice(idx, 1, org);
            }
        },
        createOrg(state, org) {
            state.orgs.push(org);
        },
        createTeam(state, team) {
            state.teams.push(team);
        },
        createHero(state, hero) {
            state.heroes.push(hero);
        },
    },
    actions: {
        async getHeroesFromAPI({ commit }) {
            const result = await getHeroes();
            commit("setHeroes", result.data.data);
        },

        async getCurrentHeroFromAPI({ commit  }, id) {
            const result = await getHeroById(id, authenticate.state.currentPassword);
            commit("setCurrentHero", result.data.data[0]);
        },

        async updateCurrentHeroToAPI({ commit }, hero) {
            const result = await updateHero(hero, authenticate.state.currentPassword);
            commit("updateHero", result.data);
        },

        async getTeamsFromAPI({ commit }) {
            const result = await getTeams();
            commit("setTeams", result.data.data);
        },

        async getCurrentTeamFromAPI({ commit }, id) {
            const org = await getOrgById(this.state.data.currentOrg._id, authenticate.state.currentPassword);
            const teams = org.data.data[0].teams;
            const result = teams.find((t) => t._id === id);

            if (result !== null) {
                commit("setCurrentTeam", result);
            } else {
                commit("setCurrentTeam", null);
            }
        },

        async addHeroesToCurrentTeamToAPI({ commit}, obj) {
            const result = await addHeroToTeam(obj);
            commit("updateTeam", result.data);
        },

        async removeHeroesFromCurrentTeamToAPI({ commit}, obj) {
            const result = await removeHeroFromTeam(obj);
            commit("updateTeam", result.data);
        },

        async getOrgsFromAPI({ commit }) {
            const result = await getOrgs();
            commit("setOrgs", result.data.data);
        },

        async getCurrentOrgFromAPI({ commit }, id) {
            const result = await getOrgById(id, authenticate.state.currentPassword);
            commit("setCurrentOrg", result.data.data[0]);
        },

        async addTeamToCurrentOrgToAPI({ commit }, obj) {
            const result = await addTeamToOrg(obj, authenticate.state.currentPassword);
            commit("updateOrg", result.data);
        },

        async removeTeamFromCurrentOrgToAPI({ commit }, obj) {
            const result = await removeTeamFromOrg(obj, authenticate.state.currentPassword);
            commit("updateOrg", result.data);
        },

        async createOrgFromAPI({ commit }, obj) {
            const result = await createOrg(obj);
            commit("createOrg", result.data[0]);
        },

        async createHeroFromAPI({ commit }, obj) {
            const result = await createHero(obj);
            commit("createHero", result.data[0]);
        },

        async createTeamFromAPI({ commit }, obj) {
            const result = await createTeam(obj);
            commit("createTeam", result.data[0]);
        },
    },
}