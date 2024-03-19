import { reactive } from 'vue'

export const store = reactive({
    base_api_url: 'https://api.themoviedb.org/3/search/movie?api_key=32b11fa0e734b79e146cf88e806df1e4&language=it-IT&query=',
    base_api_url_tv: 'https://api.themoviedb.org/3/search/tv?api_key=32b11fa0e734b79e146cf88e806df1e4&language=it-IT&query='
});