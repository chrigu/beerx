import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import aws_exports from './aws-exports'
import Amplify, * as AmplifyModules from 'aws-amplify'
import VeeValidate from 'vee-validate'
import {Validator} from 'vee-validate'
import { Auth } from "aws-amplify";

Amplify.configure(aws_exports)

Vue.use(AmplifyModules)

// https://github.com/baianat/vee-validate/issues/51
Validator.extend('strongPassword', {
  // getMessage: field => 'Das Passwort muss Grossbuchstaben, Zahlen und Sonderzeichen beinhalten',
  validate: value => {
    const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*?(),.":{}|<>+])(?=.{8,})/;
    return strongRegex.test(value);
  }
})
Vue.use(VeeValidate)

Vue.config.productionTip = false

Auth.currentAuthenticatedUser({
  bypassCache: false  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
}).then(user => store.dispatch('setUser', user))
.catch(err => console.log(err));

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
