<template>
  <button
    type="button"
    :class="[
      'custom-button',
      {
        'action-button': buttonType === 'action',
        'passive-button': buttonType === 'passive',
        'inactive-button': buttonType === 'inactive',
        'custom-button__full-width': fullWidth,
      },
    ]"
    @click="click"
  >{{ buttonLabel }} </button>
</template>

<script>
export default {
  name: "CustomButton",
  components: {},
  props: {
    buttonLabel: {
      default: "Текст кнопки",
      type: String
    },
    buttonType: {
      default: "passive",
      type: String,
      validator(value) {
        return ["action", "passive"].includes(value);
      }
    },
    fullWidth: {
      default: false,
      type: Boolean
    }
  },
  data() {
    return {};
  },
  methods: {
    click() {
      this.$emit("click");
    }
  }
};

</script>

<style scoped>
.custom-button{
  border: none;
  border-radius: 3px;
  padding: 10px 21px 12px 16px;
  font-size: 16px;
  line-height: 1.5;
  transition: background-color .3s;
  cursor: pointer;
}
.action-button {
  color: #fff;
  background-color: #ED5252;
}

.action-button:hover {
  background-color: #F06C6C;
}

.action-button:active {
  background-color: #D54A4A;
}

.action-button:disabled {
  background-color: #F0F1F2;
}

.passive-button {
  color: #303446;
  background-color: rgba(10, 14, 32, 0.07);
}

.passive-button:hover {
  background-color: rgba(10, 14, 32, 0.1);
}

.passive-button:active {
  background-color: rgba(10, 14, 32, 0.15);
}

.passive-button:disabled {
  color: #fff;
  background-color: rgba(197, 199, 208, 1);
}

.custom-button__full-width {
  width: 100%;
}
</style>
