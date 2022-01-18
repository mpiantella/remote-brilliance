<template>
  <v-app>
    <v-app-bar app color="secondary" dark>
      <v-btn fab large plain to="/">
        <img class="mr-2" :src="require('./assets/logo.svg')" height="60" />
      </v-btn>
      <v-toolbar-title class="redFont"
        ><img class="mr-2" :src="require('./assets/long-logo.svg')" height="60"
      /></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn color="primary" text rounded to="/jobs">
        Jobs
      </v-btn>
      <v-btn color="primary" text rounded to="/auth">
        <span v-if="isUserAuth">Sign Out</span>
        <span v-else>Login</span>
      </v-btn>
      <v-btn v-if="isUserAuth" to="/profile" icon>
        <v-icon class="redFont">mdi-account</v-icon>
      </v-btn>
      <v-btn @click="toggleTheme" icon>
        <v-icon class="redFont">mdi-toggle-switch</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <router-view></router-view>
    </v-main>
    <v-footer color="primary lighten-1" padless>
      <v-layout justify-center wrap>
        <v-btn
          v-for="link in footerBar"
          :key="`${link.label}-cta-link`"
          color="white"
          text
          rounded
          class="my-2"
          :to="link.url"
        >
          {{ link.label }}
        </v-btn>
        <v-flex primary lighten-2 py-4 text-center white--text xs12>
          {{ new Date().getFullYear() }} —
          <strong>Remote Brilliance - (งツ)ว</strong>
        </v-flex>
      </v-layout>
    </v-footer>
  </v-app>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  name: "App",
  computed: {
    ...mapGetters(["getIsUserAuthenticated"]),
    isUserAuth: {
      get() {
        return this.$store.state.isUserAuth;
      },
    },
  },
  data() {
    return {
      hydrated: false,
      footerBar: [
        {
          label: "About",
          url: "/about",
        },
        {
          label: "Jobs",
          url: "/jobs",
        },
        {
          label: "Job Seeker",
          url: "/profile",
        },
        {
          label: "Level-Up",
          url: "/contents",
        },
      ],
    };
  },
  async mounted() {
    await this.$apollo.provider.defaultClient.hydrated();

    this.hydrated = true;
  },
  methods: {
    toggleTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    },
  },
};
</script>
<style>
.redFont {
  color: #f44336 !important;
}
.contrastWhite {
  color: #fff !important;
}
</style>
