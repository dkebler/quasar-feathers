<template>
  <q-layout>
    <div slot="header" class="toolbar">

      <button @click="$refs.menu.open()" v-show="admin_mode">
        <i>menu</i>
        <q-tooltip anchor="bottom middle" self="top middle" :offset="[0, 20]">Menu</q-tooltip>
      </button>

      <q-toolbar-title :padding="0">
        Home Lighting
      </q-toolbar-title>

      <button class="primary circular" @click="goTo('admin')" v-show="admin&&!admin_mode">
        <i>settings</i>
        <q-tooltip anchor="bottom middle" self="top middle" :offset="[0, 20]">Enter Admin Mode</q-tooltip>
      </button>

       <button class="primary circular" @click="admin_mode_off()" v-show="admin_mode">
        <i>stop</i>
        <q-tooltip anchor="bottom middle" self="top middle" :offset="[0, 20]">Exit Admin Mode</q-tooltip>
      </button>
  
      
      <!--q-tabs slot="navigation">
        <q-tab route="/singin" exact replace>Sign In</q-tab>
        <q-tab route="/singup" exact replace>Register</q-tab>
        <q-tab icon="featured_play_list" route="/chat" exact replace>Your Tasks</q-tab>
      </q-tabs-->

    </div>
    
    <!-- system settings menu admin only -->
    <q-drawer swipe-only left-side ref="menu" >
      <div class="toolbar light">
        <i>menu</i>
        <q-toolbar-title :padding="1">
            Menu
        </q-toolbar-title>
      </div>

      <q-drawer-link icon="home" to="/chat">Home</q-drawer-link>
      <q-drawer-link icon="chat" to="/chat">Chat</q-drawer-link>

      <q-collapsible icon="info" label="About">
        <p style="padding: 25px;" class="text-grey-7">
          This is a template project combining the power of Quasar and Feathers to create real-time web apps.
        </p>
      </q-collapsible>
    </q-drawer>

    <!-- sub-routes -->
    <router-view class="layout-view" :user="user"></router-view>
    
  </q-layout>
</template>

<script>
import { Toast } from 'quasar'
import api from 'src/api'
import users from 'src/users'

export default {
  data () {
    return {
      user: null
    }
  },
  computed: {
    authenticated () {
      return users.authenticated()
    },
    admin () {
      return users.admin()
    },
    admin_mode () {
      return this.$data.adminMode
    }
  },
  methods: {
    goTo (route) {
      this.$router.push({ name: route })
    },
    admin_mode_off () {
      this.$data.adminMode = false
    },
    getUser (accessToken) {
      return api.passport.verifyJWT(accessToken)
      .then(payload => {
        return api.service('users').get(payload.userId)
      })
      .then(user => {
        this.$data.user = user
        return user
      })
    }
  },
  mounted () {
    // Check if there is already a session running
    api.authenticate()
    .then((response) => {
      return this.getUser(response.accessToken)
    })
    .then(user => {
      Toast.create.positive('Restoring previous session')
    })
    .catch(_ => {
      this.$router.push({ name: 'home' })
    })
    // On successfull login
    api.on('authenticated', response => {
      this.getUser(response.accessToken)
      .then(user => {
        this.$router.push({ name: 'home' })
      })
    })
    // On logout
    api.on('logout', () => {
      this.$data.user = null
      this.$router.push({ name: 'home' })
    })
  },
  beforeDestroy () {
  }
}
</script>

<style lang="styl">

</style>
