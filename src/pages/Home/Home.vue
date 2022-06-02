<template>
    <div>Page content</div>
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
        async testInitPageFunction() {
            // To do stuff
        },
    },
    mounted() {
        this.testInitPageFunction()
    }

}
</script>
