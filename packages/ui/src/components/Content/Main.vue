<template>
  <v-container class="pt-10">
    <v-row>
      <v-col>
        <h1>A community of learning!</h1>
      </v-col>
      <v-col cols="4" class="text-right">
        <!-- This button can only be displayed if user is logged in-->
        <v-btn
          v-if="isUserAuth"
          class="redFont"
          elevation="2"
          depressed
          raised
          rounded
          to="/contentcreate"
          >Create Content</v-btn
        >
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" v-for="(activity, i) in activities" :key="i">
        <v-card :color="activity.name">
          <div class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-card-title class="text-h5" v-text="activity.name">
              </v-card-title>
              <v-card-subtitle v-text="activity.description"></v-card-subtitle>
              <v-card-text>
                <div><b>Date</b>: {{ activity.date }}</div>
                <div><b>Status</b>: {{ activity.status }}</div>
              </v-card-text>
            </div>
            <v-card-actions justify-space-around>
              <v-btn
                class="ml-2 mt-5"
                outlined
                rounded
                @click="readActivity(activity.id)"
                >Read More
              </v-btn>
            </v-card-actions>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import ListActivities from "../../apis/ListActivities";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      activities: [],
    };
  },

  computed: {
    ...mapGetters(["getIsUserAuthenticated"]),
    isUserAuth: {
      get() {
        return this.$store.state.isUserAuth;
      },
    },
  },

  methods: {
    readActivity(id) {
      const params = { id: id };
      this.$router.push({ name: "contentdetails", params });
    },
  },
  apollo: {
    activities: {
      query: () => ListActivities,
      update: (data) => data.listActivities.items,
    },
  },
};
</script>
