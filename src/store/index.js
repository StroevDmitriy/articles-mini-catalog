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
      {
        id: 7,
        title: "Should be seventh article",
        imgName: "article-image",
        description: "7 Description description description description description description description",
        likes: 500,
        liked: false,
        categories: []
      },
      {
        id: 8,
        title: "Title 8",
        imgName: "article-image",
        description: "8 Description description description",
        likes: 500,
        liked: false,
        categories: []
      },
      {
        id: 9,
        title: "Nineth title",
        imgName: "article-image",
        description: "9 Description ",
        likes: 500,
        liked: false,
        categories: []
      },
      {
        id: 10,
        title: "Article number 10",
        imgName: "article-image",
        description: "10 Description description description description description",
        likes: 500,
        liked: false,
        categories: []
      },
      {
        id: 11,
        title: "This is obviously 11th article",
        imgName: "article-image",
        description: "11 Description description ",
        likes: 500,
        liked: false,
        categories: []
      },
    ],
    categories: [
      {
        id: 0,
        title: "Название категории",
        articlesID: [0,1,2,
          4,5,6
        ],
      },
      {
        id: 1,
        title: "First layer child category",
        parentCategory: 0,
        articlesID: [1,7,8],
      },
      // {
      //   id: 2,
      //   title: "Second layer child category",
      //   parentCategory: 1,
      //   articlesID: [1,7,8],
      // },
      // {
      //   id: 22,
      //   title: "Second layer child category 2",
      //   parentCategory: 1,
      //   articlesID: [8,9,10,11],
      // },
      // {
      //   id: 3,
      //   title: "Second category",
      //   articlesID: [8,9],
      // },
      // {
      //   id: 4,
      //   title: "Second category 2",
      //   articlesID: [10,11],
      // }
    ],
    isNewCategoryPopupVisible: false,
  },
  getters: {
    isNewCategoryPopupVisible: state => {
      return state.isNewCategoryPopupVisible;
    },
    getAllCategories: state => {
      return state.categories;
    },
    getCategoryByName: state => categoryName => {
      return state.categories.filter(category => {
        if (!category.title) return false;
        return category.title.toLowerCase().includes(categoryName.toLowerCase());
      });
    },
    getArticlesByID: state => articlesID => {
      return state.articles.filter(article => articlesID.includes(article.id));
    },
    getChildCategories: state => parentCategoryID => {
      return state.categories.filter(category =>  category.parentCategory === parentCategoryID);
    },
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
