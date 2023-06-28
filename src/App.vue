<template>
  <div class="container">
    <header>
      <ToolBar />
    </header>
    <main>
      <CategoryList />
    </main>
    <NewAndEditCategoryPopup
      :categoryToEditID="categoryToEditID"
    />
    <RemoveCategoryPopup />
  </div>
</template>

<script>
import store from "./store";
import ToolBar from "./components/ToolBar.vue";
import CategoryList from "./components/CategoryList.vue";
import NewAndEditCategoryPopup from "./components/popUps/NewAndEditCategoryPopup.vue";
import RemoveCategoryPopup from "./components/popUps/RemoveCategoryPopup.vue";

export default {
  name: "App",
  components: {
    ToolBar,
    CategoryList,
    NewAndEditCategoryPopup,
    RemoveCategoryPopup
  },
  computed: {
    categoryToEditID() {
      return store.getters.getCategoryToEditID;
    }
  }
};
</script>

<style>
.articles-list {
  display: flex;
  margin: 144px auto 0;
  flex-wrap: wrap;
  align-items: center;
  gap: 24px;
  font-size: 14px;
}

.articles-list strong {
  font-size: 16px;
  margin-bottom: 4px;
  line-height: 1.5;
}

.articles-list p {
  margin-bottom: 16px;
}
</style>
