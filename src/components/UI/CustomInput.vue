<template>
  <div class="custom-input">
    <input
      type="text"
      class="custom-input__field"
    >

    <div class="custom-input__placeholder">{{ placeholder }}</div>

    <div class="custom-input__icon">
      <img :src="require('@/assets/svg/' + icoName + '.svg')"/>
    </div>
  </div>
</template>

<script>
export default {
  name: "custom-input",
  components: {},
  props: {
    placeholder: {
      type: String,
      default: 'Custom placeholder',
    },
    icoName: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'input',
    }
  },
  data() {
    return {};
  },
};
</script>
<style scoped>
.custom-input {
  position: relative;
  outline-width: 0px;
}

.custom-input:hover {
  border-color: #BFC3D5;
}

.custom-input__field{
  width: 100%;
  box-sizing: border-box;
  padding: 18px 12px 6px 16px;
  font-size: 14px;
  line-height: 22px;
  border: 1px solid #D9DDE6;
  border-radius: 4px;
  transition: border-color .3s;
}

.custom-input__icon {
  display: flex;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 16px;
}

.custom-input__placeholder {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  transition: all .3s;
  color: #A0A6BF;
  pointer-events: none;
}

.custom-input__field:focus,
.custom-input__field:focus-visible,
.custom-input__field:focus-within,
.custom-input__field:active {
  border: 1px solid #D9DDE6;
  outline-width: 0px;
}

.custom-input__field:focus + .custom-input__placeholder {
  top: 5px;
  transform: translateY(0%);
  font-size: 11px;
}
</style>
