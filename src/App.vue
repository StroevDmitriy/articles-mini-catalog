<template>
  <div class="container">
    <div class="loader" v-if="loading">
      <img src="./assets/svg/loader.svg" alt="Loader">
    </div>
    <div class="content" v-else>
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
      <EditArticlePopup
        :articleToEditID="articleToEditID"
      />
      <button
        class="reset-state"
        @click="resetState"
      >Reset state</button>
    </div>
  </div>
</template>

<script>
import store from "./store";
import ToolBar from "./components/ToolBar.vue";
import CategoryList from "./components/CategoryList.vue";
import NewAndEditCategoryPopup from "./components/popUps/NewAndEditCategoryPopup.vue";
import RemoveCategoryPopup from "./components/popUps/RemoveCategoryPopup.vue";
import EditArticlePopup from "./components/popUps/EditArticlePopup.vue";

export default {
  name: "App",
  components: {
    ToolBar,
    CategoryList,
    NewAndEditCategoryPopup,
    RemoveCategoryPopup,
    EditArticlePopup
  },
  computed: {
    categoryToEditID() {
      return store.getters.getCategoryToEditID;
    },
    articleToEditID() {
      return store.getters.getArticleToEditID;
    }
  },
  data() {
    return {
      loading: true
    };
  },
  methods: {
    resetState() {
      store.dispatch("resetState");
    }
  },
  created() {
    setTimeout(() => {
      this.loading = false;
    }, 2000);
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

.loader {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: #fff;
  z-index: 100;
}

@keyframes roll {
  from { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loader {
  animation: roll 1s infinite linear;
}

.reset-state {
  position: fixed;
  right: 20px;
  top: 10px;
  padding: 5px;
  border-radius: 3px;
  color: #fff;
  background-color: #0069d9;
  z-index: 500;
}
</style>
