<template>
    <h1>Page name</h1>
</template>

<script>
export default {
    name: 'HomePage',
    components: { },
    data() {
        return {
            pokemonArr: [],
            pokemon: null,
            showPokemon: false,
            showAnswer: false,
            message: ''
        }
    },
    methods: {
        async mixPokemonArray() {
            console.log('webo');
        },
    },
    mounted() {
        this.mixPokemonArray()
    }

}
</script>
