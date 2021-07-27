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
                    <form class="theme-form">
                      <h4>Sign in to account</h4>
                      <p>Enter your email & password to login</p>
                      <div class="form-group">
                        <label class="col-form-label">Email Address</label>
                        <input
                          v-model="email"
                          class="form-control"
                          type="email"
                          required=""
                          placeholder="Test@gmail.com"
                          :class="{
                            'is-invalid': submitted && !email
                          }"
                        />
                        <div
                          v-show="submitted && !email"
                          class="invalid-feedback"
                        >
                          Email is required
                        </div>
                      </div>
                      <div class="form-group">
                        <label class="col-form-label">Password</label>
                        <input
                          v-model="password"
                          autocomplete=""
                          class="form-control"
                          :type="type"
                          name="login[password]"
                          required=""
                          placeholder="*********"
                          :class="{
                            'is-invalid': submitted && !email
                          }"
                        />
                        <div
                          v-show="submitted && !password"
                          class="invalid-feedback"
                        >
                          Email is required
                        </div>
                        <div class="show-hide" @click="showPassword">
                          <span class="show"></span>
                        </div>
                      </div>
                      <div class="form-group mb-0">
                        <div class="checkbox p-0">
                          <input id="checkbox1" type="checkbox" />
                          <label class="text-muted" for="checkbox1"
                            >Remember password</label
                          >
                        </div>
                        <button
                          class="btn btn-primary btn-block"
                          type="button"
                          @click="signUp"
                        >
                          Login
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
export default {
  data: () => ({
    email: '',
    password: '',
    type: 'password',
    passwordRemember: false,
    submitted: false
  }),
  methods: {
    showPassword: function() {
      if (this.type === 'password') {
        this.type = 'text';
      } else {
        this.type = 'password';
      }
    },
    signUp() {}
  }
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

<style scoped>
.custom-logo {
  max-width: 200px;
  margin-bottom: 15px;
}
</style>
