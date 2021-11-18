<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-btn v-on:click="getData">Запрос</v-btn>
      </v-col>
      <v-col cols="12">
        <h1>{{ info }}</h1>
      </v-col>
    </v-row>
    <v-row class="text-center">
      <v-col cols="12">
        <v-btn v-on:click="getData1">Дай число</v-btn>
      </v-col>
      <v-col cols="12">
        <h1>{{ intData }}</h1>
      </v-col>
    </v-row>
    <v-row class="text-center">
      <v-col cols="12">
        <v-btn v-on:click="getData2">Числа из справочника</v-btn>
      </v-col>
      <v-col cols="12" class="justify-center d-flex">
        <v-chip-group active-class="primary--text" column>
          <v-chip v-for="int in intFromObj" :key="int">
            {{ int }}
          </v-chip>
        </v-chip-group>
      </v-col>
    </v-row>
    <v-row class="text-center">
      <v-col cols="12">
        <v-btn v-on:click="getData3">Книга</v-btn>
      </v-col>
      <v-col cols="12">
        <div v-for="item in book" :key="item">{{ item }}</div>
        <div v-if="book"></div>
      </v-col>
    </v-row>
    <v-row class="text-center">
      <v-col cols="12">
        <v-btn v-on:click="getData4">Библиотека</v-btn>
      </v-col>
      <v-col cols="12" class="d-flex justify-sm-space-around">
        <v-card
          elevation="6"
          v-for="(oneBook, index) in library"
          :key="index"
          class="pa-10"
        >
          <div elevation="6" v-for="item in oneBook" :key="item">
            {{ item }}
          </div>
         
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
import axios from "axios";
export default {
  data() {
    return {
      info: null,
      intData: null,
      intFromObj: null,
      book: null,
      library: null,
    };
  },
  methods: {
    getData: async function () {
      axios.get("http://localhost:8080/api/get").then((res) => {
        this.info = res.data;
      });
    },
    getData1: async function () {
      axios.get("http://localhost:8080/api/get1").then((res) => {
        this.intData = res.data;
      });
    },
    getData2: async function () {
      axios.get("http://localhost:8080/api/get2").then((res) => {
        this.intFromObj = res.data;
      });
    },
    getData3: async function () {
      axios.get("http://localhost:8080/api/get3").then((res) => {
        this.book = JSON.parse(JSON.stringify(res.data));
      });
    },
    getData4: async function () {
      axios
        .get("http://localhost:8080/api/get4")
        .then((res) => {
          this.library = JSON.parse(JSON.stringify(res.data));
        })
        .then(() => {
          this.library.forEach((element) => {
            element.PublishedAt = new Date(Date.parse(element.PublishedAt)).toLocaleDateString()
          });
        });
    },
  },
};
</script>

<style>
</style>
