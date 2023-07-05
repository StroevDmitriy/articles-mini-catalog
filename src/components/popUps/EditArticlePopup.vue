<template>
  <div
    :class="[
      'popup-container',
      { 'popup-container__shown': isEditArticlePopupVisible },
    ]">
    <div
      class="popup-container__overlay"
      @click="closePopup"></div>
    <section class="popup-container__popup common-popup">
      <form action="">
        <h3>Изменение расположения статьи</h3>
        <fieldset class="common-popup__fields">
          <div class="common-popup__field-container">
            <div class="common-popup__input-container">
              <CustomInput
                type="select"
                placeholder="Категория (может быть несколько, необязательно)"
                class="common-popup__input select"
                fieldName="categoriesOptions"
                noType
                @click="openCategoriesOptions($event)"
                @blur="hideOptions('categoriesOptions')" />
              <div
                class="select__options"
                v-show="categoriesOptions.isVisible">
                <button
                  v-for="option in categoriesOptions.value"
                  :key="option.id"
                  class="select__option"
                  type="button"
                  @mousedown="
                    chooseCategoriesOption({
                      id: option.id,
                      title: option.title,
                    })
                  ">
                  {{ option.title }}
                </button>
              </div>
            </div>
            <div class="select__selected-options">
              <div
                v-for="category in categoriesSelected"
                :key="category.id"
                class="select__selected-option">
                <button
                  class="select__remove-option-button"
                  type="button"
                  @click="removeSelectedCategory(category.id)"></button>
                {{ category.title }}
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
            @click="updateArticle" />
          <CustomButton
            buttonLabel="Отмена"
            buttonType="passive"
            class="common-popup__button"
            :fullWidth="true"
            @click="closePopup" />
        </fieldset>
      </form>
    </section>
  </div>
</template>

<script>
import CustomButton from "../UI/CustomButton.vue";
import CustomInput from "../UI/CustomInput.vue";
import { mapState } from "vuex";

export default {
  name: "EditArticlePopup",
  components: {
    CustomButton,
    CustomInput,
  },
  props: {
    articleToEditID: {
      type: String || null,
      default: null,
    },
  },
  data() {
    return {
      categoriesSelected: [],
      categoriesOptions: {
        isVisible: false,
        value: [],
      },
    };
  },
  computed: {
    ...mapState(["isEditArticlePopupVisible"]),
  },
  methods: {
    updateArticle() {
      this.$store.dispatch("updateArticle", {
        id: this.articleToEditID,
        categoriesID: this.categoriesSelected.map((category) => category.id),
      });
    },
    closePopup() {
      this.$store.dispatch("toggleEditArticlePopup");
    },
    openCategoriesOptions(optionsName) {
      this.categoriesOptions.value = this.$store.getters.getRestCategories(
        this.categoriesSelected.map((category) => category.id)
      );

      this.showOptions(optionsName);
    },
    onInputChanged(value, fieldName) {
      this[fieldName] = value;
    },
    showOptions(optionsName) {
      this.$data[optionsName].isVisible = true;
    },
    hideOptions(optionsName) {
      this.$data[optionsName].isVisible = false;
    },
    chooseCategoriesOption(category) {
      this.categoriesSelected.push(category);
      this.hideOptions("categoriesOptions");
    },
    removeSelectedCategory(categoryID) {
      const categoryIndex = this.categoriesSelected.findIndex(
        (category) => category.id == categoryID
      );
      this.categoriesSelected.splice(categoryIndex, 1);
    },
  },
  watch: {
    articleToEditID(articleID) {
      this.categoriesSelected =
        this.$store.getters.getCategoriesWithArticle(articleID);
    },
  },
};
</script>
