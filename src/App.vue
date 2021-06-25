<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center title">SQL autocomplete comparison</div>
      <v-spacer></v-spacer>

      <!-- <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn> -->
    </v-app-bar>

    <v-main>
      <AutocompleteComparison />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue"
import AutocompleteComparison from "./components/AutocompleteComparison.vue"
import Component from "vue-class-component"
@Component({
  components: { AutocompleteComparison }
})
export default class App extends Vue {}
</script>
