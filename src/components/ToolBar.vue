<template>
  <div class="tool-bar">
    <CreateCategoryButton />
  </div>
</template>

<script>
import CreateCategoryButton from './CreateCategoryButton.vue';

export default {
  name: "tool-bar",
  components: {
    CreateCategoryButton,
  },
};
</script>
<style scoped>

.tool-bar {
  display: flex;
  justify-content: space-between;
}

</style>
