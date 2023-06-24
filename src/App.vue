<template>
  <div class="container">
    <header>
      <ToolBar />
    </header>
    <main>
      <section class="articles-list">
        <strong>Пока нет статей</strong>
        <p>Создайте свою первую  категорию и добавьте в неё статьи.</p>
        <CreateCategoryButton />
      </section>
    </main>
  </div>
</template>

<script>
import ToolBar from './components/ToolBar.vue';
import CreateCategoryButton from './components/CreateCategoryButton.vue';

export default {
  name: 'App',
  components: {
    ToolBar,
    CreateCategoryButton
  }
}
</script>

<style>
.articles-list {
  display: flex;
  margin: 144px auto 0;
  flex-direction: column;
  align-items: center;
  width: 260px;
  font-size: 14px;
  text-align: center;
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
