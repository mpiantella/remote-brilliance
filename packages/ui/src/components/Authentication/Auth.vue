<template>
  <v-container class="pt-10">
    <v-row>
      <v-col class="mx-2">
        <h1>Authentication</h1>
        <div>
          <div v-if="isUserAuth">
            <p class="my-4">You are signed in. Use button below to signout</p>
            <amplify-sign-out button-text="Sign Out"></amplify-sign-out>
          </div>
          <amplify-authenticator username-alias="email">
            <amplify-sign-up
              slot="sign-up"
              username-alias="email"
              :form-fields.prop="formFields"
            ></amplify-sign-up>
            <amplify-sign-in
              slot="sign-in"
              username-alias="email"
            ></amplify-sign-in>
          </amplify-authenticator>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapGetters } from "vuex";
import { AuthState, onAuthUIStateChange } from "@aws-amplify/ui-components";
// TODO: on sign out it still not updating until reload
export default {
  name: "AuthStateApp",
  mounted() {
    // or create or what? or watch
    onAuthUIStateChange((nextAuthState, authData) => {
      console.log("Auth.onAuthUIStateChange!");
      if (nextAuthState === AuthState.SignOut) {
        console.log("user successfully signed out!");
        this.$store.dispatch("setUser", null);
        this.$store.dispatch("setIsUserAuthenticated", false);
      }
    });
  },
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
      user: undefined,
      authState: undefined,
      unsubscribeAuth: undefined,
      formFields: [
        {
          type: "email",
          label: "Email",
          placeholder: "Please enter valid email",
          // inputProps: { required: true, autocomplete: "username" },
        },
        {
          type: "password",
          label: "Password",
          placeholder: "Please enter valid password",
          // inputProps: { required: true, autocomplete: "new-password" },
        },
        {
          type: "phone_number",
          label: "Phone",
          placeholder: "Please enter valid phone",
        },
        {
          type: "name",
          label: "First Name",
          placeholder: "First Name",
        },
        {
          type: "family_name",
          label: "Last Name",
          placeholder: "Last Name",
        },
      ],
    };
  },
};
</script>

<style>
:root {
  --amplify-primary-color: #f44336;
  --amplify-primary-tint: #2196f3;
  --amplify-primary-shade: #f44336;
  --amplify-background-color: #fff;
}
</style>
