<template>
  <div class="container">
    <header>
      <ToolBar />
    </header>
    <main>
      <CategoryList />
    </main>
    <NewCategoryPopup />
  </div>
</template>

<script>
import ToolBar from "./components/ToolBar.vue";
import CategoryList from "./components/CategoryList.vue";
import NewCategoryPopup from "./components/popUps/NewCategoryPopup.vue";

export default {
  name: "App",
  components: {
    ToolBar,
    CategoryList,
    NewCategoryPopup,
  }
}
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
  font-size: 14px;
  line-height: 22px;
  margin-bottom: 16px;
}
</style>
