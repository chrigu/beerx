<template>
  <div class="login">
    <form v-if="!awsUser" class="login__form">
      <h1>Sign Up</h1>
      <input v-validate="'required'" v-model="user.username" name="username" type="text" placeholder="username">
      <div v-if="submitted && errors.has('username')" class="invalid-feedback">{{ errors.first('username') }}</div>
      <input v-validate="'required|strongPassword'" name="password" v-model="user.password" type="password" placeholder="Password">
      <div v-if="submitted && errors.has('password')" class="invalid-feedback">{{ errors.first('password') }}</div>
      <input v-validate="'required|email'" name="email" v-model="user.email" type="email" placeholder="Email">
      <div v-if="submitted && errors.has('email')" class="invalid-feedback">{{ errors.first('email') }}</div>
      <br>
      <button @click="submit">Submit</button>
    </form>
  </div>
</template>

<script>
import { Auth } from "aws-amplify";

export default {
  name: 'username',
  data() {
    return {
      user: {
        username: '',
        email: '',
        password: '',
      },
      awsUser: '',
      code: '',
      submitted: false
    };
  },
  methods: {

    submit() {
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
