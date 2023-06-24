<template>
  <div class="container">
    <header>
      <ToolBar />
    </header>
    <main>
      <section class="articles-list">
        <ArticleCard 
          previewName="article-image"
        />
        <ArticleCard 
          previewName="article-image"
        />
        <ArticleCard 
          previewName="article-image"
        />
        <ArticleCard 
          previewName="article-image"
        />
        <ArticleCard 
          previewName="article-image"
        />
        <ArticleCard 
          previewName="article-image"
        />
        <ArticleCard 
          previewName="article-image"
        />
      </section>

      <!-- <section class="articles-list">
        <strong>Пока нет статей</strong>
        <p>Создайте свою первую  категорию и добавьте в неё статьи.</p>
        <CreateCategoryButton />
      </section> -->
    </main>
  </div>
</template>

<script>
import ToolBar from './components/ToolBar.vue';
// import CreateCategoryButton from './components/CreateCategoryButton.vue';
import ArticleCard from './components/ArticleCard.vue'

export default {
  name: 'App',
  components: {
    ToolBar,
    ArticleCard
    // CreateCategoryButton
  }
}
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
  font-size: 14px;
  line-height: 22px;
  margin-bottom: 16px;
}
</style>
