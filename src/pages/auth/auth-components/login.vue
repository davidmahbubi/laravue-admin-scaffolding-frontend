<template>
  <div>
    <div class="container-fluid p-0">
      <div class="row m-0">
        <div class="col-12 p-0">
          <div class="login-card">
            <div>
              <div>
                <a class="logo">
                  <img
                    class="img-fluid for-light custom-logo"
                    src="./../../../assets/images/logo/laravel-wordmark.svg"
                    alt="looginpage"
                  />
                  <img
                    class="img-fluid for-dark custom-logo"
                    src="./../../../assets/images/logo/laravel-wordmark.svg"
                    alt="looginpage"
                  />
                </a>
              </div>
              <div class="login-main">
                <b-card>
                  <b-card-text>
                    <form class="theme-form" @submit.prevent="login">
                      <h4>Sign in to account</h4>
                      <p>Enter your email & password to login</p>
                      <div class="form-group">
                        <label for="email-input" class="col-form-label"
                          >Email Address</label
                        >
                        <input
                          v-model="email"
                          id="email-input"
                          class="form-control"
                          type="email"
                          placeholder="Test@gmail.com"
                          :class="{
                            'is-invalid':
                              submitted &&
                              showInvalids &&
                              invalidMessages.email != '',
                          }"
                        />
                        <div
                          v-show="
                            submitted &&
                            showInvalids &&
                            invalidMessages.email != ''
                          "
                          class="invalid-feedback"
                        >
                          {{ invalidMessages.email }}
                        </div>
                      </div>
                      <div class="form-group">
                        <label for="label-input" class="col-form-label"
                          >Password</label
                        >
                        <input
                          v-model="password"
                          autocomplete=""
                          id="label-input"
                          class="form-control"
                          :type="type"
                          placeholder="*********"
                          :class="{
                            'is-invalid':
                              submitted &&
                              showInvalids &&
                              invalidMessages.password != '',
                          }"
                        />
                        <div
                          v-show="
                            submitted &&
                            showInvalids &&
                            invalidMessages.password != ''
                          "
                          class="invalid-feedback"
                        >
                          {{ invalidMessages.password }}
                        </div>
                        <div class="show-hide" @click="showPassword">
                          <!-- <span class="show"> </span> -->
                          <feather
                            type="eye"
                            class="show-pw-icon"
                            :class="{
                              'pw-invalid':
                                submitted &&
                                showInvalids &&
                                invalidMessages.password != '',
                            }"
                            :size="15"
                          ></feather>
                        </div>
                      </div>
                      <div class="form-group mb-0">
                        <div class="checkbox p-0">
                          <input id="checkbox1" type="checkbox" />
                          <label class="text-muted" for="checkbox1"
                            >Remember password</label
                          >
                        </div>
                        <button class="btn btn-primary btn-block" type="submit">
                          <b-spinner
                            variant="white"
                            v-show="btnLoading"
                          ></b-spinner>
                          <span v-show="!btnLoading"> Login </span>
                        </button>
                      </div>
                      <p class="mt-4 mb-0">
                        Don't have account?
                        <router-link class="ml-2" tag="a" to="/auth/register">
                          Create Account
                        </router-link>
                      </p>
                    </form>
                  </b-card-text>
                </b-card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- latest jquery-->
  </div>
</template>

<script>
import { LOGIN } from '../../../store/store.type';

