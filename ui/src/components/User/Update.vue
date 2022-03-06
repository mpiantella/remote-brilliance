<template>
  <v-container class="pt-10">
    <v-row>
      <v-col cols="8">
        <h1>Update Profile</h1>
      </v-col>
      <v-col cols="4" class="text-right">
        <!-- Create Jobs/Create Content-->
        <!-- Add flag: ifUser IsSubcribed show CreateJob-->
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
                  v-model="user.validAddress"
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
                            v-model="user.address.address1"
                            :counter="50"
                            label="Address 1"
                            required
                          ></v-text-field>

                          <v-text-field
                            v-model="user.address.address2"
                            label="Address 2"
                          ></v-text-field>

                          <v-text-field
                            v-model="user.address.city"
                            :counter="20"
                            label="City"
                            required
                          ></v-text-field>

                          <v-text-field
                            v-model="user.address.state"
                            :counter="20"
                            label="State"
                            required
                          ></v-text-field>

                          <v-text-field
                            v-model="user.address.zipCode"
                            :counter="10"
                            label="Zip Code"
                            required
                          ></v-text-field>

                          <v-text-field
                            v-model="user.address.country"
                            :counter="20"
                            label="Country"
                            required
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-form>
              </v-col>
            </v-row>
            <!-- End of Address -->

            <!-- Start of Profile --
            <v-expansion-panel>
              <v-expansion-panel-header>
                Profile
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-text-field
                  v-model="user.profile.currentRole"
                  :counter="20"
                  label="Country"
                  required
                ></v-text-field>

                <v-text-field
                  v-model="user.profile.summary"
                  label="Summary"
                  required
                ></v-text-field>

                <v-text-field
                  v-model="user.profile.experience"
                  label="Experience"
                  required
                ></v-text-field>

                <v-text-field
                  v-model="user.profile.education"
                  label="Education"
                  required
                ></v-text-field>

                <v-text-field
                  v-model="user.profile.licenses"
                  label="Licenses"
                  required
                ></v-text-field>

                <v-text-field
                  v-model="user.profile.certifications"
                  label="Certifications"
                  required
                ></v-text-field>

                <v-text-field
                  v-model="user.profile.recommendations"
                  label="Recommendations"
                  required
                ></v-text-field>

                <v-text-field
                  v-model="user.profile.skills"
                  label="Skills"
                  required
                ></v-text-field>

                <v-text-field
                  v-model="user.profile.endorsements"
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
                  v-model="user.applications"
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
                @click="updateUser()"
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
/* eslint-disable */
import CreateUser from "../../apis/CreateUser";
import GetUserByUsername from "../../apis/GetUserByUsername";
import { mapActions } from "vuex";
// import { validationMixin } from "vuelidate";
// import { required, maxLength } from "vuelidate/lib/validators";

export default {
  components: {},

  //mixins: [validationMixin],

  // validations: {
  //   user: {
  //     address: {
  //       address1: { required, maxLength: maxLength(50) },
  //       city: { required, maxLength: maxLength(20) },
  //       state: { required, maxLength: maxLength(20) },
  //       zipCode: { required, maxLength: maxLength(10) },
  //       country: { required, maxLength: maxLength(20) },
  //     },
  //     profile: {
  //       currentRole: { required, maxLength: maxLength(20) },
  //     },
  //   },
  // },

  data() {
    return {
      user: {
        address: {},
        profile: {},
        applications: [],
      },
      panel: [],
      disabled: false,
      readonly: false,
      valid: true,
    };
  },

  computed: {
    // // address
    // address1Errors() {
    //   const errors = [];
    //   if (!this.$v.user.address.address1.$dirty) return errors;
    //   !this.$v.user.address.address1.maxLength &&
    //     errors.push("Address1 must be at most 50 characters long");
    //   !this.$v.user.address.address1.required &&
    //     errors.push("address1 is required.");
    //   return errors;
    // },
    // cityErrors() {
    //   const errors = [];
    //   if (!this.$v.user.address.city.$dirty) return errors;
    //   !this.$v.user.address.city.maxLength &&
    //     errors.push("City must be at most 20 characters long");
    //   !this.$v.user.address.city.required && errors.push("city is required.");
    //   return errors;
    // },
    // stateErrors() {
    //   const errors = [];
    //   if (!this.$v.user.address.state.$dirty) return errors;
    //   !this.$v.user.address.state.maxLength &&
    //     errors.push("State must be at most 20 characters long");
    //   !this.$v.user.address.state.required && errors.push("state is required.");
    //   return errors;
    // },
    // zipCodeErrors() {
    //   const errors = [];
    //   if (!this.$v.user.address.zipCode.$dirty) return errors;
    //   !this.$v.user.address.zipCode.maxLength &&
    //     errors.push("Zip Code must be at most 10 characters long");
    //   !this.$v.user.address.zipCode.required &&
    //     errors.push("Zip Code is required.");
    //   return errors;
    // },
    // countryErrors() {
    //   const errors = [];
    //   if (!this.$v.user.address.country.$dirty) return errors;
    //   !this.$v.user.address.country.maxLength &&
    //     errors.push("Country must be at most 20 characters long");
    //   !this.$v.user.address.country.required &&
    //     errors.push("Country is required.");
    //   return errors;
    // },
    // // profile
    // currentRoleErrors() {
    //   const errors = [];
    //   if (!this.$v.user.profile.currentRole.$dirty) return errors;
    //   !this.$v.user.profile.currentRole.maxLength &&
    //     errors.push("Current Role must be at most 20 characters long");
    //   !this.$v.user.profile.currentRole.required &&
    //     errors.push("Current Role is required.");
    //   return errors;
    // },
  },

  created() {
    this.initialize();
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
    updateUser(user) {
      const _user = {
        id: user.id,
        cognitoid: user.cognitoid,
        email: user.email,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        registered: user.registered,
        subcribed: user.subcribed,
        address: user.address,
        profile: user.profile,
        activities: user.activities,
        applications: (user.applications || "").split(","),
        subscription: user.subscription,
      };

      this.$apollo
        .mutate({
          mutation: CreateUser,
          variables: _user,
          update: (store, { data: { updateUser } }) => {
            this.$router.push({ name: "profile" });
          },
          optimisticResponse: {
            __typename: "Mutation",
            updateUser: {
              __typename: "User",
              ..._user,
            },
          },
        })
        .then((data) => console.log(data))
        .catch((error) => console.error("error!!!: ", error));
    },
    cancel() {
      this.$router.push({ name: "/" });
    },
  },
  apollo: {
    // how to store in local store
    user: {
      // id should be passed through the - saved in the store or something
      query: () => GetUserByUsername,
      variables() {
        return {
          username: this.$route.params.username,
        };
      },
      update: (data) => {
        console.log("data.listUsers.items[0] ====> ", data.listUsers.items[0]);
        return data.listUsers.items[0];
      },
    },
  },
};
</script>
