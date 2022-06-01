<template>
  <UserTimeTracker />
  <HomePage />
</template>

<script>
import UserTimeTracker from '@/shared/components/userTimeTracker/UserTimeTracker.vue'
import HomePage from '@/pages/Home/Home.vue'

export default {
  name: 'App',
  components: {
    UserTimeTracker,
    HomePage
  }
}
</script>

<style lang="scss">
</style>
