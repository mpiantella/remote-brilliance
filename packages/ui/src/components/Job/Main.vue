<template>
  <v-container class="pt-10">
    <v-row>
      <v-col cols="8">
        <h1>Jobs Created By User {{ job.title }}</h1>
        <h4>Call getJobs filter by userId</h4>
      </v-col>
      <v-col cols="4" class="text-right">
        <v-btn>Manage Somethng from list</v-btn>
        <!-- 
          <v-btn class="ml-2 mt-5" rounded small @click="goBack()">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <v-btn class="ml-2 mt-5" rounded small @click="deleteJob(job)">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
        <v-btn class="ml-2 mt-5" rounded small @click="updateJob(job)">
          <v-icon>mdi-update</v-icon>
        </v-btn> -->
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" v-for="(job, i) in jobs" :key="i">
        <v-card :color="job.name">
          <div class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-card-title class="text-h5" v-text="job.title"> </v-card-title>
              <v-card-subtitle v-text="job.category"></v-card-subtitle>
              <v-card-text>
                <div><b>Start Date</b>: {{ job.startDate }}</div>
                <div><b>End Date</b>: {{ job.endDate }}</div>
                <div><b>is Fully Remote?</b>: {{ job.isFullyRemote }}</div>
              </v-card-text>
            </div>
            <v-card-actions justify-space-around>
              <v-btn class="ml-2 mt-5" outlined rounded @click="readJob(job.id)"
                >Read More
              </v-btn>
              <v-btn class="ml-2 mt-5" outlined rounded>Apply </v-btn>
            </v-card-actions>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import ListJobs from "../../apis/ListJobs";

export default {
  data() {
    return {
      job: {},
      jobs: [],
    };
  },
  methods: {
    readJob(id) {
      const params = { id: id };
      this.$router.push({ name: "jobdetails", params });
    },
    goBack() {
      this.$router.push({ name: "jobs" });
    },
  },

  apollo: {
    jobs: {
      // id should be passed through the - saved in the store or something
      query: () => ListJobs,
      variables() {
        // of get it from the store.state.user.userId
        console.log("here", this.$route.params.userId);
        return {
          // figure out filter and pass the
          userId: this.store.state.user.userId,
        };
      },
      update: (data) => data.listJobs.items,
    },
  },
};
</script>
