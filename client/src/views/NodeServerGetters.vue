<template>
  <v-container>
    <v-row class="justify-center"
      ><v-col cols="6" class="text-center">
        <v-btn @click="getAllBooks">get All Books</v-btn>
      </v-col></v-row
    >
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  methods: {
    // send request to get all books
    getAllBooks: function () {
      axios
        .get("http://localhost:3000/books/get-all")
        .then((response) => console.log(response))
        .catch((error) => {
          // this.errorMessage = error.message;
          console.error("There was an error!", error);
        });
    },
  },
};
</script>

<style>
</style>