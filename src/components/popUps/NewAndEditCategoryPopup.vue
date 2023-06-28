<template>
  <div
    :class="[
      'popup-container',
      { 'popup-container__shown': isCategoryPopupVisible }
    ]"
  >
    <div
      class="popup-container__overlay"
      @click="closePopup"
    ></div>
    <section
      class="popup-container__popup common-popup"
    >
      <form action="">
        <h3 v-if="categoryToEditID">Редактирование категории</h3>
        <h3 v-else>Новая категория</h3>
        <fieldset class="common-popup__fields">
          <CustomInput
            class="common-popup__input"
            type="input"
            placeholder="Название"
            :value="categoryName"
            @change="onInputChanged($event.value, 'categoryName')"
          />
          <div class="common-popup__field-container">
            <div class="common-popup__input-container">
              <CustomInput
                class="common-popup__input select"
                fieldName="parentCategoryOptions"
                type="select"
                placeholder="Родительская категория (необязательно)"
                :value="categoryParentTitle"
                noType
                @input="onInputInputed"
                @click="openParentCategoryOptions($event)"
                @blur="hideOptions('parentCategoryOptions')"
              />
              <div
                class="select__options"
                v-show="parentCategoryOptions.isVisible"
              >
                <button
                  class="select__option"
                  type="button"
                  @mousedown="chooseParentCategoryOption('')"
                ><span>(Нет родительской категории)</span></button>
                <button
                  v-for="option in parentCategoryOptions.value"
                  class="select__option"
                  type="button"
                  :key="option.categoryId"
                  @mousedown="chooseParentCategoryOption(option)"
                >
                  {{ option.title }}
                </button>
              </div>
            </div>
          </div>
          <div class="common-popup__field-container">
            <div class="common-popup__input-container">
              <CustomInput
                type="select"
                placeholder="Вложенные статьи"
                class="common-popup__input select"
                fieldName="innerArticlesOptions"
                noType
                @click="openInnerArticlesOptions($event)"
                @blur="hideOptions('innerArticlesOptions')"
              />
              <div
                class="select__options"
                v-show="innerArticlesOptions.isVisible"
              >
                <button
                  v-for="option in innerArticlesOptions.value"
                  :key="option.id"
                  class="select__option"
                  type="button"
                  @mousedown="chooseInnerArticlesOption({
                    id: option.id,
                    title: option.title
                  })"
                >
                  {{ option.title }}
                </button>
              </div>
            </div>
            <div class="select__selected-options">
              <div
                v-for="article in innerArticlesSelected"
                :key="article.id"
                class="select__selected-option"
              >
                <button
                  class="select__remove-option-button"
                  type="button"
                  @click="removeSelectedArticle(article.id)"
                ></button>
                {{ article.title }}
              </div>
            </div>
          </div>

        </fieldset>
        <fieldset class="common-popup__buttons">
          <CustomButton
            buttonLabel="Сохранить"
            buttonType="action"
            class="common-popup__button common-popup__save-button"
            :fullWidth="true"
            @click="saveCategory"
          />
          <CustomButton
            buttonLabel="Отмена"
            buttonType="passive"
            class="common-popup__button"
            :fullWidth="true"
            @click="closePopup"
          />
        </fieldset>
      </form>
    </section>
  </div>
</template>

<script>
import store from "@/store";
import CustomInput from "../UI/CustomInput.vue";
import CustomButton from "../UI/CustomButton.vue";

export default {
  name: "NewAndEditCategoryPopup",
  components: {
    CustomInput,
    CustomButton
  },
  props: {
    categoryToEditID: {
      type: String || null,
      default: null,
    }
  },
  data() {
    return {
      categoryName: "",
      categoryParentId: "",
      categoryParentTitle: "",
      innerArticlesSelected: [],
      parentCategoryOptions: {
        isVisible: false,
        value: [],
      },
      innerArticlesOptions: {
        isVisible: false,
        value: [],
      },
    };
  },
  computed: {
    isCategoryPopupVisible() {
      return store.getters.isCategoryPopupVisible;
    },
  },
  methods: {
    saveCategory() {
      if (this.categoryToEditID) {
        this.updateCategory();
      } else {
        this.createCategory();
      }
    },
    createCategory() {
      store.dispatch("createCategory", {
        name: this.categoryName,
        parentCategory: this.categoryParentId || null,
        articles: this.innerArticlesSelected.map(article => article.id),
      });
      this.resetFields();
    },
    updateCategory() {
      store.dispatch("updateCategory", {
        id: this.categoryToEditID,
        title: this.categoryName,
        parentCategory: this.categoryParentId || null,
        articlesID: this.innerArticlesSelected.map(article => article.id),
      });
    },
    resetFields() {
      this.categoryName = "";
      this.categoryParentId = "";
      this.categoryParentTitle = "";
      this.innerArticlesSelected = [];
    },
    closePopup() {
      store.dispatch("toggleCategoryPopup");
    },
    showOptions(optionsName) {
      this.$data[optionsName].isVisible = true;
    },
    hideOptions(optionsName) {
      this.$data[optionsName].isVisible = false;
    },
    openParentCategoryOptions(optionsName) {
      this.$data[optionsName].value = store.getters.getAllCategories;
      this.showOptions(optionsName);
    },
    chooseParentCategoryOption(option) {
      this.categoryParentTitle = option.title;
      this.categoryParentId = option.id;
      this.hideOptions("parentCategoryOptions");
    },
    openInnerArticlesOptions(optionsName) {
      this.innerArticlesOptions.value = store.getters.getRestArticles(
        this.innerArticlesSelected.map(article => article.id)
      );

      this.showOptions(optionsName);
    },
    chooseInnerArticlesOption(article) {
      this.innerArticlesSelected.push(article);
      this.hideOptions("innerArticlesOptions");
    },
    removeSelectedArticle(articleID) {
      const articleIndex = this.innerArticlesSelected.findIndex(article => article.id == articleID);
      this.innerArticlesSelected.splice(articleIndex, 1);
    },
    onInputChanged(value, fieldName) {
      this[fieldName] = value;
    },
    onInputInputed(input) {
      const optionsSettings = this.$data[input.name];
      this.showOptions(input.name);

      if (!input.value) {
        optionsSettings.value = [];
        optionsSettings.isVisible = false;
        return;
      }

      optionsSettings.value = store.getters.getCategoryByName(input.value);
      optionsSettings.isVisible = this.parentCategoryOptions.value.length ? true : false;
    },
  },
  watch: {
    categoryToEditID(categoryID) {
      if (categoryID) {
        let {
          title,
          parentCategory,
          articlesID
        } = store.getters.getCategoryByID(this.categoryToEditID);
        this.categoryName = title;
        this.categoryParentId = parentCategory;
        this.categoryParentTitle = store.getters.getCategoryByID(parentCategory)?.title;
        this.innerArticlesSelected = store.getters.getArticlesByID(articlesID).map(article => {
          return {
            id: article.id,
            title: article.title
          };
        });
      } else {
        this.resetFields();
      }
    }
  }
};
</script>
