<template>
     <div class="layout-padding">
      <div class="column items-center">
        <div v-if="authenticated">
          <div v-if="admin">
               <p> admin user </p>
            <div v-if="admin_mode">
               <p> in admin mode </p>
            </div>
            </div>
          <div v-else >
          <p> authenticated user </p>
         </div>
       </div>
       <div v-else >
       <p> See system administrator for how authenticate on system </p>
       </div>
    </div>
  </div>
</template>

<script>
import users from 'src/users'

export default {
  props: ['user'],
  data () {
    return {
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
      return users.admin_mode()
    }

  },
  methods: {
  },
  mounted () {
  },
  beforeDestroy () {
  }
}
</script>

<style lang="styl">

</style>
