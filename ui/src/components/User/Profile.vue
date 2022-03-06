<template>
  <v-container class="pt-10">
    <v-row>
      <v-col cols="6">
        <h1>User profile</h1>
      </v-col>
      <v-col cols="6" class="text-right">
        <!-- <v-btn
          class="ml-2 redFont"
          elevation="2"
          depressed
          raised
          rounded
          @click="updateUser()"
        >
          Update Profile
        </v-btn> -->
        <v-btn
          class="ml-2 redFont"
          elevation="2"
          depressed
          raised
          rounded
          to="/jobs"
          >Manage Jobs
        </v-btn>
        <v-btn
          class="ml-2 redFont"
          elevation="2"
          depressed
          raised
          rounded
          to="/contents"
          >Manage Content
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card elevation="2" class="pa-4 mx-auto" outlined>
          <h3 v-if="user">
            {{ user.firstName }} {{ user.lastName }}'s profile
          </h3>
          <br />
          <div><b>Email</b> {{ user.email }}</div>
          <br />
          <div><b>Phone</b> {{ user.phone }}</div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { validationMixin } from "vuelidate";

export default {
  mixins: [validationMixin],

  computed: {
    ...mapGetters(["getUser"]),
    user: {
      get() {
        return this.$store.state.user;
      },
    },
  },
  created() {
    this.initialize();
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions(["fetchUser"]),
    initialize() {
      if (!this.user) {
        this.fetchUser().then((user) => {
          this.user = user;
        });
      }
    },
    updateUser() {
      const params = { username: this.user.username };
      this.$router.push({ name: "userupdate", params });
    },
  },
};
// apollo get user
</script>
