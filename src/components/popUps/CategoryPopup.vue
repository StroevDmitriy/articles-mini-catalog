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
      class="popup-container__popup category-popup"
    >
      <form action="">
        <h3 v-if="categoryIDToEdit">Редактирование категории</h3>
        <h3 v-else>Новая категория</h3>
        <fieldset class="category-popup__fields">
          <CustomInput
            class="category-popup__input"
            type="input"
            placeholder="Название"
            :value="categoryName"
            @change="onInputChanged($event.value, 'categoryName')"
          />
          <div class="category-popup__field-container">
            <div class="category-popup__input-container">
              <CustomInput
                class="category-popup__input"
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
                class="category-popup__select-options"
                v-show="parentCategoryOptions.isVisible"
              >
                <button
                  class="category-popup__select-option"
                  type="button"
                  @mousedown="chooseParentCategoryOption('')"
                ><span>(Нет родительской категории)</span></button>
                <button
                  v-for="option in parentCategoryOptions.value"
                  class="category-popup__select-option"
                  type="button"
                  :key="option.categoryId"
                  @mousedown="chooseParentCategoryOption(option)"
                >
                  {{ option.title }}
                </button>
              </div>
            </div>
          </div>
          <div class="category-popup__field-container">
            <div class="category-popup__input-container">
              <CustomInput
                type="select"
                placeholder="Вложенные статьи"
                class="category-popup__input"
                fieldName="innerArticlesOptions"
                noType
                @click="openInnerArticlesOptions($event)"
                @change="onInputChanged($event.value, 'categoryArticles')"
                @blur="hideOptions('innerArticlesOptions')"
              />
              <div
                class="category-popup__select-options"
                v-show="innerArticlesOptions.isVisible"
              >
                <button
                  v-for="option in innerArticlesOptions.value"
                  :key="option.id"
                  class="category-popup__select-option"
                  type="button"
                  @mousedown="chooseArticlesOption({
                    id: option.id,
                    title: option.title
                  })"
                >
                  {{ option.title }}
                </button>
              </div>
            </div>
            <div class="category-popup__selected-articles">
              <div
                v-for="article in innerArticlesSelected"
                :key="article.id"
                class="category-popup__selected-inner-article"
              >
                <button
                  class="category-popup__remove-article-button"
                  type="button"
                  @click="removeSelectedArticle(article.id)"
                ></button>
                {{ article.title }}
              </div>
            </div>
          </div>

        </fieldset>
        <fieldset class="category-popup__buttons">
          <CustomButton
            buttonLabel="Сохранить"
            buttonType="action"
            class="category-popup__button category-popup__save-button"
            :fullWidth="true"
            @click="saveCategory"
          />
          <CustomButton
            buttonLabel="Отмена"
            buttonType="passive"
            class="category-popup__button category-popup__cancel-button"
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
  name: "CategoryPopup",
  components: {
    CustomInput,
    CustomButton
  },
  props: {
    categoryIDToEdit: {
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
      if (this.categoryIDToEdit) {
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
        id: this.categoryIDToEdit,
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
    hideOptions(optionsName) {
      this.$data[optionsName].isVisible = false;
    },
    chooseParentCategoryOption(option) {
      this.categoryParentTitle = option.title;
      this.categoryParentId = option.id;
      this.hideOptions("parentCategoryOptions");
    },
    chooseArticlesOption(article) {
      this.innerArticlesSelected.push(article);
      this.hideOptions("innerArticlesOptions");
    },
    onInputChanged(value, fieldName) {
      this[fieldName] = value;
    },
    showOptions(optionsName) {
      this.$data[optionsName].isVisible = true;
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
    openParentCategoryOptions(optionsName) {
      this.$data[optionsName].value = store.getters.getAllCategories;
      this.showOptions(optionsName);
    },
    openInnerArticlesOptions(optionsName) {
      this.innerArticlesOptions.value = store.getters.getRestArticles(
        this.innerArticlesSelected.map(article => article.id)
      );

      this.showOptions(optionsName);
    },
    removeSelectedArticle(articleID) {
      const articleIndex = this.innerArticlesSelected.findIndex(article => article.id == articleID);
      this.innerArticlesSelected.splice(articleIndex, 1);
    }
  },
  watch: {
    categoryIDToEdit(categoryIDToEdit) {
      if (categoryIDToEdit) {
        let {
          title,
          parentCategory,
          articlesID
        } = store.getters.getCategoryByID(this.categoryIDToEdit);
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
<style scoped>
.category-popup {
  width: 826px;
  padding: 32px 32px 24px;
}

.category-popup-container__popup h3 {
  color: #000;
}

.category-popup h3 {
  margin-bottom: 16px;
}

.category-popup__fields {
  min-height: 529px;
}

.category-popup__input {
  margin-bottom: 16px;
}

.category-popup__input-container {
  position: relative;
}

.category-popup__select-options {
  position: absolute;
  box-sizing: border-box;
  width: 100%;
  max-height: 170px;
  overflow: auto;
  top: 100%;
  left: 0;
  padding: 8px 9px;
  border: 1px solid #D9DDE6;
  background-color: #fff;
  z-index: 1000;
}

.category-popup__select-option {
  width: 100%;
  padding: 6px 8px;
  font-size: 14px;
  font-weight: 500;
  line-height: 22px;
  transition: color .2s;
}

.category-popup__select-option span {
  opacity: .4;
}

.category-popup__select-option:hover {
  color: #A0A6BF;
}

.category-popup__selected-articles {
  display: flex;
  flex-wrap: wrap;
}

.category-popup__selected-inner-article {
  display: flex;
  align-items: center;
  margin-right: 16px;
  margin-bottom: 16px;
}

.category-popup__remove-article-button {
  width: 24px;
  height: 24px;
  border-radius: 3px;
  margin-right: 12px;
  background-color: #ED5252;
  background-image: url(../../assets/svg/delete.svg);
}

.category-popup__buttons {
  display: flex;
  justify-content: space-between;
  padding-top: 16px;
  border-top: 1px solid #BFC3D5;
}

.category-popup__button {
  justify-content: center;
  font-weight: 500;
}

.category-popup__save-button {
  margin-right: 24px;
}
</style>
