import Vue from "vue";
import Vuex from "vuex";
import { v4 as uuidv4 } from "uuid";
import VuexPersistence from "vuex-persist";

Vue.use(Vuex);

const vuexPersist = new VuexPersistence({
  key: "articles-app",
  storage: window.localStorage,
  reducer: (state) => ({
    articles: state.articles,
    categories: state.categories,
  }),
});

export default new Vuex.Store({
  state: {
    articles: [],
    categories: [],
    isNewAndEditCategoryPopupVisible: false,
    isRemoveCategoryPopupVisible: false,
    isEditArticlePopupVisible: false,
    categoryToRemoveID: null,
    categoryToEditID: null,
    articleToEditID: null,
  },
  getters: {
    getArticlesByNameExceptList: (state) => (options) => {
      const articleName = options.value;
      const except = options.except;

      return state.articles.filter((article) => {
        if (!article.title || except.includes(article.id)) return false;
        return article.title.toLowerCase().includes(articleName.toLowerCase());
      });
    },
    getCategoryByID: (state) => (categoryID) => {
      return state.categories.find((category) => category.id === categoryID);
    },
    getArticlesByID: (state) => (articlesID) =>
      state.articles.filter((article) => articlesID.includes(article.id)),
    getChildCategories: (state) => (parentCategoryID) => {
      return state.categories.filter(
        (category) => category.parentCategory === parentCategoryID
      );
    },
    getRestArticles: (state) => (articlesID) => {
      return state.articles
        .filter((article) => !articlesID.includes(article.id))
        .map((article) => {
          return {
            id: article.id,
            title: article.title,
          };
        });
    },
    getRestCategories: (state) => (categoriesID) => {
      return state.categories
        .filter((category) => !categoriesID.includes(category.id))
        .map((category) => {
          return {
            id: category.id,
            title: category.title,
          };
        });
    },
    getArticlesCount: (state, getters) => (categoryID) => {
      const childCategories = getters.getChildCategories(categoryID);
      if (childCategories.length) {
        return childCategories.reduce(
          (acc, category) => acc + getters.getArticlesCount(category.id),
          getters.getCategoryByID(categoryID).articlesID.length
        );
      }
      return getters.getCategoryByID(categoryID).articlesID.length;
    },
    getCategoriesWithArticle: (state) => (articleID) => {
      return state.categories
        .filter((category) => category.articlesID.includes(articleID))
        .map((article) => {
          return {
            id: article.id,
            title: article.title,
          };
        });
    },
  },
  mutations: {
    setArticles: (state, articles) => {
      state.articles = articles;
    },
    toggleArticleLike: (state, payload) => {
      const { id, liked } = payload;
      const article = state.articles.find((el) => el.id === id);

      if ("liked" in article) {
        article.likes += liked ? -1 : 1;
        article.liked = !article.liked;
      } else {
        Vue.set(article, "liked", true);
        Vue.set(article, "likes", 1);
      }
    },
    toggleNewAndEditCategoryPopup: (state) => {
      state.isNewAndEditCategoryPopupVisible =
        !state.isNewAndEditCategoryPopupVisible;
    },
    toggleRemoveCategoryPopup: (state) => {
      state.isRemoveCategoryPopupVisible = !state.isRemoveCategoryPopupVisible;
    },
    toggleEditArticlePopup: (state) => {
      state.isEditArticlePopupVisible = !state.isEditArticlePopupVisible;
    },
    createCategory: (state, newCategory) => {
      state.categories.push({
        id: uuidv4(),
        title: newCategory.name,
        parentCategory: newCategory.parentCategory,
        articlesID: newCategory.articles,
      });
    },
    setCategoryToRemoveID: (state, categoryID) => {
      state.categoryToRemoveID = categoryID;
    },
    removeCategory: function (state, categoryID) {
      const childCategoriesIDToRemove = state.categories.filter(
        (category) => category.parentCategory === categoryID
      );

      if (childCategoriesIDToRemove.length) {
        childCategoriesIDToRemove.forEach((category) => {
          this.commit("removeCategory", category.id);
        });
      }

      state.categories = state.categories.filter(
        (category) => category.id !== categoryID
      );
    },
    updateCategoryToEditID: (state, categoryId) => {
      state.categoryToEditID = categoryId;
    },
    updateCategory: (state, updatedCategory) => {
      const categoryToUpdateIndex = state.categories.findIndex(
        (category) => category.id === updatedCategory.id
      );
      const categoryToUpdate = state.categories[categoryToUpdateIndex];

      categoryToUpdate.title = updatedCategory.title;
      categoryToUpdate.parentCategory = updatedCategory.parentCategory;
      categoryToUpdate.articlesID = updatedCategory.articlesID;
    },
    updateArticleToEditID: (state, articleID) => {
      state.articleToEditID = articleID;
    },
    updateArticle: (state, updatedArticle) => {
      const categoriesID = updatedArticle.categoriesID;
      const articleIDToAdd = updatedArticle.id;

      state.categories.forEach((category) => {
        let articlesIDSet = new Set(category.articlesID);

        if (categoriesID.includes(category.id)) {
          articlesIDSet.add(articleIDToAdd);
        } else {
          articlesIDSet.delete(articleIDToAdd);
        }

        category.articlesID = Array.from(articlesIDSet);
      });
    },
    resetCategories: (state) => {
      state.categories.splice(0);
    },
  },
  actions: {
    toggleEditArticlePopup({ commit }, articleID) {
      commit("updateArticleToEditID", articleID);
      commit("toggleEditArticlePopup");
    },
    updateArticle({ commit }, updatedArticle) {
      commit("updateArticle", updatedArticle);
      commit("toggleEditArticlePopup");
    },
    toggleNewAndEditCategoryPopup({ commit }, categoryID) {
      commit("updateCategoryToEditID", categoryID);
      commit("toggleNewAndEditCategoryPopup");
    },
    openRemoveCategoryPopup({ commit }, categoryID) {
      commit("setCategoryToRemoveID", categoryID);
      commit("toggleRemoveCategoryPopup");
    },
    createCategory({ commit }, newCategory) {
      commit("createCategory", newCategory);
      commit("toggleNewAndEditCategoryPopup");
    },
    updateCategory({ commit }, updatedCategory) {
      commit("updateCategory", updatedCategory);
      commit("toggleNewAndEditCategoryPopup");
    },
    removeCategory({ commit }, categoryID) {
      commit("removeCategory", categoryID);
      commit("toggleRemoveCategoryPopup");
    },

    fetchArticles({ commit }) {
      return new Promise((resolve) => {
        setTimeout(async () => {
          const articles = (await import("../mocks/articlesData")).default;
          commit("setArticles", articles);
          resolve();
        }, 1500);
      });
    },
  },
  plugins: [vuexPersist.plugin],
});
