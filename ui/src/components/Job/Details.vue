<template>
  <v-container class="pt-10">
    <v-row>
      <v-col cols="8">
        <h1>{{ job.title }}</h1>
      </v-col>
      <v-col cols="4" class="text-right">
        <v-btn class="ml-2 mt-5" rounded small @click="goBack()">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <v-btn
          v-if="isUserAuth"
          class="ml-2 mt-5"
          rounded
          small
          @click="deleteJob(job)"
        >
          <v-icon>mdi-delete</v-icon>
        </v-btn>
        <v-btn
          v-if="isUserAuth"
          class="ml-2 mt-5"
          rounded
          small
          @click="updateJob(job)"
        >
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <div>
          <h2>{{ job.category }}</h2>
          <h3 class="my-2 text-uppercase">{{ job.title }}</h3>
          <div><b>Type:</b> {{ job.type }}</div>
          <div><b>Start Date</b> {{ job.startDate }}</div>
          <div><b>End Date:</b> {{ job.endDate }}</div>
          <div><b>is Fully Remote?:</b> {{ job.isFullyRemote }}</div>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card class="pa-2">
          <p v-html="job.description"></p>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12 auto">
        <v-dialog transition="dialog-bottom-transition" max-width="600">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-if="isUserAuth"
              class="ml-2 mt-5"
              outlined
              rounded
              small
              v-bind="attrs"
              v-on="on"
            >
              Apply
            </v-btn>
          </template>
          <template v-slot:default="dialog">
            <v-card>
              <v-toolbar color="primary" dark>Apply for a job</v-toolbar>
              <v-card-text>
                <div class="text-h4 pa-12">
                  You are one step closer to success!
                </div>
              </v-card-text>
              <v-card-actions class="justify-end">
                <v-btn text @click="dialog.value = false">Close</v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import GetJob from "../../apis/GetJob";
import ListJobs from "../../apis/ListJobs";
import DeleteJob from "../../apis/DeleteJob";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      job: {},
      jobs: [],
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
    deleteJob(job) {
      if (confirm("Do you really want to delete this job?")) {
        this.$apollo
          .mutate({
            mutation: DeleteJob,
            variables: {
              id: job.id,
            },
            update: (store, { data: { deleteJob } }) => {
              const data = store.readQuery({ query: ListJobs });
              data.listJobs.items = data.listJobs.items.filter(
                (job) => job.id !== deleteJob.id
              );
              store.writeQuery({ query: ListJobs, data });
              this.$router.push({ name: "jobs" });
            },
            optimisticResponse: {
              __typename: "Mutation",
              deleteJob: {
                __typename: "Job",
                ...job,
              },
            },
          })
          .then((data) => console.log(data))
          .catch((error) => console.error(error));
      }
    },
    updateJob(job) {
      const params = { id: job.id };
      this.$router.push({ name: "jobupdate", params });
    },
    goBack() {
      this.$router.push({ name: "jobs" });
    },
    apply() {
      // if this is implemented, this should update Jobs.applicants and User.applications
      // UpdateUser - UpdateJobss
    },
  },

  apollo: {
    job: {
      query: () => GetJob,
      variables() {
        return {
          id: this.$route.params.id,
        };
      },
      update: (data) => data.getJob,
    },
  },
};
</script>
