<template>
  <div
    :class="[
      'popup-container',
      { 'popup-container__shown': isRemoveCategoryPopupVisible }
    ]"
  >
    <div
      class="popup-container__overlay"
      @click="closePopup"
    ></div>
    <section
      class="popup-container__popup remove-category-popup"
    >
      <div class="remove-category-popup__ico-container"></div>

      <div class="remove-category-popup__content">
        <h4>Удалить категорию?</h4>
        <p>Все дочерние категории удалятся.</p>
      </div>

      <div class="remove-category-popup__buttons">
        <CustomButton
          buttonLabel="Удалить"
          buttonType="action"
          class="remove-category-popup__button remove-category-popup__remove-button"
          :fullWidth="false"
          @click="removeCategory"
        />
        <CustomButton
          buttonLabel="Отмена"
          buttonType="passive"
          class="remove-category-popup__button remove-category-popup__cancel-button"
          :fullWidth="false"
          @click="closePopup"
        />
      </div>
    </section>
  </div>
</template>

<script>
import CustomButton from "../UI/CustomButton.vue";
import { mapState } from "vuex";

export default {
  name: "RemoveCategoryPopup",
  components: {
    CustomButton,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState([
      "isRemoveCategoryPopupVisible",
      "categoryToRemoveID"
    ]),
  },
  methods: {
    closePopup() {
      this.$store.commit("toggleRemoveCategoryPopup");
    },
    removeCategory() {
      this.$store.dispatch("removeCategory", this.categoryToRemoveID);
    }
  },
};

</script>
<style scoped>
.remove-category-popup {
  background-color: #fff;
  width: 432px;
  padding: 32px 20px 46px;
  text-align: center;
}

.remove-category-popup__ico-container {
  height: 38px;
  width: 38px;
  margin: 0 auto 12px;
  background-image: url(../../assets/svg/question-circle.svg);;
}

.remove-category-popup h4 {
  margin-bottom: 4px;
}

.remove-category-popup__content {
  margin-bottom: 32px;
}

.remove-category-popup__buttons {
  display: flex;
  justify-content: center;
}

.remove-category-popup__button {
  justify-content: center;
  font-weight: 600;
  padding-left: 24px;
  padding-right: 24px;
}

.remove-category-popup__remove-button {
  margin-right: 8px;
}
</style>
