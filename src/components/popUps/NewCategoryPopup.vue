<template>
  <div
    :class="[
      'new-category-popup-container',
      { 'new-category-popup-container__shown': isNewCategoryPopupVisible }
    ]"
  >
    <div
      class="new-category-popup-container__overlay"
      @click="closePopup"
    ></div>
    <section
      class="new-category-popup-container__popup new-category-popup"
       
    >
      <form action="">
        <h3>Новая категория</h3>
        <fieldset class="new-category-popup__fields">
          <CustomInput
            type="input"
            placeholder="Название"
            class="new-category-popup__input"
            @change="onInputChanged($event.value, 'newCategoryName')"
          />
          <div class="new-category-popup__field-container">
            <div class="new-category-popup__input-container">
              <CustomInput
                type="select"
                placeholder="Родительская категория (необязательно)"
                class="new-category-popup__input"
                fieldName="parentCategoryOptions"
                :value="newCategoryParentTitle"
                noType
                @input="onInputInputed"
                @click="openParentCategoryOptions($event)"
                @blur="hideOptions('parentCategoryOptions')"
              />
              <div
                class="new-category-popup__select-options"
                v-show="parentCategoryOptions.isVisible"
              >
                <button
                  class="new-category-popup__select-option"
                  type="button"
                  @mousedown="chooseParentCategoryOption('')"
                ><span>(Нет родительской категории)</span></button>
                <button
                  v-for="option in parentCategoryOptions.value"
                  :key="option.categoryId"
                  class="new-category-popup__select-option"
                  type="button"
                  @mousedown="chooseParentCategoryOption(option)"
                >
                  {{ option.title }}
                </button>
              </div>
            </div>
          </div>
          <div class="new-category-popup__field-container">
            <div class="new-category-popup__input-container">
              <CustomInput
                type="select"
                placeholder="Вложенные статьи"
                class="new-category-popup__input"
                fieldName="innerArticlesOptions"
                noType
                @click="openInnerArticlesOptions($event)"
                @change="onInputChanged($event.value, 'newCategoryArticles')"
                @blur="hideOptions('innerArticlesOptions')"
              />
              <div
                class="new-category-popup__select-options"
                v-show="innerArticlesOptions.isVisible"
              >
                <button
                  v-for="option in innerArticlesOptions.value"
                  :key="option.id"
                  class="new-category-popup__select-option"
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
            <div class="new-category-popup__selected-articles">
              <div
                v-for="article in innerArticlesSelected"
                :key="article.id"
                class="new-category-popup__selected-inner-article"
              >
                <button
                  class="new-category-popup__remove-article-button"
                  type="button"
                  @click="removeSelectedArticle(article.id)"
                ></button>
                {{ article.title }}
              </div>
            </div>
          </div>

        </fieldset>
        <fieldset class="new-category-popup__buttons">
          <CustomButton
            buttonLabel="Сохранить"
            buttonType="action"
            class="new-category-popup__button new-category-popup__save-button"
            :fullWidth="true"
            @click="createCategory"
          />
          <CustomButton
            buttonLabel="Отмена"
            buttonType="passive"
            class="new-category-popup__button new-category-popup__cancel-button"
            :fullWidth="true"
            @click="closePopup"
          />
        </fieldset>
      </form>
    </section>
  </div>
</template>

<script>
import CustomInput from "../UI/CustomInput.vue";
import CustomButton from "../UI/CustomButton.vue";
import store from "@/store";

export default {
  name: "NewCategoryPopup",
  components: {
    CustomInput,
    CustomButton
  },
  data() {
    return {
      newCategoryName: "",
      newCategoryParentTitle: "",
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
    isNewCategoryPopupVisible() {
      return store.getters.isNewCategoryPopupVisible;
    },
  },
  methods: {
    createCategory() {
      store.dispatch("createCategory", {
        name: this.newCategoryName,
        parentCategory: this.newCategoryParentId,
        articles: this.innerArticlesSelected.map(article => article.id),
      });

      this.newCategoryName = "";
      this.newCategoryParentTitle = "";
      this.newCategoryParentId = "";
      this.innerArticlesSelected = [];
    },
    closePopup() {
      store.dispatch("toggleNewCategoryPopup");
    },
    hideOptions(optionsName) {
      this.$data[optionsName].isVisible = false;
    },
    chooseParentCategoryOption(option) {
      this.newCategoryParentTitle = option.title;
      this.newCategoryParentId = option.id;
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
  }
};

</script>
<style scoped>
.new-category-popup-container {
  display: none;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}

.new-category-popup-container__shown {
  display: block;
}

.new-category-popup-container__overlay {
  width: 100%;
  height: 100%;
  background-color: rgba(10, 14, 32, 0.4);
}

.new-category-popup-container__popup {
  position: fixed;
  width: 826px;
  top: 40px;
  left: 50%;
  box-sizing: border-box;
  padding: 32px 32px 24px;
  border-radius: 10px;
  background-color: #fff;
  transform: translateX(-50%);
}

.new-category-popup-container__popup h3 {
  color: #000;
}

.new-category-popup h3 {
  margin-bottom: 16px;
}

.new-category-popup__fields {
  min-height: 529px;
}

.new-category-popup__input {
  margin-bottom: 16px;
}

.new-category-popup__input-container {
  position: relative;
}

.new-category-popup__select-options {
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

.new-category-popup__select-option {
  width: 100%;
  padding: 6px 8px;
  font-size: 14px;
  font-weight: 500;
  line-height: 22px;
  transition: color .2s;
}

.new-category-popup__select-option span {
  opacity: .4;
}

.new-category-popup__select-option:hover {
  color: #A0A6BF;
}

.new-category-popup__selected-articles {
  display: flex;
  flex-wrap: wrap;
}

.new-category-popup__selected-inner-article {
  display: flex;
  align-items: center;
  margin-right: 16px;
  margin-bottom: 16px;
}

.new-category-popup__remove-article-button {
  width: 24px;
  height: 24px;
  border-radius: 3px;
  margin-right: 12px;
  background-color: #ED5252;
  background-image: url(../../assets/svg/delete.svg);
}

.new-category-popup__buttons {
  display: flex;
  justify-content: space-between;
  padding-top: 16px;
  border-top: 1px solid #BFC3D5;
}

.new-category-popup__button {
  justify-content: center;
  font-weight: 500;
}

.new-category-popup__save-button {
  margin-right: 24px;
}
</style>
