<template>
  <div>
    <div v-if="categoriesData.length">
      <section
        v-for="category in categoriesData"
        :key="category.id"
      >
        <CategoryContent
          v-if="category.parentCategory == null"
          :hasParent="false"
          :id="category.id"
          :title="category.title"
          :articlesID="category.articlesID"
        />
      </section>
    </div>
    <section
      class="empty-list-message"
      v-else
    >
      <strong>Пока нет статей</strong>
      <p>Создайте свою первую  категорию и добавьте в неё статьи.</p>
      <CreateCategoryButton />
    </section>
  </div>
</template>

<script>
import CategoryContent from "./CategoryContent.vue";
import CreateCategoryButton from "./CreateCategoryButton.vue";

export default {
  name: "ArticlesList",
  components: {
    CreateCategoryButton,
    CategoryContent,
  },
  data() {
    return {
      categoriesData: [],
    };
  },
  computed: {
  },
  methods: {
  },
  created() {
    this.categoriesData = this.$store.getters.getAllCategories;
  },
};
</script>

<style scoped>
.empty-list-message {
  display: flex;
  margin: 144px auto 0;
  flex-direction: column;
  align-items: center;
  width: 260px;
  font-size: 14px;
  text-align: center;
}

.empty-list-message strong {
  font-size: 16px;
  margin-bottom: 4px;
  line-height: 1.5;
}

.empty-list-message p {
  font-size: 14px;
  line-height: 22px;
  margin-bottom: 16px;
}
</style>
