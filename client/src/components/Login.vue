<template>
  <div class="signin">
    <form @submit.prevent="submitLogin">
      <input v-model="login" v-validate="'required'" type="text" name="login" placeholder="Login">
      <div
        v-if="submitted && errors.has('login')"
        class="invalid-feedback"
      >{{ errors.first('login') }}</div>
      <input
        v-model="password"
        v-validate="'required'"
        type="password"
        name="pasword"
        placeholder="Password"
      >
      <div
        v-if="submitted && errors.has('password')"
        class="invalid-feedback"
      >{{ errors.first('password') }}</div>
      <button>Sign in</button>
    </form>
  </div>
</template>

<script>
import { Auth } from "aws-amplify";
import { mapActions } from "vuex";
// https://github.com/ErikCH/Aws-auth-example/blob/master/src/components/HelloWorld.vue
export default {
  name: "username",
  data() {
    return {
      login: "",
      password: "",
      submitted: false
    };
  },
  methods: {
    ...mapActions(["setUser"]),
    submitLogin() {
      this.submitted = true;
      this.$validator.validate().then(valid => {
        if (valid) {
          Auth.signIn(this.login, this.password)
            .then(user => {
              this.setUser(user);
              this.$router.push('/dashboard')
            })
            .catch(err => console.log(err));
        }
      });
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
