<template>
  <v-container>
    <v-row class="justify-center"
      ><v-col cols="6" class="text-center">
        <v-btn @click="getAllBooks">get All Books</v-btn>
      </v-col></v-row
    >
    <v-row class="justify-center">
      <v-col md="6" sm="12">
        <v-card class="pa-6">
          <form @submit.prevent="createBook">
            <v-text-field
              v-model="id"
              name="id"
              label="Код книги"
              required
            ></v-text-field>

            <v-text-field
              v-model="name"
              name="name"
              label="Название книги"
              required
            ></v-text-field>

            <v-text-field
              v-model="author"
              name="author"
              label="Автор"
              required
            ></v-text-field>

            <v-btn class="m-4 primary" type="submit"> Отправить </v-btn>
          </form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import HelloWorld from "../components/HelloWorld.vue";
export default {
  name: "NodeServerMethods",
  data: () => ({
    id: null,
    name: null,
    author: null,
  }),
  components: { HelloWorld },
  methods: {
    // send request to get all books
    getAllBooks: function () {
      axios
        .get("http://localhost:3000/api/books/get-all")
        .then((response) => console.log(response))
        .catch((error) => {
          // this.errorMessage = error.message;
          console.error("There was an error!", error);
        });
    },
    createBook: async function () {
      const book = {
        id: this.id,
        name: this.name,
        author: this.author,
      };
      console.log(book);
      //запрос отправляется на адрес https://cubit-2021.appspot.com/api/insert
      await axios
        .post("http://localhost:3000/api/books/create", book)
        .then((response) => console.log(response))
        .catch((error) => {
          this.errorMessage = error.message;
          console.error("There was an error!", error);
        });
    },
  },
};
</script>

<style>
</style>