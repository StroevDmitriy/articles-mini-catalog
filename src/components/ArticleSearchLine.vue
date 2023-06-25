<template>
  <CustomInput
    placeholder="Найти статью"
    class="searh-article"
    ico-name="search"
    type="input"
  />
</template>

<script>
import CustomInput from "./UI/CustomInput.vue";

export default {
  name: "article-search-line",
  components: {
    CustomInput
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
.searh-article {
  position: relative;
  flex-grow: 1;
}
</style>
