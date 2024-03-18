<script>

import axios from 'axios';

export default {
    name: 'AppMain',
    data() {
        return {
            base_api_url: 'https://api.themoviedb.org/3/search/movie?api_key=32b11fa0e734b79e146cf88e806df1e4&language=it-IT&query=',
            movies: [],
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

        filterResults() {
            const url = `${this.base_api_url}${this.searchText}`
            console.log(url);

            this.getMovies(url);
        }
    },

    computed: {
        getResults() {
            return this.movies.results ? this.movies.results.length : 'no results yet'
        }
    },
    created() {
        this.getMovies(this.base_api_url)
    }
}
</script>

<template>
    <main>

        <div class="filters">
            <input type="text" placeholder="Type a movie to search" v-model="searchText">
            <button @click="filterResults">Search</button>
        </div>

        <div v-for="movie in movies.results" :key="movie.id + '_movie'">
            {{ movie.title }},
            {{ movie.original_title }},
            {{ movie.original_language }},
            {{ movie.vote_average }}
        </div>


        <div>
            {{ getResults }}
        </div>


    </main>
</template>


<style scoped></style>