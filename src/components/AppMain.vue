<script>

import axios from 'axios';
import { store } from '../store.js';
import Card from './Card.vue';

export default {
    name: 'AppMain',
    components: {
        Card
    },

    data() {
        return {
            store,
            movies: [],
            series: [],
            searchText: '',
            error: false
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
            const url = `${store.base_api_url}${this.searchText}`
            const url_tv = `${store.base_api_url_tv}${this.searchText}`
            console.log(url);
            console.log(url_tv);

            this.getMovies(url);
            this.getSeries(url_tv);
        },

        roundingResults() {
            const vote = Math.floor(this.movie.vote_average)

            this.roundingResults(vote);
        }
    },

    computed: {
        getResults() {
            return this.movies.results ? this.movies.results.length : 'no results yet'
            return this.series.results ? this.series.results.length : 'no results yet'
        }
    },
    created() {
        this.getMovies(store.base_api_url)
        this.getSeries(store.base_api_url_tv)
    }

}
</script>

<template>
    <main>
        <div class="container">
            <div class="filters">
                <input type="text" placeholder="Type a movie or a series TV to search" v-model="searchText">
                <button @click="filterResults">Search</button>
            </div>
        </div>


        <div class="container">
            <div class="row">
                <div class="card" v-for="movie in movies.results" :key="movie.id + '_movie'">
                    <img :src="`${store.base_api_url_img}${movie.poster_path}`" alt="">
                    <div class="contain">
                        <p><strong>Titolo:</strong> {{ movie.title }}</p>
                        <p><strong>Titolo originale:</strong> {{ movie.original_title }}</p>
                        <p v-if="movie.original_language === 'en'"><strong>Lingua originale:</strong> <img
                                src="../../ public / img / Flag_of_the_United_States_(DoS_ECA_Color_Standard).svg.png"
                                alt=""></p>
                        <p><strong>Voto:</strong> {{ movie.vote_average }}</p>
                        <p><strong>Overview:</strong> {{ movie.overview }}</p>
                    </div>
                </div>

                <div class="card" v-for="serie in series.results" :key="serie.id + '_serie'">
                    <img :src="`${store.base_api_url_img}${serie.poster_path}`" alt="">
                    <div class="contain">
                        <p><strong>Titolo:</strong> {{ serie.name }}</p>
                        <p><strong>Titolo originale:</strong> {{ serie.original_name }}</p>
                        <p><strong>Lingua originale:</strong> {{ serie.original_language }}</p>
                        <p><strong>Voto:</strong> {{ serie.vote_average }}</p>
                        <p><strong>Overview:</strong> {{ serie.overview }}</p>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>


<style scoped></style>