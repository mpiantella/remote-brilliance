<template>
  <v-container class="pt-10">
    <v-row>
      <v-col cols="8">
        <h1>Create User Profile</h1>
      </v-col>
      <v-col cols="4" class="text-right">
        <!-- Create Jobs/Create Content-->
        <!-- Add flag: ifUser IsSubcribed show CreateJob-->
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
          <br />
        </v-card>

        <div class="pt-10">
          <v-expansion-panels v-model="panel" :disabled="disabled" multiple>
            <!-- Start of Address -->
            <v-row>
              <v-col class="12">
                <v-form
                  ref="formAddress"
                  v-model="validAddress"
                  lazy-validation
                >
                  <v-expansion-panel>
                    <v-expansion-panel-header>
                      Address
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                      <v-row>
                        <v-col>
                          <v-text-field
                            v-model="address.address1"
                            :error-messages="address1Errors"
                            :counter="50"
                            label="Address 1"
                            required
                            @input="$v.address.address1.$touch()"
                            @blur="$v.address.address1.$touch()"
                          ></v-text-field>

                          <v-text-field
                            v-model="address.address2"
                            label="Address 2"
                          ></v-text-field>

                          <v-text-field
                            v-model="address.city"
                            :error-messages="cityErrors"
                            :counter="20"
                            label="City"
                            required
                            @input="$v.address.city.$touch()"
                            @blur="$v.address.city.$touch()"
                          ></v-text-field>

                          <v-text-field
                            v-model="address.state"
                            :error-messages="stateErrors"
                            :counter="20"
                            label="State"
                            required
                            @input="$v.address.state.$touch()"
                            @blur="$v.address.state.$touch()"
                          ></v-text-field>

                          <v-text-field
                            v-model="address.zipCode"
                            :error-messages="zipCodeErrors"
                            :counter="10"
                            label="Zip Code"
                            required
                            @input="$v.address.zipCode.$touch()"
                            @blur="$v.address.zipCode.$touch()"
                          ></v-text-field>

                          <v-text-field
                            v-model="address.country"
                            :error-messages="countryErrors"
                            :counter="20"
                            label="Country"
                            required
                            @input="$v.address.country.$touch()"
                            @blur="$v.address.country.$touch()"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-form>
              </v-col>
            </v-row>
            <!-- End of Address -->

            <!-- Start of Profile -->
            <v-expansion-panel>
              <v-expansion-panel-header>
                Profile
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-text-field
                  v-model="profile.currentRole"
                  :error-messages="currentRoleErrors"
                  :counter="20"
                  label="Country"
                  required
                  @input="$v.profile.currentRole.$touch()"
                  @blur="$v.profile.currentRole.$touch()"
                ></v-text-field>
                <!-- currentRole: "", // required!
                    summary: "",
                    experience: [], // profileEvent
                    education: [], // profileEvent
                    licenses: [],
                    certifications: [],
                    recommendations: [],
                    skills: [],
                    endorsements: [],}-->
                <v-text-field
                  v-model="profile.summary"
                  label="Summary"
                  required
                ></v-text-field>

                <v-text-field
                  v-model="profile.experience"
                  label="Experience"
                  required
                ></v-text-field>

                <v-text-field
                  v-model="profile.education"
                  label="Education"
                  required
                ></v-text-field>

                <v-text-field
                  v-model="profile.licenses"
                  label="Licenses"
                  required
                ></v-text-field>

                <v-text-field
                  v-model="profile.certifications"
                  label="Certifications"
                  required
                ></v-text-field>

                <v-text-field
                  v-model="profile.recommendations"
                  label="Recommendations"
                  required
                ></v-text-field>

                <v-text-field
                  v-model="profile.skills"
                  label="Skills"
                  required
                ></v-text-field>

                <v-text-field
                  v-model="profile.endorsements"
                  label="Endorsements"
                  required
                ></v-text-field>
              </v-expansion-panel-content>
            </v-expansion-panel>
            <!-- End of Profile -->

            <!-- Start of Activities -->
            <v-expansion-panel>
              <v-expansion-panel-header>
                Activities
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <!-- activities -->
              </v-expansion-panel-content>
            </v-expansion-panel>
            <!-- End of Activities -->

            <!-- Start of Applications -->
            <v-expansion-panel>
              <v-expansion-panel-header>
                Applications
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-text-field
                  v-model="applications"
                  label="Applications"
                ></v-text-field>
              </v-expansion-panel-content>
            </v-expansion-panel>
            <!-- End of Applications -->

            <!-- Start of Subscription -->
            <v-expansion-panel>
              <v-expansion-panel-header>
                Subscription
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <!-- 
                  subscriptionsId: String!
                  userId: String!
                  billing: Billing
                  active: Boolean
                -->
              </v-expansion-panel-content>
            </v-expansion-panel>
            <!-- End of Subscription -->
          </v-expansion-panels>
          <v-row class="pt-4">
            <v-col cols="12">
              <v-btn
                class="redFont mr-4"
                elevation="2"
                depressed
                raised
                rounded
                @click="createUser()"
              >
                Update Profile
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
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CreateUser from "../../apis/CreateUser";
import { mapGetters, mapActions } from "vuex";
import { validationMixin } from "vuelidate";
import { required, maxLength } from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],

  validations: {
    address: {
      address1: { required, maxLength: maxLength(50) },
      city: { required, maxLength: maxLength(20) },
      state: { required, maxLength: maxLength(20) },
      zipCode: { required, maxLength: maxLength(10) },
      country: { required, maxLength: maxLength(20) },
    },
    profile: {
      currentRole: { required, maxLength: maxLength(20) },
    },
  },

  computed: {
    ...mapGetters(["getUser"]),
    user: {
      get() {
        return this.$store.state.user;
      },
    },
    // address
    address1Errors() {
      const errors = [];
      if (!this.$v.address.address1.$dirty) return errors;
      !this.$v.address.address1.maxLength &&
        errors.push("Address1 must be at most 50 characters long");
      !this.$v.address.address1.required &&
        errors.push("address1 is required.");
      return errors;
    },
    cityErrors() {
      const errors = [];
      if (!this.$v.address.city.$dirty) return errors;
      !this.$v.address.city.maxLength &&
        errors.push("City must be at most 20 characters long");
      !this.$v.address.city.required && errors.push("city is required.");
      return errors;
    },
    stateErrors() {
      const errors = [];
      if (!this.$v.address.state.$dirty) return errors;
      !this.$v.address.state.maxLength &&
        errors.push("State must be at most 20 characters long");
      !this.$v.address.state.required && errors.push("state is required.");
      return errors;
    },
    zipCodeErrors() {
      const errors = [];
      if (!this.$v.address.zipCode.$dirty) return errors;
      !this.$v.address.zipCode.maxLength &&
        errors.push("Zip Code must be at most 10 characters long");
      !this.$v.address.zipCode.required && errors.push("Zip Code is required.");
      return errors;
    },
    countryErrors() {
      const errors = [];
      if (!this.$v.address.country.$dirty) return errors;
      !this.$v.address.country.maxLength &&
        errors.push("Country must be at most 20 characters long");
      !this.$v.address.country.required && errors.push("Country is required.");
      return errors;
    },
    // profile
    currentRoleErrors() {
      const errors = [];
      if (!this.$v.profile.currentRole.$dirty) return errors;
      !this.$v.profile.currentRole.maxLength &&
        errors.push("Current Role must be at most 20 characters long");
      !this.$v.profile.currentRole.required &&
        errors.push("Current Role is required.");
      return errors;
    },
  },
  created() {
    this.initialize();
  },
  // comes from registration page - or needs to re
  // ISREGISTER - ISUPDATE - ISREAD
  data() {
    return {
      // address
      address: {
        address1: "",
        address2: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
      },
      // ProfileEvent
      profileEvent: {
        title: "",
        content: "",
        area: "",
        startDate: "",
        endDate: "",
      },
      // Profile
      profile: {
        currentRole: "", // required!
        summary: "",
        experience: [], // profileEvent
        education: [], // profileEvent
        licenses: [],
        certifications: [],
        recommendations: [],
        skills: [],
        endorsements: [],
      },
      activities: {
        id: "", // !
        userId: "", //!
        name: "", //!
        description: "",
        content: "",
        status: "",
        date: "",
        // comments: [], //Comment
      },
      applications: [],
      // valid
      validAddress: false,
      disabled: false,
      panel: [],
    };
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
    createUser() {
      const user = {
        email: this.user.email,
        cognitoid: this.user.cognitoid,
        username: this.user.username,
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        phone: this.user.phone,
        //
        registered: false,
        subcribed: false,
        // address
        address: this.address,
        profile: this.profile,
        activities: this.activities,
        applications: this.applications.split(","),
        subscription: this.subscription,
      };

      console.log(JSON.stringify(user));
      console.log("formAddress: ", this.$refs.formAddress.validate());
      if (this.$refs.formAddress.validate()) {
        this.$apollo
          .mutate({
            mutation: CreateUser,
            variables: user,
            update: (store, { data: { createUser } }) => {
              // const data = store.readQuery({
              //   query: GetUser,
              //   variables: createUser.id,
              // });
              // data.GetUser.update(createUser);
              // store.writeQuery({ query: GetUser,  });
              console.log(
                "\t\t\tthis.$apollo.mutate.createUser" +
                  JSON.stringify(createUser, null, 2)
              );
              // this.$router.push({
              //   name: "profile",
              //   params: { id: createUser.id },
              // });
            },
            optimisticResponse: {
              __typename: "Mutation",
              createUser: {
                __typename: "User",
                ...user,
              },
            },
          })
          .then((data) => console.log(data))
          .catch((error) => console.error("error!!!: ", error));
      } else {
        alert("This form is not valid!");
      }
    },
    cancel() {
      // no
      this.isEdit = false;
    },
  },
};
// apollo get user
</script>
