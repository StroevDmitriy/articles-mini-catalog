<template>
  <section
    :class="[
      'category',
      {
        'category_child': !isParentCategory
      }
    ]"
  >
    <div class="category__header">
      <h2 v-if="isParentCategory">{{ title }} <span>({{ articlesCount }})</span></h2>
      <h3 v-else>{{ title }} <span>({{ articlesCount }})</span></h3>
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
              @click="openCategoryPopup"
            >Редактировать</button>
            <button
              type="button"
              class="category__button category__remove"
              @click="openRemoveCategoryPopup"
            >Удалить</button>
          </div>
        </div>
      </div>
    </div>
    <section
      :class="[
        'category__content',
        { 'category__content_hided': !isCategoryShown }
      ]"
      ref="categoryContent"
      :style="{ 'max-height': isCategoryShown ? contentMaxHeight + 'px' : 0}"
    >
      <section class="category__articles-list">
        <ArticleCard 
          v-for="article in categoryArticles"
          :key="article.id"
          :title="article.title"
          :previewName="article.imgName"
          :description="article.description"
          :likes="article.likes"
          :liked="article.liked"
        />
      </section>
      <div v-if="childCategoriesData.length">
        <CategoryContent
          v-for="category in childCategoriesData"
          :key="category.id"
          :id="category.id"
          :isParentCategory="false"
          :title="category.title"
          :articlesID="category.articlesID"
          :childCategoriesID="category.childCategoriesID"
        />
      </div>
    </section>

    <section v-if="childCategoriesID.length && isParentCategory">
    </section>
  </section>
</template>

<script>
import store from "@/store";
import ArticleCard from "./ArticleCard.vue";

export default {
  name: "CategoryContent",
  components: {
    ArticleCard,
  },
  props: {
    id: {
      type: String,
    },
    title: {
      type: String,
      default: "",
    },
    articlesID: {
      type: Array,
      default: () => [],
    },
    childCategoriesID: {
      type: Array,
      default: () => [],
    },
    isParentCategory: {
      type: Boolean,
      default: true,
    },
    hasParent: {
      type: Boolean,
      default: true,
    }
  },
  data() {
    return {
      isCategoryShown: true,
      isCategoryMenuShown: false,
      contentMaxHeight: null,
    };
  },
  computed: {
    categoryArticles() {
      return store.getters.getArticlesByID(this.articlesID);
    },
    childCategoriesData() {
      const childCategories = store.getters.getChildCategories(this.id);
      return childCategories.length ? childCategories : [];
    },
    articlesCount() {
      return store.getters.getArticlesCount(this.id);
    }
  },
  methods: {
    toggleCategoryVisibility() {
      this.isCategoryShown = !this.isCategoryShown;
    },
    toggleCategoryMenuVisibility() {
      this.isCategoryMenuShown = !this.isCategoryMenuShown;
    },
    onClickOutside() {
      this.isCategoryMenuShown = false;
    },
    openRemoveCategoryPopup() {
      store.dispatch("openRemoveCategoryPopup", this.id);
    },
    openCategoryPopup() {
      store.dispatch("toggleCategoryPopup", this.id);
    }
  },
  mounted() {
    this.contentMaxHeight = this.$refs.categoryContent.clientHeight;

    if (this.hasParent) {
      this.isCategoryShown = false;
    }
  }
};

</script>
<style scoped>
.category {
  margin-bottom: 16px;
}

.category_child {
  margin-left: 16px;
}

.category__content {
  transform-origin: 50% 0;
  transition: max-height .5s;
  overflow: hidden;
}

.category__articles-list {
  display: flex;
  margin: 16px auto;
  flex-wrap: wrap;
  align-items: center;
  gap: 24px;
  font-size: 14px;
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
  transform-origin: 50% 0;
  transition: transform .2s;
}

.category__menu_collapsed {
  transform: scaleY(0);
}
</style>
