import {get, post, patch} from './axios.service'

export const getOrgs = () => {
    return get('/orgs/get')
}

export const createOrg = (org) => {
    return post('/orgs/create', org)
}

export const addTeamToOrg = (obj, mdp) => {
    return patch('/orgs/addteam', obj, {"org-secret": mdp})
}

export const removeTeamFromOrg = (obj, mdp) => {
    return patch('/orgs/removeteam', obj, {"org-secret": mdp})
}

export const getOrgById = (id, mdp) => {
    return get('/orgs/getbyid/' + id, {"org-secret": mdp})
}