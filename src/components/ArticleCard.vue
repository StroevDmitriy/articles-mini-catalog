<template>
  <article class="article-card">
    <div class="article-card__interaction-row">
      <button
        type="button"
        class="article-card__like-button"
        @click="toggleLike($vnode.key, liked)"
      >
        <img
          src="../assets/svg/like_default.svg"
          alt="Like"
          v-if="!liked"
        >
        <img
          src="../assets/svg/like_active.svg"
          alt="Like"
          v-else
        >
        {{ likes }}
      </button>
      <button
        type="button"
        class="article-card__edit-button"
        @click="openEditArticlePopup"
      >
        <img
          src="../assets/svg/pen.svg"
          alt="Like"
        >
      </button>
    </div>
    <div class="article-card__preview-container">
      <img
        :src="require(`@/assets/images/${previewName}.png`)" 
        alt="Article preview"
      />
    </div>
    <h4 class="article-card__title">{{ title }}</h4>
    <p class="article-card__description">{{ description }}</p>
  </article>
</template>

<script>
export default {
  name: "ArticleCard",
  props: {
    previewName: {
      type: String,
      default: "article-image",
    },
    title : {
      type: String,
      default: "Нет заголовка",
    },
    description: {
      type: String,
      default: "Нет описания",
    },
    likes: {
      type: Number,
      default: 0,
    },
    liked: {
      type: Boolean,
      default: false,
    }
  },
  methods: {
    toggleLike(id, liked) {
      this.$store.commit("toggleArticleLike", { id, liked });
    },
    openEditArticlePopup() {
      this.$store.dispatch("toggleEditArticlePopup", this.$vnode.key);
    }
  }
};

</script>
<style scoped>
.article-card {
  width: 23.5%;
  min-width: 280px;
  box-sizing: border-box;
  height: 295px;
  border: 1px solid #BFC3D5;
  border-radius: 10px;
  padding: 15px;
}

.article-card__interaction-row {
  display: flex;
  margin-bottom: 8px;
  justify-content: space-between;
}

.article-card__like-button {
  align-items: center;
  color: #A0A6BF;
  font-size: 12px;
}

.article-card__edit-button {
  border: none
}

.article-card__preview-container {
  width: 100%;
  height: 80px;
  margin-bottom: 8px;
}

.article-card__preview-container img {
  object-fit: cover;
  height: 100%;
  width: 100%;
}

.article-card__title {
  margin-bottom: 8px;
}

.article-card__description {
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  color: #6A6E7E;
}
</style>
