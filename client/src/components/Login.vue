<template>
  <div class="hello">
    <form v-if="!signedIn" @submit.prevent="submitLogin">
      <input v-model="login" type="text" name="" placeholder="Login" >
      <input v-model="password" type="password" name="" placeholder="Password" >
      <button>Sign in</button>
    </form>
    <div v-if="signedIn">
      <button @click="signOut">Sign Out</button>
    </div>

  </div>
</template>

<script>
import { Auth } from "aws-amplify";
// https://github.com/ErikCH/Aws-auth-example/blob/master/src/components/HelloWorld.vue
export default {
  name: 'username',
  data() {
    return {
      signedIn: false,
      login: "",
      password: ""
    };
  },
  methods: {

    submitLogin() {
      Auth.signIn(this.login, this.password)
        .then(user =>{
            this.$store.state.signedIn = !!user;
            this.$store.state.user = user;
        } )
        .catch(err => console.log(err));
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
