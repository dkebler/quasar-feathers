<template>
     <div class="layout-padding">
      <div class="column items-center">
        <div v-if="authenticated">
          <div v-if="admin_user">
             <button>
             <i>featured_play_list</i>
             <q-tooltip anchor="bottom middle" self="top middle" :offset="[0, 0]">Admin User</q-tooltip>
             Admin
             </button>
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

export default {
  props: ['user'],
  data () {
    return {
    }
  },
  computed: {
    authenticated () {  // return this.user !== null
      return true
    },
    admin_user () { return false }
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
