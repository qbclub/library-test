<template>
  <v-container>
    <v-row class="justify-center"
      ><v-col cols="2" class="text-center">
        <v-btn @click="getAllBooks">get All Books</v-btn>
        <v-btn @click="clearBooks" class="ma-2 mb-6">clear books</v-btn>
        <v-btn @click="getAllBookflow">get All Bookflow</v-btn>
        <v-btn @click="clearBookflow" class="ma-2 mb-5">clear bookflow</v-btn>
        <v-btn @click="getAllUsers">get All Users</v-btn>
        <v-btn @click="clearUsers" class="ma-2 mb-5">clear Users</v-btn></v-col
      ></v-row
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
              :items="bookflowStates"
            ></v-autocomplete>

            <v-btn class="m-4 primary" type="submit"> Отправить </v-btn>
          </form>
        </v-card>
      </v-col>
    </v-row>
    <v-row class="justify-center">
      <v-col md="6" sm="12">
        <v-card class="pa-6">
          user
          <form @submit.prevent="createUser">
            <v-text-field
              v-model="user.FirstName"
              name="FirstName"
              label="FirstName"
              required
            ></v-text-field>

            <v-text-field
              v-model="user.LastName"
              name="LastName"
              label="LastName"
              required
            ></v-text-field>
            <v-autocomplete
              v-model="user.UserType"
              clearable
              dense
              required
              hint
              :items="UserTypeStates"
            ></v-autocomplete>

            <v-btn class="m-4 primary" type="submit"> Отправить </v-btn>
          </form>
        </v-card>
      </v-col>
    </v-row>
    <v-row class="justify-center">
      <v-col md="6" sm="12">
        <v-card class="pa-6">
          get book by id
          <form @submit.prevent="getBookById">
            <v-text-field
              v-model="bookIdToFind"
              name="id"
              label="id"
              required
            ></v-text-field>

            <v-btn class="m-4 primary" type="submit"> отправить </v-btn>
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
    bookIdToFind: null,
    bookflow: {
      BookId: null,
      UserId: null,
      BookStatus: null,
      TimeStamp: null,
    },
    bookflowStates: ["получена", "зарезервирована", "выдана", "вернулась"],
    // Для UserType создать классы
    user: {
      FirstName: null,
      LastName: null,
      UserType: null,
    },
    UserTypeStates: ["админ", "читатель", "гость"],
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
    getBookById: function () {
      let id = this.bookIdToFind;
      axios
        .get(`http://localhost:3000/api/books?id=${id}`)
        .then((response) => console.log(response))
        .catch((error) => {
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
    clearBooks: function () {
      let con = confirm("Удалить все книги?");
      if (con) {
        axios
          .get("http://localhost:3000/api/books/clear")
          .then((response) => console.log(response))
          .catch((error) => {
            console.error("There was an error!", error);
          });
      }
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
    clearBookflow: function () {
      let con = confirm("Удалить весь bookflow?");
      if (con) {
        axios
          .get("http://localhost:3000/api/bookflow/clear")
          .then((response) => console.log(response))
          .catch((error) => {
            console.error("There was an error!", error);
          });
      }
    },
    getAllUsers: function () {
      axios
        .get("http://localhost:3000/api/users/get-all")
        .then((response) => console.log(response))
        .catch((error) => {
          console.error("There was an error!", error);
        });
    },
    createUser: async function () {
      await axios
        .post("http://localhost:3000/api/users/create", this.user)
        .then((response) => console.log(response))
        .catch((error) => {
          console.error("There was an error!", error);
        });
    },
    clearUsers: function () {
      let con = confirm("Удалить всех пользователей?");
      if (con) {
        axios
          .get("http://localhost:3000/api/users/clear")
          .then((response) => console.log(response))
          .catch((error) => {
            console.error("There was an error!", error);
          });
      }
    },
  },
};
</script>

<style>
</style>