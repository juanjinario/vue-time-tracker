<template>
  <div class="page-header">
    <UserTimeTracker />
    <h1>Page title</h1>
  </div>
  <div class="page-content">
    <HomePage />
  </div>
</template>

<script>
import UserTimeTracker from "@/shared/components/UserTimeTracker/UserTimeTracker.vue";
import HomePage from "@/pages/Home/Home.vue";

export default {
  name: "App",
  components: {
    UserTimeTracker,
    HomePage,
  },
};
</script>

<style lang="scss"></style>
