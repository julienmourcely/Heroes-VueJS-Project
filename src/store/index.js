import Vue from 'vue'
import Vuex from 'vuex'

import {getHeroes, getHeroById, createHero, updateHero} from '../services/hero.service'
import {getTeams, createTeam, addHeroToTeam, removeHeroFromTeam} from '../services/team.service'
import {getOrgs, getOrgById, createOrg, addTeamToOrg, removeTeamFromOrg} from '../services/org.service'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentPassword: null,
    heroes: [],
    currentHero: null,
    teams: [],
    currentTeam: null,
    orgs: [],
    currentOrg: null
  },
  getters: {

  },
  mutations: {
      setCurrentPassword(state, password) {
            state.currentPassword = password
      },
    setHeroes(state, heroes) {
      state.heroes.splice(0)
        heroes.forEach(h => state.heroes.push(h))
    },
    setCurrentHero(state, hero) {
      state.currentHero = hero
    },
    updateHero(state, hero) {
      let idx = state.heroes.findIndex(h => h.id === hero.id)
      if (idx !== -1) {
        state.heroes.splice(idx, 1, hero)
      }
    },
    setTeams(state, teams) {
      state.teams.splice(0)
      teams.forEach(t => state.teams.push(t))
    },
    setCurrentTeam(state, team) {
      state.currentTeam = team
    },
    updateTeam(state, team) {
        let idx = state.teams.findIndex(t => t.id === team.id)
        if (idx !== -1) {
            state.teams.splice(idx, 1, team)
        }
    },
    setOrgs(state, orgs) {
        state.orgs.splice(0)
        orgs.forEach(o => state.orgs.push(o))
    },
    setCurrentOrg(state, org) {
        state.currentOrg = org
    },
    updateOrg(state, org) {
        let idx = state.orgs.findIndex(o => o.id === org.id)
        if (idx !== -1) {
            state.orgs.splice(idx, 1, org)
        }
    },
    createOrg(state, org) {
      state.orgs.push(org)
    },
    createTeam(state, team) {
        state.teams.push(team)
    },
    createHero(state, hero) {
        state.heroes.push(hero)
    }

  },
  actions: {
    async getHeroesFromAPI({commit}) {
      let result = null
      try {
        result = await getHeroes()
          result = result.data
        if (result.error === 0) {
          commit('setHeroes',result.data)
        }
        else {
          console.log(result)
        }
      }
      catch(err) {
        console.log("Cas anormal dans getHeroesFromAPI()")
      }
    },
    async getCurrentHeroFromAPI({commit}, id) {
        let result = null
        try {
            result = await getHeroById(id, this.state.currentPassword)
            result = result.data
            if (result.error === 0) {
              commit('setCurrentHero',result.data[0])
            }
            else {
              console.log(result.data)
            }
        }
        catch(err) {
            commit('setCurrentHero', null)
            console.log("Cas anormal dans getCurrentHeroFromAPI()")
        }
    },
    async updateCurrentHeroToAPI({commit}, hero) {
        if (this.state.currentHero._id !== hero._id) {
            console.log("Cas anormal dans updateCurrentHeroToAPI()")
            return
        }

      let result = null
      try {
        result = await updateHero(hero, this.state.currentPassword)
          result = result.data
        if (result.error === 0) {
            commit('updateHero', result.data)
        }
      } catch(err) {
          console.log("Cas anormal dans updateCurrentHeroToAPI()")
      }
    },
    async getTeamsFromAPI({commit}) {
      let result = null
      try {
        result = await getTeams()
        result = result.data
        if (result.error === 0) {
          commit('setTeams',result.data)
        }
        else {
          console.log(result.data)
        }
      }
      catch(err) {
        console.log("Cas anormal dans getTeamsFromAPI()")
      }
    },

      async getCurrentTeamFromAPI({commit}, id) {
        let org = null
        let teams = null
          let result = null
        try {
            org = await getOrgById(this.state.currentOrg._id, this.state.currentPassword)
            teams = org.data.data[0].teams
            teams.find (t => {
                if (t._id === id) {
                    result = t
                }
            })

            if (result!== null) {
                commit('setCurrentTeam', result)
            } else {
                console.log("Pas de team correspondante dans l'org actuelle")
                commit('setCurrentTeam', null)
            }
        }
        catch(err) {
            console.log("Cas anormal dans getCurrentTeamFromAPI()")
        }
      },

    async addHeroesToCurrentTeamToAPI({commit}, obj) {
        if (this.state.currentTeam._id !== obj.idTeam) {
            console.log("Cas anormal dans addHeroesToCurrentTeamToAPI()")
            return
        }
        let result = null
        try {
            result = await addHeroToTeam(obj)
            result = result.data
            if (result.error === 0) {
                commit('updateTeam', result.data)
            }
            else {
            console.log(result.data)
            }
        }
        catch(err) {
            console.log("Cas anormal dans addHeroesToCurrentTeamToAPI()")
        }
    },
    async removeHeroesFromCurrentTeamToAPI({commit}, obj) {
        if (this.state.currentTeam._id !== obj.idTeam) {
            console.log("Cas anormal dans removeHeroesFromCurrentTeamToAPI()")
            return
        }
        let result = null
        try {
            result = await removeHeroFromTeam(obj)
            result = result.data
            if (result.error === 0) {
                commit('updateTeam', result.data)
            }
        } catch(err) {
            console.log("Cas anormal dans removeHeroesFromCurrentTeamToAPI()")
        }
    },
    async getOrgsFromAPI({commit}) {
        let result = null
        try {
            result = await getOrgs()
            result = result.data
            if (result.error === 0) {
            commit('setOrgs',result.data)
            }
            else {
            console.log(result.data)
            }
        }
        catch(err) {
            console.log("Cas anormal dans getOrgsFromAPI()")
        }
    },
    async getCurrentOrgFromAPI({commit}, id) {
        let result = null
        try {
            result = await getOrgById(id, this.state.currentPassword)
            result = result.data
            if (result.error === 0) {
            commit('setCurrentOrg',result.data[0])
            }
            else {
            console.log(result.data)
            }
        }
        catch(err) {
            commit('setCurrentOrg',null)
            console.log("Cas anormal dans getCurrentOrgFromAPI()")
        }
    },
    async addTeamToCurrentOrgToAPI({commit}, obj) {
        let result = null
        try {
            result = await addTeamToOrg(obj, this.state.currentPassword)
            result = result.data
            if (result.error === 0) {
            commit('updateOrg', result.data)
            }
        } catch(err) {
            console.log("Cas anormal dans addTeamToCurrentOrgToAPI()")
        }
    },
    async removeTeamFromCurrentOrgToAPI({commit}, obj) {
        let result = null
        try {
            result = await removeTeamFromOrg(obj, this.state.currentPassword)
            result = result.data
            if (result.error === 0) {
            commit('updateOrg', result.data)
            }
        } catch(err) {
            console.log("Cas anormal dans removeTeamFromCurrentOrgToAPI()")
        }
    },
    async createOrgFromAPI({commit}, obj) { {
        let result = null
        try {
            result = await createOrg(obj)
            result = result.data
            if (result.error === 0) {
                await commit('createOrg', result.data[0])
            }
        } catch(err) {
            console.log("Cas anormal dans createOrgFromAPI()")
        }
    }},
      async createHeroFromAPI({commit}, obj) {
        let result = null
        try {
            result = await createHero(obj)
            result = result.data
            if (result.error === 0) {
                await commit('createHero', result.data[0])
            }
        } catch(err) {
            console.log("Cas anormal dans createHeroFromAPI()")
        }
      },
      async createTeamFromAPI({commit}, obj) {
        let result = null
        try {
            result = await createTeam(obj)
            result = result.data
            if (result.error === 0) {
                await commit('createTeam', result.data[0])
            }
        } catch(err) {
            console.log("Cas anormal dans createTeamFromAPI()")
        }
      },
  },
  modules: {
  }
})
