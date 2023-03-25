import {get, post, put} from './axios.service'

export const getHeroes = () => {
    return get('/heroes/getaliases')
}

export const createHero = (hero) => {
    return post('/heroes/create', hero)
}

export const updateHero = (hero, mdp) => {
    return put('/heroes/update', hero, { 'org-secret': mdp });
}

export const getHeroById = (id, mdp) => {
    return get('/heroes/getbyid/' + id, {"org-secret": mdp})
}