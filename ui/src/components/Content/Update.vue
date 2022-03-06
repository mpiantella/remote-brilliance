<template>
  <v-container>
    <v-row class="pt-10"><h1>Activity Update</h1></v-row>
    <v-row>
      <v-col cols="12">
        <div id="app">
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-row>
              <v-col>
                <v-text-field
                  v-model="activity.name"
                  :error-messages="nameErrors"
                  :counter="30"
                  label="name"
                  required
                  @input="$v.activity.name.$touch()"
                  @blur="$v.activity.name.$touch()"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-text-field
                  v-model="activity.description"
                  :error-messages="descriptionErrors"
                  :counter="50"
                  label="description"
                  required
                  @input="$v.activity.description.$touch()"
                  @blur="$v.activity.description.$touch()"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-select
                  :items="statusEnum"
                  v-model="activity.status"
                  label="status"
                ></v-select>
              </v-col>
            </v-row>
            <!-- start date  
          https://vuetifyjs.com/en/components/date-pickers/#dialog-and-menu-->
            <v-row
              ><v-col>
                <v-menu
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="activity.date"
                      label="Event Date"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      :error-messages="dateErrors"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="activity.date"
                    :active-picker.sync="activePicker"
                    max="2025-01-01"
                    min="1950-01-01"
                    @change="save"
                  ></v-date-picker>
                </v-menu>
              </v-col>
            </v-row>
            <!-- end date -->
            <!-- view editor starts -->
            <v-row>
              <v-col>
                <vue-editor
                  v-model="activity.content"
                  placeholder="Add content here"
                  :counter="1000"
                ></vue-editor>
              </v-col>
            </v-row>
            <!-- view editor ends -->
            <v-row class="pt-4">
              <v-col cols="12">
                <v-btn
                  class="redFont mr-4"
                  elevation="2"
                  depressed
                  raised
                  rounded
                  @click="updateActivity(activity)"
                  >Update Content
                </v-btn>
                <v-btn
                  class="redFont mr-4"
                  elevation="2"
                  depressed
                  raised
                  rounded
                  @click="cancel()"
                  >Cancel
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
/* eslint-disable no-console */
import GetActivity from "../../apis/GetActivity";
import UpdateActivity from "../../apis/UpdateActivity";
import ListActivities from "../../apis/ListActivities";
import { VueEditor } from "vue2-editor";
import { validationMixin } from "vuelidate";
import { required, maxLength, alpha } from "vuelidate/lib/validators";

export default {
  components: {
    VueEditor,
  },

  mixins: [validationMixin],

  validations: {
    activity: {
      name: { required, maxLength: maxLength(30) },
      description: { required, maxLength: maxLength(50) },
      status: { required, alpha },
      content: { required, maxLength: maxLength(1000) },
      date: { required },
    },
  },

  data() {
    return {
      activity: {},
      statusEnum: ["open", "closed"],
      activePicker: null,
      menu: false,
      valid: false,
    };
  },

  watch: {
    menu(val) {
      val && setTimeout(() => (this.activePicker = "YEAR"));
    },
  },

  computed: {
    nameErrors() {
      const errors = [];
      if (!(this.$v.activity || {}).name.$dirty) return errors;
      !(this.$v.activity || {}).name.maxLength &&
        errors.push("Name must be at most 20 characters long");
      !(this.$v.activity || {}).required && errors.push("Name is required.");
      return errors;
    },
    descriptionErrors() {
      const errors = [];
      if (!this.$v.activity.description.$dirty) return errors;
      !this.$v.activity.description.maxLength &&
        errors.push("Description must be at most 30 characters long");
      !this.$v.activity.description.required &&
        errors.push("Description is required.");
      return errors;
    }, //date
    dateErrors() {
      const errors = [];
      if (!this.$v.activity.date.$dirty) return errors;
      !this.$v.activity.date.maxLength &&
        errors.push("Date must be at most 10 characters long");
      !this.$v.activity.date.required && errors.push("Date is required.");
      return errors;
    },
    contentErrors() {
      const errors = [];
      if (!this.$v.activity.content.$dirty) return errors;
      !this.$v.activity.content.maxLength &&
        errors.push("Content must be at most 500 characters long");
      !this.$v.activity.content.required && errors.push("Content is required.");
      return errors;
    },
  },
  methods: {
    updateActivity(activity) {
      const _activity = {
        id: activity.id,
        userId: activity.userId,
        name: activity.name,
        description: activity.description,
        content: activity.content,
        status: activity.status,
        date: activity.date,
      };
      if (this.validate()) {
        this.$apollo
          .mutate({
            mutation: UpdateActivity,
            variables: _activity,
            update: (store, { data: { updateActivity } }) => {
              this.$router.push({ name: "contents" }); //.catch(() => {})
            },
            optimisticResponse: {
              __typename: "Mutation",
              updateActivity: {
                __typename: "Activity",
                ..._activity,
              },
            },
          })
          .then((data) => console.log(data))
          .catch((error) => console.error("error!!!: ", error));
      } else {
        alert("This form is not valid!");
      }
    },
    save(date) {
      this.$refs.menu.save(date);
    },
    cancel() {
      this.$router.push({ name: "contents" });
    },
    validate() {
      return this.$refs.form.validate();
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
