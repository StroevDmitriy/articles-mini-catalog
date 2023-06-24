<template>
  <div class="tool-bar">
    <CreateCategoryButton />
    <ArticleSearchLine />
  </div>
</template>

<script>
import CreateCategoryButton from './CreateCategoryButton.vue';
import ArticleSearchLine from './ArticleSearchLine.vue';

export default {
  name: "tool-bar",
  components: {
    CreateCategoryButton,
    ArticleSearchLine
  },
};
</script>
<style scoped>

.toolbar {
  display: flex;
  justify-content: space-between;
}

.toolbar__create-category-button{
  margin-right: 16px;
}
</style>
