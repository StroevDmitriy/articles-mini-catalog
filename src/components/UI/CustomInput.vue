<template>
  <div class="custom-input">
    <input
      type="text"
      class="custom-input__field"
      @change="inputValueChanged($event)"
      placeholder=" "
    >

    <div
      v-if="placeholder"
      class="custom-input__placeholder"
    >{{ placeholder }}</div>

    <div
      v-if="icoName"
      class="custom-input__icon"
    >
      <img
        :src="require(`@/assets/svg/${icoName}.svg`)" 
        alt="Icon"
      />
    </div>

    <div
      v-if="type === 'select'"
      class="custom-input__icon"
    >
      <img
        src="../../assets/svg/select-down.svg"
        alt="Select ico"
      />
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
      default: "Custom placeholder",
    },
    icoName: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "input",
    },
    fieldName: {
      type: String,
      default: "",
    }
  },
  data() {
    return {
    };
  },
  methods: {
    inputValueChanged(e) {
      this.$emit("valueChanged", {
        name: this.fieldName,
        value: e.target.value,
      });
    }
  }
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
  pointer-events: none;
}

.custom-input__placeholder {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  transition: all .3s;
  color: #A0A6BF;
  font-size: 14px;
  line-height: 22px;
  font-weight: 500;
  pointer-events: none;
}

.custom-input__field:focus,
.custom-input__field:focus-visible,
.custom-input__field:focus-within,
.custom-input__field:active {
  border: 1px solid #D9DDE6;
  outline-width: 0px;
}

.custom-input__field::placeholder {
  color: transparent;
}

.custom-input__field:focus + .custom-input__placeholder,
.custom-input__field:not(:placeholder-shown) + .custom-input__placeholder {
  top: 3px;
  transform: translateY(0%);
  font-size: 11px;
}
</style>
