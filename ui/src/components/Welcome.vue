<template>
  <v-container fluid>
    <v-row class="align-center text-center primary">
      <v-col cols="12" class="ma-6">
        <!-- not flex enough -->
        <h1 class="titleMsg">Improve your life while working from home</h1>
      </v-col>
      <v-col cols="12" class="ma-6">
        <v-btn
          class="redFont"
          elevation="10"
          height="4em"
          width="20em"
          depressed
          raised
          rounded
          to="/auth"
          >Join Now</v-btn
        >
      </v-col>
      <!-- Call To Action height="6em" width="15em"-->
      <v-col cols="12" class="mb-n10">
        <v-btn-toggle>
          <v-btn
            v-for="item in ctaList"
            :key="`${item.label}`"
            text
            rounded
            outlined
            class="pa-6"
            :to="item.url"
          >
            {{ item.label }}
            <v-icon color="red" class="pa-2">{{ item.icon }} </v-icon>
          </v-btn>
        </v-btn-toggle>
      </v-col>
    </v-row>
    <v-spacer class="mt-2"></v-spacer>
    <v-row class="float-none">
      <v-col
        class="mt-16"
        v-for="card in cards"
        :key="card.title"
        :cols="card.flex"
      >
        <v-card>
          <v-img
            :src="require(`../assets/${card.src}`)"
            class="white--text align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="10em"
          >
            <v-card-title v-text="card.title"></v-card-title>
          </v-img>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon>mdi-heart</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon>mdi-bookmark</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon>mdi-share-variant</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: "App",
  data() {
    return {
      ctaList: [
        {
          label: "Job Seeker",
          url: "/profile",
          icon: "mdi-bullhorn",
        },
        {
          label: "Level Up",
          url: "/contents",
          icon: "mdi-bookshelf",
        },
        {
          label: "Create Jobs",
          url: "/jobcreate",
          icon: "mdi-clippy",
        },
        {
          label: "Content Creator",
          url: "/contentcreate",
          icon: "mdi-pen",
        },
      ],
      cards: [
        {
          title: "Pre-fab homes",
          src: "learn-home.jpeg",
          flex: 4,
        },
        {
          title: "Favorite road trips",
          src: "computer-home.jpeg",
          flex: 4,
        },
        {
          title: "Best airlines",
          src: "writing-home.jpeg",
          flex: 4,
        },
      ],
    };
  },
  methods: {
    toggleTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    },
  },
};
</script>
<style>
.redFont {
  color: red !important;
  font-weight: 600;
}
.titleMsg {
  color: white !important;
  font-size: 3.5em;
}
.flex-2 {
  display: flex;
  align-items: stretch;
}
.overlay {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
</style>
