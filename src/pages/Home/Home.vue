<template>
    <div>Page content</div>
</template>

<script>
export default {
    name: 'HomePage',
    components: { },
    data() {
        return {
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
