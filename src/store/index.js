import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    articles: [
      {
        id: 0,
        title: "What da fuckkk",
        imgName: "article-image",
        description: "Some damn long long long and strange fucking description. I need to type something else here to make it longer. Hope, it will be enough to check layout for issues",
        likes: 40,
        liked: false,
        categories: []
      },
      {
        id: 1,
        title: "Another one title",
        imgName: "article-image",
        description: "Description description description description description description description description description description description description description description description description description description description description description description description",
        likes: 500,
        liked: false,
        categories: []
      },
      {
        id: 2,
        title: "Yet, another one title 2",
        imgName: "article-image",
        description: "Идейные соображения высшего порядка, а также сложившаяся структура организации играет важную роль в формировании существенных финансовых и административных условий. Равным образом начало повседневной работы по формированию позиции представляет собой интересный эксперимент проверки направлений прогрессивного развития.",
        likes: 1,
        liked: true,
        categories: []
      },
      {
        id: 4,
      },
      {
        id: 5,
      },
      {
        id: 6,
      },
    ],
    categories: [
      {
        categoryId: 0,
        title: "Название категории1",
        childCategories: [],
        articlesID: [0,1,2,4,5,6],
      },
      {
        categoryId: 1,
        title: "First category",
        childCategories: [],
        articlesID: [],
      },
      {
        categoryId: 3,
        title: "Second category",
        childCategories: [],
        articlesID: [],
      },
      {
        categoryId: 4,
        title: "Second category 2",
        childCategories: [],
        articlesID: [],
      }
    ],
    isNewCategoryPopupVisible: false,
  },
  getters: {
    articles: state => {
      return state.articles;
    },
    isNewCategoryPopupVisible: state => {
      return state.isNewCategoryPopupVisible;
    },
    getAllCategories: state => {
      return state.categories;
    },
    getCategoryByName: state => value => {
      return state.categories.filter(category => {
        if (!category.title) return false;
        return category.title.toLowerCase().includes(value.toLowerCase());
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
    toggleNewCategoryPopup: (state) => {
      state.isNewCategoryPopupVisible = !state.isNewCategoryPopupVisible;
    },
    createCategory: (state, payload) => {
      state.categories.push({
        title: payload.newCategoryName,
        parentCategory: payload.newCategoryParent,
        articlesID: payload.newCategoryArticles
      });
    }
  },
  actions: {
    toggleArticleLike({ commit }, payload) {
      commit("toggleArticleLike", payload);
    },
    toggleNewCategoryPopup({ commit }) {
      commit("toggleNewCategoryPopup");
    },
    createCategory({ commit }, payload) {
      commit("createCategory", payload);
      commit("toggleNewCategoryPopup");
    },
  },
  modules: {},
});
