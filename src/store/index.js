import Vue from "vue";
import Vuex from "vuex";
import { v4 as uuidv4 } from "uuid";
import VuexPersistence from "vuex-persist";

Vue.use(Vuex);

const vuexPersist = new VuexPersistence({
  key: "articles-app",
  storage: window.localStorage,
  reducer: (state) => (
    {
      articles: state.articles,
      categories: state.categories,
    }
  )
});

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
    categories: [],
    isNewAndEditCategoryPopupVisible: false,
    isRemoveCategoryPopupVisible: false,
    isEditArticlePopupVisible: false,
    categoryToRemoveID: null,
    categoryToEditID: null,
    articleToEditID: null,
  },
  getters: {
    getArticlesByNameExceptList: state => options => {
      const articleName = options.value;
      const except = options.except;

      return state.articles.filter(article => {
        if (
          !article.title ||
          except.includes(article.id)
        ) return false;
        return article.title.toLowerCase().includes(articleName.toLowerCase());
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
    getRestCategories: state => categoriesID => {
      return state.categories.
          filter(category => !categoriesID.includes(category.id))
          .map(category => {
            return {
              id: category.id,
              title: category.title,
            };
          });
    },
    getArticlesCount: (state, getters) => categoryID => {
      const childCategories = getters.getChildCategories(categoryID);
      if (childCategories.length) {
        return childCategories.reduce(
          (acc, category) =>  acc + getters.getArticlesCount(category.id),
          getters.getCategoryByID(categoryID).articlesID.length
        );
      }
      return getters.getCategoryByID(categoryID).articlesID.length;
    },
    getCategoriesWithArticle: state => articleID => {
      return state.categories
        .filter(category => category.articlesID.includes(articleID))
        .map(article => {
          return {
            id: article.id,
            title: article.title,
          };
        });
    }
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
    toggleNewAndEditCategoryPopup: state => {
      state.isNewAndEditCategoryPopupVisible = !state.isNewAndEditCategoryPopupVisible;
    },
    toggleRemoveCategoryPopup: state => {
      state.isRemoveCategoryPopupVisible = !state.isRemoveCategoryPopupVisible;
    },
    toggleEditArticlePopup: state => {
      state.isEditArticlePopupVisible = !state.isEditArticlePopupVisible;
    },
    createCategory: (state, newCategory) => {
      state.categories.push({
        id: uuidv4(),
        title: newCategory.name,
        parentCategory: newCategory.parentCategory,
        articlesID: newCategory.articles
      });
    },
    setCategoryToRemoveID: (state, categoryID) => {
      state.categoryIDToRemove = categoryID;
    },
    removeCategory: (state, categoryID) => {
      const childCategoriesIDToRemove = state.categories.filter(category => category.parentCategory === categoryID);
      
      if (childCategoriesIDToRemove.length) {
        childCategoriesIDToRemove.forEach(category => {
          this.commit("removeCategory", category.id);
        });
      }

      const categoryToRemoveIndex = state.categories.findIndex(category => category.id === categoryID);
      state.categories.splice(categoryToRemoveIndex, 1);
    },
    updateCategoryToEditID: (state, categoryId) => {
      state.categoryToEditID = categoryId;
    },
    updateCategory: (state, updatedCategory) => {
      const categoryToUpdateIndex = state.categories.findIndex(category => category.id === updatedCategory.id);
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

      state.categories
        .forEach(category => {
          let articlesIDSet = new Set (category.articlesID);
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
    }
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
  },
  plugins: [vuexPersist.plugin]
});