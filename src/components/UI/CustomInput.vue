<template>
  <div class="custom-input">
    <input
      type="text"
      class="custom-input__field"
      placeholder=" "
      :value="value"
      @click="inputClicked($event.target.value)"
      @input="inputValueInputed($event.target.value)"
      @change="inputValueChanged($event.target.value)"
      @blur="inputBlurred"
      :readonly="noType"
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
  name: "CustomInput",
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
    },
    value: {
      type: String,
      default: "",
    },
    noType: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
    };
  },
  methods: {
    inputClicked() {
      this.$emit("click", this.fieldName);
    },
    inputValueInputed(value) {
      this.$emit("input", {
        name: this.fieldName,
        value,
      });
    },
    inputValueChanged(value) {
      this.$emit("change", {
        name: this.fieldName,
        value,
      });
    },
    inputBlurred() {
      this.$emit("blur");
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
