<template>
  <div
    :class="[
      'new-category-container',
      {
        'new-category-container__shown': isNewCategoryPopupVisible
      }
    ]"
  >
    <div class="new-category-container__overlay"></div>
    <section class="new-category-container__popup new-category-popup">
      <form action="">
        <h3>Новая категория</h3>
        <fieldset class="new-category-popup__fields">
          <CustomInput
            type="input"
            placeholder="Название"
            class="new-category-popup__input"
            @valueChanged="valueChanged($event.value, 'newCategoryName')"
          />
          <CustomInput
            type="select"
            placeholder="Родительская карточка (необязательно)"
            class="new-category-popup__input"
            @valueChanged="valueChanged($event.value, 'newCategoryParent')"
          />
          <CustomInput
            type="select"
            placeholder="Вложенные статьи"
            class="new-category-popup__input"
            @valueChanged="valueChanged($event.value, 'newCategoryArticles')"
          />
        </fieldset>
        <fieldset class="new-category-popup__buttons">
          <CustomButton
            buttonLabel="Сохранить"
            buttonType="action"
            class="new-category-popup__button new-category-popup__save-button"
            :fullWidth="true"
            @click="createNewCategory"
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
  name: "new-category-popup",
  components: {
    CustomInput,
    CustomButton
  },
  data() {
    return {
      newCategoryName: "",
      newCategoryParent: "",
      newCategoryArticles: "",
    };
  },
  computed: {
    isNewCategoryPopupVisible() {
      return store.getters.isNewCategoryPopupVisible
    }
  },
  methods: {
    valueChanged(value, fieldName) {
      console.log("value: ", value, fieldName);
      this[fieldName] = value;
    },
    createNewCategory() {
      console.log("newCategory: ",
        this.newCategoryName,
        this.newCategoryParent,
        this.newCategoryArticles
      );
      store.dispatch("createCategory", {
        newCategoryName: this.newCategoryName,
        newCategoryParent: this.newCategoryParent,
        newCategoryArticles: this.newCategoryArticles,
      });
    },
    closePopup() {
      store.dispatch("toggleNewCategoryPopup");
    }
  }
};

</script>
<style scoped>
.new-category-container {
  display: none;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}

.new-category-container__shown {
  display: block;
}

.new-category-container__overlay {
  width: 100%;
  height: 100%;
  background-color: rgba(10, 14, 32, 0.4);
}

.new-category-container__popup {
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

.new-category-container__popup h3 {
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
