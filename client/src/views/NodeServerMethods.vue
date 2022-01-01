<template>
  <v-container>
    <v-row class="justify-center"
      ><v-col cols="6" class="text-center">
        <v-btn @click="getAllBooks">get All Books</v-btn>
        <v-btn @click="getAllBookflow">get All Bookflow</v-btn>
      </v-col></v-row
    >
    <v-row class="justify-center">
      <v-col md="6" sm="12">
        <v-card class="pa-6">
          <form @submit.prevent="createBook">
            <v-text-field
              v-model="book.id"
              name="id"
              label="Код книги"
              required
            ></v-text-field>

            <v-text-field
              v-model="book.name"
              name="name"
              label="Название книги"
              required
            ></v-text-field>

            <v-text-field
              v-model="book.author"
              name="author"
              label="Автор"
              required
            ></v-text-field>

            <v-btn class="m-4 primary" type="submit"> Отправить </v-btn>
          </form>
        </v-card>
      </v-col>
    </v-row>
    <v-row class="justify-center">
      <v-col md="6" sm="12">
        <v-card class="pa-6">
          bookflow
          <form @submit.prevent="createBookflow">
            <v-text-field
              v-model="bookflow.BookId"
              name="BookId"
              label="BookId"
              required
            ></v-text-field>

            <v-text-field
              v-model="bookflow.UserId"
              name="UserId"
              label="UserId"
              required
            ></v-text-field>
            <v-autocomplete
              v-model="bookflow.BookStatus"
              clearable
              dense
              required
              hint
              :items="states"
            ></v-autocomplete>

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
    book: {
      id: null,
      name: null,
      author: null,
    },
    bookflow: {
      BookId: null,
      UserId: null,
      BookStatus: null,
      TimeStamp: null,
    },
    states: ["получена", "зарезервирована", "выдана", "вернулась"],
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
        id: this.book.id,
        name: this.book.name,
        author: this.book.author,
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
    getAllBookflow: function () {
      axios
        .get("http://localhost:3000/api/bookflow/get-all")
        .then((response) => console.log(response))
        .catch((error) => {
          // this.errorMessage = error.message;
          console.error("There was an error!", error);
        });
    },
    createBookflow: async function () {
      const bookflow = {
        BookId: this.bookflow.BookId,
        UserId: this.bookflow.UserId,
        BookStatus: this.bookflow.BookStatus,
        TimeStamp: Date.now(),
      };
      await axios
        .post("http://localhost:3000/api/bookflow/create", bookflow)
        .then((response) => console.log(response))
        .catch((error) => {
          console.error("There was an error!", error);
        });
    },
  },
};
</script>

<style>
</style>