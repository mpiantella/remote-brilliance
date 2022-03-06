<template>
  <v-container class="pt-10">
    <v-row>
      <v-col cols="8">
        <h1>activity {{ activity.name }}</h1>
      </v-col>
      <v-col cols="4" class="text-right">
        <v-btn class="ml-2 mt-5" rounded small @click="goBack()">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <v-btn
          class="ml-2 mt-5"
          rounded
          small
          @click="deleteActivity(activity)"
        >
          <v-icon>mdi-delete</v-icon>
        </v-btn>
        <v-btn
          class="ml-2 mt-5"
          rounded
          small
          @click="updateActivity(activity)"
        >
          <v-icon>mdi-update</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <div>
          <h2>
            {{ activity.description }}
          </h2>
          <div><b>Date</b>: {{ activity.date }}</div>
          <div><b>Status</b>: {{ activity.status }}</div>
          <div><b>Event Host</b>: {{ activity.userId }}</div>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12"><p v-html="activity.content"></p> </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-btn
          class="ml-2 mt-5"
          outlined
          rounded
          small
          @click="register(activity)"
        >
          Register
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import GetActivity from "../../apis/GetActivity";
import ListActivities from "../../apis/ListActivities";
import DeleteActivity from "../../apis/DeleteActivity";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      activity: {},
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
    deleteActivity(activity) {
      if (confirm("Do you really want to delete this activity?")) {
        this.$apollo
          .mutate({
            mutation: DeleteActivity,
            variables: {
              id: activity.id,
            },
            update: (store, { data: { deleteActivity } }) => {
              const data = store.readQuery({ query: ListActivities });
              data.listActivities.items = data.listActivities.items.filter(
                (activity) => activity.id !== deleteActivity.id
              );
              store.writeQuery({ query: ListActivities, data });
              this.$router.push({ name: "contents" });
            },
            optimisticResponse: {
              __typename: "Mutation",
              deleteActivity: {
                __typename: "Activity",
                ...activity,
              },
            },
          })
          .then((data) => console.log(data))
          .catch((error) => console.error(error));
      }
    },
    updateActivity(activity) {
      // TODO
    },
    goBack() {
      this.$router.push({ name: "contents" });
    },
    register() {
      // TODO
    },
  },

  apollo: {
    activity: {
      // id should be passed through the - saved in the store or something
      query: () => GetActivity,
      variables() {
        return {
          id: this.$route.params.id,
        };
      },
      update: (data) => data.getActivity,
    },
  },
};
</script>