export default {
  data: () => ({
    email: '',
    password: '',
    type: 'password',
    passwordRemember: false,
    submitted: false,
    showInvalids: false,
    btnLoading: false,
    invalidMessages: {
      email: '',
      password: '',
    },
  }),
  methods: {
    showPassword: function () {
      if (this.type === 'password') {
        this.type = 'text';
      } else {
        this.type = 'password';
      }
    },
    async login() {
      try {
        this.btnLoading = true;
        this.resetInvalids();
        this.submitted = true;
        await this.$store.dispatch(`auth/${LOGIN}`, {
          email: this.email,
          password: this.password,
        });
        this.$router.push({ name: 'dashboard' });
      } catch (err) {
        switch (err.response.status) {
          case 401:
            this.invalidMessages.email = 'Invalid Credentials';
            this.password = '';
            this.showInvalids = true;
            break;
          case 422:
            this.invalidMessages.email = err.response.data.errors.email
              ? err.response.data.errors.email[0]
              : '';
            this.invalidMessages.password = err.response.data.errors.password
              ? err.response.data.errors.password[0]
              : '';
            this.showInvalids = true;
        }
      } finally {
        this.btnLoading = false;
      }
    },
    resetInvalids() {
      this.showInvalids = false;
      this.invalidMessages.email = '';
      this.invalidMessages.password = '';
    },
  },
};
// import firebase from 'firebase';
// import Userauth from '../js/index';
// export default {
//   name: 'login',
//   data() {
//     return {
//       type: 'password',
//       email: 'test@admin.com',
//       password: 'test@123456',
//       username: '',
//       passwordjwt: '',
//       submitted: false
//     };
//   },
//   computed: {
//     // JWT authentication
//     loggingIn() {
//       return this.$store.state.authentication.status.loggingIn;
//     }
//   },
//   created() {
//     // reset login status for JWT
//     this.$store.dispatch('authentication/logout');
//   },
//   methods: {
//     // JWT authentication
//     handleSubmit() {
//       this.submitted = true;
//       const { username, passwordjwt } = this;
//       const { dispatch } = this.$store;
//       if (username && passwordjwt) {
//         dispatch('authentication/login', { username, passwordjwt });
//       }
//     },
//     // show/hide password
//     showPassword: function() {
//       if (this.type === 'password') {
//         this.type = 'text';
//       } else {
//         this.type = 'password';
//       }
//     },
//     // Firebase login
//     signUp: function() {
//       this.submitted = true;
//       if (this.email == '' && this.password == '') {
//         (this.email = 'test@admin.com'), (this.password = 'test@123456');
//       } else {
//         firebase
//           .auth()
//           .signInWithEmailAndPassword(this.email, this.password)
//           .then(
//             result => {
//               Userauth.localLogin(result);
//               this.$router.replace('/');
//             },
//             err => {
//               (this.email = 'test@admin.com'), (this.password = 'test@123456');
//               this.$toasted.show('Oops...' + err.message, {
//                 theme: 'bubble',
//                 position: 'bottom-right',
//                 type: 'error',
//                 duration: 2000
//               });
//             }
//           );
//       }
//     },
//     // Social login
//     socialLogin() {
//       const provider = new firebase.auth.GoogleAuthProvider();
//       firebase
//         .auth()
//         .signInWithPopup(provider)
//         .then(result => {
//           Userauth.localLogin(result);
//           this.$router.replace('/');
//         })
//         .catch(err => {
//           alert('Oops. ' + err.message);
//         });
//     },
//     socialLoginFacebook() {
//       const provider = new firebase.auth.FacebookAuthProvider();
//       firebase
//         .auth()
//         .signInWithPopup(provider)
//         .then(result => {
//           Userauth.localLogin(result);
//           this.$router.replace('/');
//         })
//         .catch(err => {
//           alert('Oops. ' + err.message);
//         });
//     },
//     socialLoginTwitter() {
//       const provider = new firebase.auth.TwitterAuthProvider();
//       firebase
//         .auth()
//         .signInWithPopup(provider)
//         .then(result => {
//           Userauth.localLogin(result);
//           this.$router.replace('/');
//         })
//         .catch(err => {
//           alert('Oops. ' + err.message);
//         });
//     },
//     socialLoginGit() {
//       const provider = new firebase.auth.GithubAuthProvider();
//       firebase
//         .auth()
//         .signInWithPopup(provider)
//         .then(result => {
//           Userauth.localLogin(result);
//           this.$router.replace('/');
//         })
//         .catch(err => {
//           alert('Oops. ' + err.message);
//         });
//     },
//     // Auth0 login
//     login() {
//       Userauth.login();
//     }
//   }
// };
</script>

<style lang="scss">
.custom-logo {
  max-width: 200px;
}

.show-pw-icon {
  color: var(--theme-deafult);
  font-size: 13px;
  margin-top: 10px;
  transition: 0.2s;
}

.show-pw-icon.pw-invalid {
  transform: translateX(-10px);
}
</style>
