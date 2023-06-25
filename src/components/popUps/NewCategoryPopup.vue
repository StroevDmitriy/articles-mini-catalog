<template>
  <div class="new-category-container" style="display: none;">
    <div class="new-category-container__overlay"></div>
    <section class="new-category-container__popup new-category-popup">
      <form action="">
        <h3>Новая категория</h3>
        <fieldset class="new-category-popup__fields">
          <CustomInput
            type="input"
            placeholder="Название"
            class="new-category-popup__input"
          />
          <CustomInput
            type="select"
            placeholder="Родительская карточка (необязательно)"
            class="new-category-popup__input"
          />
          <CustomInput
            type="select"
            placeholder="Вложенные статьи"
            class="new-category-popup__input"
          />
        </fieldset>
        <fieldset class="new-category-popup__buttons">
          <CustomButton
            buttonLabel="Сохранить"
            buttonType="action"
            class="new-category-popup__button new-category-popup__save-button"
            :fullWidth="true"
          />
          <CustomButton
            buttonLabel="Отмена"
            buttonType="passive"
            class="new-category-popup__button new-category-popup__cancel-button"
            :fullWidth="true"
          />
        </fieldset>
      </form>
    </section>
  </div>
</template>

<script>
import CustomInput from "../UI/CustomInput.vue";
import CustomButton from "../UI/CustomButton.vue";

export default {
  name: "new-category-popup",
  components: {
    CustomInput,
    CustomButton
  },
  data() {
    return {};
  },
};

</script>
<style scoped>
.new-category-container {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
.new-category-container__overlay {
  width: 100%;
  height: 100%;
  background-color: rgba(10, 14, 32, 0.4);
}
.new-category-container__popup {
  position: fixed;
  width: 826px;
  box-sizing: border-box;
  padding: 32px 32px 24px;
  border-radius: 10px;
  background-color: #fff;

  top: 40px;
  left: 50%;
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
