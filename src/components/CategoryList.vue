<template>
  <section class="category">
    <div class="category__header">
      <h2>Название категории <span>(4)</span></h2>
      <!-- <h3>Название подкатегории <span>(4)</span></h3> -->
      <div class="category__buttons">
        <button
          :class="[
            'category__toggle-collapse',
            { 'category__toggle-collapse_collapsed': isCategoryShown }
          ]"
          @click="toggleCategoryVisibility"
        >
          <img
            src="../assets/svg/chevron-down.svg"
            alt="Show/Hide"
          >
        </button>

        <div class="category__menu-block">
          <button
            class="category__menu-button"
            @click="toggleCategoryMenuVisibility"
            v-click-outside="onClickOutside"
          >
            <img
              src="../assets/svg/menu.svg"
              alt="Menu"
            >
          </button>
          <div class="category__menu"
            :class="[
              'category__menu',
              { 'category__menu_collapsed': !isCategoryMenuShown }
            ]"
          >
            <button
              type="button"
              class="category__button category__edit"
            >Редактировать</button>
            <button
              type="button"
              class="category__button category__remove"
            >Удалить</button>
          </div>
        </div>
      </div>
    </div>
    <section
      :class="[
        'articles',
        { 'articles_hided': !isCategoryShown }
      ]">
      <section
        v-if="articles.length"
        class="articles__list"
      >
        <ArticleCard 
          v-for="article in articles"
          :key="article.id"
          :title="article.title"
          :previewName="article.imgName"
          :description="article.description"
          :likes="article.likes"
        />
      </section>
  
      <section
        v-else
        class="articles__empty-list-message"
      >
        <strong>Пока нет статей</strong>
        <p>Создайте свою первую  категорию и добавьте в неё статьи.</p>
        <CreateCategoryButton />
      </section>
    </section>
  </section>
</template>

<script>
import store from "@/store";
import ArticleCard from "./ArticleCard.vue";
import CreateCategoryButton from "./CreateCategoryButton.vue";

export default {
  name: "articles-list",
  components: {
    ArticleCard,
    CreateCategoryButton,
  },
  data() {
    return {
      isCategoryShown: true,
      isCategoryMenuShown: false,
    };
  },
  computed: {
    articles() {
      return store.getters.articles
    }
  },
  methods: {
    toggleCategoryVisibility() {
      this.isCategoryShown = !this.isCategoryShown
    },
    toggleCategoryMenuVisibility() {
      this.isCategoryMenuShown = !this.isCategoryMenuShown
    },
    onClickOutside() {
      this.isCategoryMenuShown = false
    }
  }
};
</script>

<style scoped>
.articles_hided {
  display: none;
}

.articles__list {
  display: flex;
  margin: 16px auto;
  flex-wrap: wrap;
  align-items: center;
  gap: 24px;
  font-size: 14px;
}

.articles__empty-list-message {
  display: flex;
  margin: 144px auto 0;
  flex-direction: column;
  align-items: center;
  width: 260px;
  font-size: 14px;
  text-align: center;
}

.articles__empty-list-message strong {
  font-size: 16px;
  margin-bottom: 4px;
  line-height: 1.5;
}

.articles__empty-list-message p {
  font-size: 14px;
  line-height: 22px;
  margin-bottom: 16px;
}

.category__header {
  display: flex;
  justify-content: space-between;
}

.category__header span {
  color: #A0A6BF;
  font-size: 16px;
  font-weight: 600;
  line-height: 1.5;
  vertical-align: top;
}

.category__header h3 {
  margin-left: 16px;
}

.category__buttons {
  display: flex;
}

.category__button {
  width: 143px;
  padding: 6px 8px 6px 8px;
  border-radius: 5px;
  color: #4D5163;
  font-size: 14px;
  font-weight: 500;
  line-height: 22px;
  text-align: left;
}

.category__toggle-collapse {
  margin-right: 16px;
}

.category__toggle-collapse img {
  transition: transform .3s;
}

.category__toggle-collapse_collapsed img {
  transform: rotate(180deg);
}

.category__menu-block {
  position: relative;  
}

.category__menu {
  position: absolute;
  display: flex;
  right: 0;
  top: 100%;
  flex-direction: column;
  border-radius: 5px;
  background-color: #fff;
  padding: 8px 9px;
  box-shadow: 0px 10px 40px 0px rgba(0, 0, 0, 0.17);
  gap: 4px;
  transform-origin: 50% 0px;
  transition: transform .2s;
}

.category__menu_collapsed {
  transform: scaleY(0);
}
</style>
