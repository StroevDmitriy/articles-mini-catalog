import Vue from "vue";
import Vuex from "vuex";
import { v4 as uuidv4 } from "uuid";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    articles: [
      {
        id: "0",
        title: "New title",
        imgName: "article-image",
        description: "Description description description description description description description description description description description description description description description description description description description description description description description",
        likes: 400,
        liked: false,
        categories: []
      },
      {
        id: "1",
        title: "New title 1",
        imgName: "article-image",
        description: "Description description description description description description description description description description description description description description description description description description description description description description description",
        likes: 10,
        liked: false,
        categories: []
      },
      {
        id: "2",
        title: "New title 2",
        imgName: "article-image",
        description: "Идейные соображения высшего порядка, а также сложившаяся структура организации играет важную роль в формировании существенных финансовых и административных условий. Равным образом начало повседневной работы по формированию позиции представляет собой интересный эксперимент проверки направлений прогрессивного развития.",
        likes: 15,
        liked: true,
        categories: []
      },
      {
        id: "3",
        title: "New title 3",
        imgName: "article-image",
        description: "Custom dscription",
        likes: 30,
        liked: true,
        categories: []
      },
      {
        id: "4",
        title: "New title 4",
        imgName: "article-image",
        description: "2 Custom dscription Custom dscription Custom dscription Custom dscription Custom dscription Custom dscription",
        likes: 4,
        liked: false,
        categories: []
      },
      {
        id: "5",
        title: "New title 5",
        imgName: "article-image",
        description: "3 Custom dscription Custom dscription Custom dscription Custom dscription Custom dscription Custom dscription",
        likes: 355,
        liked: false,
        categories: []
      },
      {
        id: "6",
        title: "New title 6",
        imgName: "article-image",
        description: " 4 Custom dscription Custom dscription Custom dscription Custom dscription Custom dscription Custom dscription",
        likes: 35,
        liked: false,
        categories: []
      },
      {
        id: "7",
        title: "New title 7",
        imgName: "article-image",
        description: "7 Description description description description description description description",
        likes: 70,
        liked: false,
        categories: []
      },
      {
        id: "8",
        title: "Title 8",
        imgName: "article-image",
        description: "8 Description description description",
        likes: 80,
        liked: false,
        categories: []
      },
      {
        id: "9",
        title: "Title 9",
        imgName: "article-image",
        description: "9 Description ",
        likes: 90,
        liked: false,
        categories: []
      },
      {
        id: "10",
        title: "Title 10",
        imgName: "article-image",
        description: "10 Description description description description description",
        likes: 100,
        categories: []
      },
      {
        id: "11",
        title: "Title 11",
        imgName: "article-image",
        description: "11 Description description ",
        likes: 110,
        liked: false,
        categories: []
      },
    ],
    categories: [
      {
        id: "0",
        title: "Название категории",
        parentCategory: null,
        articlesID: ["0","1","2","4","5","6"],
      },
      {
        id: "1",
        title: "First layer child category 1",
        parentCategory: "0",
        articlesID: ["1","7","8"],
      },
      {
        id: "21",
        title: "Second layer child category 1",
        parentCategory: "1",
        articlesID: ["1","7","8"],
      },
      {
        id: "22",
        title: "Second layer child category 2",
        parentCategory: "1",
        articlesID: ["8","9","10","11"],
      },
      {
        id: "3",
        title: "Category 3",
        parentCategory: null,
        articlesID: ["8","9"],
      },
      {
        id: "4",
        title: "Category 4",
        parentCategory: null,
        articlesID: ["10","11"],
      }
    ],
    isCategoryPopupVisible: false,
    isRemoveCategoryPopupVisible: false,
    categoryIDToRemove: null,
    categoryIDToEdit: null,
  },
  getters: {
    isCategoryPopupVisible: state => state.isCategoryPopupVisible,
    isRemoveCategoryPopupVisible: state => state.isRemoveCategoryPopupVisible,
    getAllCategories: state => state.categories,
    getAllArticles: state => state.articles,
    getCategoryByName: state => categoryName => {
      return state.categories.filter(category => {
        if (!category.title) return false;
        return category.title.toLowerCase().includes(categoryName.toLowerCase());
      });
    },
    getCategoryByID: state => categoryID => {
      return state.categories.find(category => category.id === categoryID);
    },
    getArticlesByID: state => articlesID => state.articles.filter(article => articlesID.includes(article.id)),
    getChildCategories: state => parentCategoryID => {
      return state.categories.filter(category => category.parentCategory === parentCategoryID);
    },
    getRestArticles: state => articlesID => {
      return state.articles.
          filter(article => !articlesID.includes(article.id))
          .map(article => {
            return {
              id: article.id,
              title: article.title,
            };
          });
    },
    getCategoryToRemoveID: state => state.categoryIDToRemove,
    getCategoryToEditID: state => state.categoryIDToEdit,
  },
  mutations: {
    toggleArticleLike: (state, payload) => {
      const { id, liked } = payload;
      const article = state.articles.find(el => el.id === id);
      
      if ("liked" in article && liked) {
        article.likes--;
      } else if ("liked" in article && !liked) {
        article.likes++;
      } else {
        Vue.set(article, "likes", 1);
      }

      if ("liked" in article) {
        article.liked = !article.liked;
      } else {
        Vue.set(article, "liked", true);
      }
    },
    toggleCategoryPopup: state => {
      state.isCategoryPopupVisible = !state.isCategoryPopupVisible;
    },
    toggleRemoveCategoryPopup: state => {
      state.isRemoveCategoryPopupVisible = !state.isRemoveCategoryPopupVisible;
    },
    createCategory: (state, newCategory) => {
      state.categories.push({
        id: uuidv4(),
        title: newCategory.name,
        parentCategory: newCategory.parentCategory,
        articlesID: newCategory.articles
      });
    },
    setCategoryIDToRemove: (state, categoryID) => {
      state.categoryIDToRemove = categoryID;
    },
    removeCategory: (state, categoryId) => {
      const categoryToRemoveIndex = state.categories.findIndex(category => category.id === categoryId);
      state.categories.splice(categoryToRemoveIndex, 1);
    },
    updateCategory: (state, updatedCategory) => {
      const categoryToUpdateIndex = state.categories.findIndex(category => category.id === updatedCategory.id);
      const categoryToUpdate = state.categories[categoryToUpdateIndex];

      categoryToUpdate.title = updatedCategory.title;
      categoryToUpdate.parentCategory = updatedCategory.parentCategory;
      categoryToUpdate.articlesID = updatedCategory.articlesID;
    },
    updateCategoryIDToEdit: (state, categoryId) => {
      state.categoryIDToEdit = categoryId;
    },
  },
  actions: {
    toggleArticleLike({ commit }, payload) {
      commit("toggleArticleLike", payload);
    },
    toggleCategoryPopup({ commit }, categoryID) {
      commit("updateCategoryIDToEdit", categoryID);
      commit("toggleCategoryPopup");
    },
    createCategory({ commit }, newCategory) {
      commit("createCategory", newCategory);
      commit("toggleCategoryPopup");
    },
    updateCategory({ commit }, updatedCategory) {
      commit("updateCategory", updatedCategory);
      commit("toggleCategoryPopup");
    },
    openRemoveCategoryPopup({ commit }, categoryID) {
      commit("setCategoryIDToRemove", categoryID);
      commit("toggleRemoveCategoryPopup");
    },
    closeRemoveCategoryPopup({ commit }) {
      commit("toggleRemoveCategoryPopup");
    },
    clickRemoveCategory({ dispatch, commit }, categoryID) {
      dispatch("removeCategory", categoryID);
      commit("toggleRemoveCategoryPopup");
    },
    removeCategory({ dispatch, commit, state }, categoryID) {
      const childCategoriesIDToRemove = state.categories.filter(category => category.parentCategory === categoryID);
      if (childCategoriesIDToRemove.length) {
        childCategoriesIDToRemove.forEach(category => {
          dispatch("removeCategory", category.id);
        });
      }
      commit("removeCategory", categoryID);
    }
  },
  modules: {},
});
