<template>
  <v-container>
    <v-row class="pt-10"><h1>Update this job</h1></v-row>
    <v-row>
      <v-col cols="12">
        <div id="app">
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-row>
              <v-col>
                <v-text-field
                  v-model="job.title"
                  :error-messages="titleErrors"
                  :counter="30"
                  label="title"
                  required
                  @input="$v.job.title.$touch()"
                  @blur="$v.job.title.$touch()"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-select
                  v-model="job.category"
                  :error-messages="categoryErrors"
                  :items="categoriesEnum"
                  label="Category"
                  required
                  @input="$v.job.category.$touch()"
                  @blur="$v.job.category.$touch()"
                ></v-select>
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-radio-group
                  label="Type"
                  v-model="job.type"
                  required
                  :error-messages="typeErrors"
                  @input="$v.job.type.$touch()"
                  @blur="$v.job.type.$touch()"
                >
                  <v-radio label="Full-Time" value="Full-time"></v-radio>
                  <v-radio label="Part-Time" value="Part-time"></v-radio>
                </v-radio-group>
              </v-col>
            </v-row>

            <!-- view editor starts | TRY TO ADD :counter="1000" -->
            <v-row>
              <v-col>
                <vue-editor
                  v-model="job.description"
                  placeholder="Add description here"
                ></vue-editor>
              </v-col>
            </v-row>
            <!-- view editor ends -->

            <v-row>
              <v-col>
                <v-radio-group
                  label="Is Fully Remote?"
                  v-model="job.isFullyRemote"
                >
                  <v-radio label="Yes" value="Yes"></v-radio>
                  <v-radio label="No" value="No"></v-radio>
                </v-radio-group>
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-text-field
                  v-model="job.howtoApply"
                  :counter="15"
                  label="How to Apply?"
                  required
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-text-field
                  v-model="job.companyName"
                  :counter="15"
                  label="Company Name"
                  required
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-text-field
                  v-model="job.companyDescription"
                  :counter="100"
                  label="Company Description"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-text-field
                  v-model="job.companyStatement"
                  :counter="200"
                  label="Company Statement"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-text-field
                  v-model="job.companyHQ"
                  :counter="15"
                  label="Company HQ"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-text-field
                  v-model="job.companyWebsiteURL"
                  :counter="30"
                  label="Company Website URL"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <!-- logo goes here -->
              </v-col>
            </v-row>

            <!-- startDate -->
            <v-row>
              <v-col>
                <v-menu
                  ref="menu1"
                  v-model="menu1"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="job.startDate"
                      label="Start Date"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      :error-messages="startDateErrors"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="job.startDate"
                    :active-picker.sync="activePicker1"
                    max="2025-01-01"
                    min="1950-01-01"
                    @change="saveMenu1"
                  ></v-date-picker>
                </v-menu>
              </v-col>
            </v-row>
            <!-- end startDate -->

            <!-- endDate -->
            <v-row
              ><v-col>
                <v-menu
                  ref="menu2"
                  v-model="menu2"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="job.endDate"
                      label="End Date"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      :error-messages="endDateErrors"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="job.endDate"
                    :active-picker.sync="activePicker2"
                    max="2025-01-01"
                    min="1950-01-01"
                    @change="saveMenu2"
                  ></v-date-picker>
                </v-menu>
              </v-col>
            </v-row>
            <!-- end endDate -->
            <!-- Action Buttons Bottom -->
            <v-row class="pt-4">
              <v-col cols="12">
                <v-btn
                  class="redFont mr-4"
                  elevation="2"
                  depressed
                  raised
                  rounded
                  @click="updateJob(job)"
                  >Update Job</v-btn
                >
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
import UpdateJob from "../../apis/UpdateJob";
import GetJob from "../../apis/GetJob";
import { VueEditor } from "vue2-editor";
import { validationMixin } from "vuelidate";
import { required, maxLength, alpha } from "vuelidate/lib/validators";

