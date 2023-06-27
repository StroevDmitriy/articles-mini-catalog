<template>
  <CustomButton
    button-label="Создать категорию"
    button-type="action"
    class="create-category-button"
    @click="openNewCategoryPopup"
  />
</template>

<script>
import CustomButton from "./UI/CustomButton.vue";
import store from "@/store";

export default {
  name: "CreateCategoryButton",
  components: {
    CustomButton,
  },
  data() {
    return {};
  },
  methods: {
    openNewCategoryPopup() {
      store.dispatch("toggleNewCategoryPopup");
    }
  }
};
</script>
<style scoped>

.create-category-button {
  position: relative;
  padding-right: 48px;
}

.create-category-button::after {
  position: absolute;
  content: '+';
  top: 50%;
  right: 21px;
  transform: translateY(calc(-50% - 2px));
  margin-left: 13px;
  font-size: 30px;
  font-weight: 100;
}
</style>
