<template>
  <div class="login">
    <form v-if="!awsUser" @submit.prevent="submitSignup" class="login__form">
      <h1>Sign Up</h1>
      <input
        v-validate="'required'"
        v-model="user.username"
        name="username"
        type="text"
        placeholder="username"
      >
      <div
        v-if="submitted && errors.has('username')"
        class="invalid-feedback"
      >{{ errors.first('username') }}</div>
      <input
        v-validate="'required|strongPassword'"
        name="password"
        v-model="user.password"
        type="password"
        placeholder="Password"
      >
      <div
        v-if="submitted && errors.has('password')"
        class="invalid-feedback"
      >{{ errors.first('password') }}</div>
      <input
        v-validate="'required|email'"
        name="email"
        v-model="user.email"
        type="email"
        placeholder="Email"
      >
      <div
        v-if="submitted && errors.has('email')"
        class="invalid-feedback"
      >{{ errors.first('email') }}</div>
      <br>
      <button type="submit">Submit</button>
    </form>
    <form v-else class="login__form" @submit.prevent="submitCode">
      <h2>Confirm Sign Up</h2>
      <input v-model="code" type="text" placeholder="Code" name="code" v-validate="'required'">
      <button>Submit</button>
    </form>
  </div>
</template>

<script>
import { Auth } from "aws-amplify";

export default {
  name: "username",
  data() {
    return {
      user: {
        username: "",
        email: "",
        password: ""
      },
      awsUser: "",
      code: "",
      submitted: false
    };
  },
  methods: {
    submitSignup() {
      this.submitted = true;
      this.$validator.validate().then(valid => {
        if (valid) {
          Auth.username({
            username: this.user.username,
            password: this.user.password,
            attributes: {
              email: this.user.email,
              nickname: this.user.username
            },
            validationData: [] // optional
          })
            .then(data => (this.awsUser = data.user))
            .catch(err => console.log(err));
        }
      });
    },

    submitCode() {
      Auth.confirmSignUp(this.user.username, this.code, {
        // Optional. Force user confirmation irrespective of existing alias. By default set to True.
        forceAliasCreation: true
      })
        .then(data => this.$router.push("/"))
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