export default {
  components: {
    VueEditor,
  },

  mixins: [validationMixin],

  validations: {
    job: {
      title: { required, maxLength: maxLength(30) },
      type: { required, maxLength: maxLength(20) },
      description: { required, maxLength: maxLength(1000) },
      category: { required, alpha },
      startDate: { required, maxLength: maxLength(10) },
      endDate: { required, maxLength: maxLength(10) },
    },
  },

  data: () => ({
    job: {},
    // enumators
    categoriesEnum: [
      "Design",
      "Full-Stack Programming",
      "Front-End Programming",
      "Back-End Programming",
      "Customer Support",
      "DevOps and Sysadmin",
      "Sales and Marketing",
      "Management and Finance",
      "Product",
      "All Other Remote",
    ],
    // date picker fields
    menu1: false,
    activePicker1: null,
    menu2: false,
    activePicker2: null,
    // flags
    valid: false,
  }),

  watch: {
    menu1(val) {
      val && setTimeout(() => (this.activePicker1 = "YEAR"));
    },
    menu2(val) {
      val && setTimeout(() => (this.activePicker2 = "YEAR"));
    },
  },

  computed: {
    titleErrors() {
      const errors = [];
      if (!this.$v.job.title.$dirty) return errors;
      !this.$v.job.title.maxLength &&
        errors.push("Title must be at most 30 characters long");
      !this.$v.job.title.required && errors.push("Title is required.");
      return errors;
    },
    typeErrors() {
      const errors = [];
      if (!this.$v.job.type.$dirty) return errors;
      !this.$v.job.type.maxLength &&
        errors.push("Type must be at most 30 characters long");
      !this.$v.job.type.required && errors.push("Type is required.");
      return errors;
    },
    categoryErrors() {
      const errors = [];
      if (!this.$v.job.category.$dirty) return errors;
      !this.$v.job.category.required && errors.push("Content is required.");
      return errors;
    },
    descriptionErrors() {
      const errors = [];
      if (!this.$v.job.description.$dirty) return errors;
      !this.$v.job.description.maxLength &&
        errors.push("Description must be at most 1000 characters long");
      !this.$v.job.description.required &&
        errors.push("Description is required.");
      return errors;
    },
    startDateErrors() {
      const errors = [];
      if (!this.$v.job.startDate.$dirty) return errors;
      !this.$v.job.startDate.maxLength &&
        errors.push("startDate must be at most 10 characters long");
      !this.$v.job.startDate.required && errors.push("startDate is required.");
      return errors;
    },
    endDateErrors() {
      const errors = [];
      if (!this.$v.job.endDate.$dirty) return errors;
      !this.$v.job.endDate.maxLength &&
        errors.push("endDate must be at most 10 characters long");
      !this.$v.job.endDate.required && errors.push("endDate is required.");
      return errors;
    },
  },

  methods: {
    updateJob(job) {
      const _job = {
        id: job.id,
        title: job.title,
        category: job.category,
        type: job.type,
        userId: job.userId,
        description: job.description,
        isFullyRemote: job.isFullyRemote,
        howtoApply: job.howtoApply,
        companyDescription: job.companyDescription,
        companyHQ: job.companyHQ,
        companyName: job.companyName,
        companyStatement: job.companyStatement,
        companyWebsiteURL: job.companyWebsiteURL,
        logo: job.logo,
        startDate: job.startDate,
        endDate: job.endDate,
      };
      if (this.validate()) {
        this.$apollo
          .mutate({
            mutation: UpdateJob,
            variables: _job,
            update: (store, { data: { updateJob } }) => {
              this.$router.push({ name: "jobs" });
            },
            optimisticResponse: {
              __typename: "Mutation",
              updateJob: {
                __typename: "Job",
                ..._job,
              },
            },
          })
          .then((data) => console.log(data))
          .catch((error) => console.error("error!!!: ", error));
      } else {
        alert("This form is not valid!");
      }
    },
    saveMenu1(date) {
      this.$refs.menu1.save(date);
    },
    saveMenu2(date) {
      this.$refs.menu2.save(date);
    },
    cancel() {
      this.$router.push({ name: "jobs" });
    },
    validate() {
      return this.$refs.form.validate();
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
