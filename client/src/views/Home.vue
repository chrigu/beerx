<template>
  <div class="home">
    <Login v-if="!signedIn"/>
    <div v-else>
      Hi user {{this.user.attributes.nickname}}
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters } from "vuex";
import Login from '@/components/Login.vue'

export default {
  name: 'home',
  components: {
    Login
  },
  computed: {
    ...mapGetters(['signedIn', 'user'])
  }
}
</script>
