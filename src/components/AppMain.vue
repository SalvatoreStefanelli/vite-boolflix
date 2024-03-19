<script>

import axios from 'axios';
import { store } from '../store.js';


export default {
    name: 'AppMain',
    data() {
        return {
            store,
            base_api_url: 'https://api.themoviedb.org/3/search/movie?api_key=32b11fa0e734b79e146cf88e806df1e4&language=it-IT&query=',
            base_api_url_tv: 'https://api.themoviedb.org/3/search/tv?api_key=32b11fa0e734b79e146cf88e806df1e4&language=it-IT&query=',
            movies: [],
            series: [],
            error: false,
            searchText: ''
        }
    },

    methods: {
        getMovies(url) {
            // console.log(this.base_api_url);
            axios
                .get(url)
                .then((response) => {
                    console.log(response.data);
                    console.log(response.data.results);
                    // console.log(this);
                    this.movies = response.data;
                })
                .catch((error) => {
                    console.error(error);
                    this.error = error.message;
                })
        },

        getSeries(url_tv) {
            axios
                .get(url_tv)
                .then((response) => {
                    console.log(response.data);
                    this.series = response.data;
                })
                .catch((error) => {
                    console.error(error);
                    this.error = error.message;
                })
        },

        filterResults() {
            const url = `${this.base_api_url}${this.searchText}`
            const url_tv = `${this.base_api_url_tv}${this.searchText}`
            console.log(url);
            console.log(url_tv);

            this.getMovies(url);
            this.getSeries(url_tv);
        }
    },

    computed: {
        getResults() {
            return this.movies.results ? this.movies.results.length : 'no results yet'
            return this.series.results ? this.series.results.length : 'no results yet'
        }
    },
    created() {
        this.getMovies(this.base_api_url)
        this.getSeries(this.base_api_url_tv)
    }
}
</script>

<template>
    <main>

        <div class="filters">
            <input type="text" placeholder="Type a movie or a series TV to search" v-model="searchText">
            <button @click="filterResults">Search</button>
        </div>

        <div v-for="movie in movies.results" :key="movie.id + '_movie'">
            {{ movie.title }},
            {{ movie.original_title }},
            {{ movie.original_language }},
            {{ movie.vote_average }}
        </div>

        <div v-for="serie in series.results" :key="serie.id + '_serie'">
            {{ serie.name }},
            {{ serie.original_name }},
            {{ serie.original_language }},
            {{ serie.vote_average }}
        </div>




        <div>
            {{ getResults }}
        </div>


    </main>
</template>


<style scoped></style>