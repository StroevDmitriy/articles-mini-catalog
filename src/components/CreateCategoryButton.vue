<template>
  <CustomButton
    button-label="Создать категорию"
    button-type="action"
    class="create-category-button"
  />
</template>

<script>
import CustomButton from "./UI/CustomButton.vue"

export default {
  name: "create-category-button",
  components: {
    CustomButton,
  },
  data() {
    return {};
  },
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
  transform: translateY(calc(-50% - 2px));
  margin-left: 13px;
  font-size: 30px;
  font-weight: 100;
}
</style>
