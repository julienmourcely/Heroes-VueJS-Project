import Vue from 'vue'
import VueRouter from 'vue-router'
import OrganisationList from "@/components/OrganisationList.vue";
import TeamList from "@/components/TeamList.vue";
import HeroList from "@/components/HeroList.vue";
import AuthenticateView from "@/components/AuthenticateView.vue";
import OrganisationDetail from "@/components/OrganisationDetail.vue";
import TeamDetail from "@/components/TeamDetail.vue";
import HeroDetail from "@/components/HeroDetail.vue";

Vue.use(VueRouter)

const routes = [
    {
        path: '/orgs',
        name: 'orgs',
      components: {
          central: OrganisationList
      },
    },
    {
        path: '/org/:id',
        name: 'org',
        components: {
            central: OrganisationDetail
        }
    },
    {
        path: '/teams',
        name: 'teams',
        components: {
            central: TeamList
        }
    },
    {
        path: '/team/:id',
        name: 'team',
        components: {
            central: TeamDetail
        }
    },
    {
        path: '/heroes',
        name: 'heroes',
        components: {
            central: HeroList
        }
    },
    {
        path: '/hero/:id',
        name: 'hero',
        components: {
            central: HeroDetail
        }
    },
    {
        path: '/authenticate',
        name: 'authenticate',
        components: {
            central: AuthenticateView
        }
    }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
