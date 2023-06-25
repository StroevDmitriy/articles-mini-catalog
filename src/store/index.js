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
        categories: []
      },
      {
        id: 1,
        title: "Another one title",
        imgName: "article-image",
        description: "Description description description description description description description description description description description description description description description description description description description description description description description",
        likes: 500,
        categories: []
      },
      {
        id: 2,
        title: "Yet, another one title 2",
        imgName: "article-image",
        description: "Идейные соображения высшего порядка, а также сложившаяся структура организации играет важную роль в формировании существенных финансовых и административных условий. Равным образом начало повседневной работы по формированию позиции представляет собой интересный эксперимент проверки направлений прогрессивного развития.",
        likes: 1,
        categories: []
      },
      {},
      {},
      {},
    ],
    categories: [
      {
        id: 0,
        title: "First category",
        parentCategory: [],
      }
    ],
  },
  getters: {
    articles: state => {
      return state.articles
    }
  },
  mutations: {},
  actions: {},
  modules: {},
});
