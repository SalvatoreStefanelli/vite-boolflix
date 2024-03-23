<script>

import axios from 'axios';
import { store } from '../store.js';


export default {
    name: 'AppMain',
    data() {
        return {
            store,
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
            const url = `${store.base_api_url}${this.searchText}`
            const url_tv = `${store.base_api_url_tv}${this.searchText}`
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
        this.getMovies(store.base_api_url)
        this.getSeries(store.base_api_url_tv)
    }

}
</script>

<template>
    <main>

        <div class="cards">
            <div class="container">
                <div class="row">
                    <div class="col">
                        <div class="filters">
                            <input type="text" placeholder="Type a movie or a series TV to search" v-model="searchText">
                            <button @click="filterResults">Search</button>
                        </div>

                        <div class="card" v-for="movie in movies.results" :key="movie.id + '_movie'">
                            <img :src="`${store.base_api_url_img}${movie.poster_path}`" alt="">
                            <div class="contain">
                                {{ movie.title }},
                                {{ movie.original_title }},
                                {{ movie.original_language }},
                                {{ movie.vote_average }}
                                {{ movie.overview }}
                            </div>
                        </div>
                        <div class="card" v-for="serie in series.results" :key="serie.id + '_serie'">
                            <img :src="`${store.base_api_url_img}${serie.poster_path}`" alt="">
                            <div class="contain">
                                {{ serie.name }},
                                {{ serie.original_name }},
                                {{ serie.original_language }},
                                {{ serie.vote_average }}
                                {{ serie.overview }}
                            </div>
                        </div>
                    </div>
                </div>
                <!-- <div>
                        {{ getResults }}
                    </div> -->
            </div>
        </div>



    </main>
</template>


<style scoped>
.card .contain {
    display: none;
}


.card img:hover {
    display: none;

    & .contain {
        visibility: hidden;
        background-color: var(--bf-dark);
        color: var(--bf-light);
    }
}
</style>