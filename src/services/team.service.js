import {get, post, patch} from './axios.service'

export const getTeams = () => {
    return get('/teams/get')
}

export const createTeam = (team) => {
    return post('/teams/create', team)
}

export const addHeroToTeam = (obj) => {
    return patch('/teams/addheroes', obj)
}

export const removeHeroFromTeam = (obj) => {
    return patch('/teams/removeheroes', obj)
}