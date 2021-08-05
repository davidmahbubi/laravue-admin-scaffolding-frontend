<template>
  <div id="app">
    <!-- Loader starts-->
    <div class="loader-wrapper" :class="{ loderhide: !loader }">
      <div class="loader-index">
        <span></span>
      </div>
    </div>
    <!-- Loader ends-->
    <!--<Main/>-->
    <router-view />
  </div>
</template>

<script>
import { VERIFY_TOKEN } from './store/store.type';

export default {
  name: 'app',
  data() {
    return {
      loader: true,
    };
  },
  async created() {
    await this.verifyToken();
  },
  methods: {
    async verifyToken() {
      if (this.$route.meta.requiresAuth) {
        try {
          await this.$store.dispatch(`auth/${VERIFY_TOKEN}`);
          this.loader = false;
        } catch (err) {
          await this.$router.replace({ name: 'auth' });
          this.loader = false;
          console.error(err);
        }
      } else {
        this.loader = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.loader-wrapper.loderhide {
  display: none;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
