<template>
  <button
    type="button"
    :class="[
      'custom-button',
      {
        'custom-button_action': buttonType === 'action',
        'custom-button_passive': buttonType === 'passive',
        'custom-button_inactive': buttonType === 'inactive',
        'custom-button_full-width': fullWidth,
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
        return ["action", "passive", "inactive"].includes(value);
      }
    },
    fullWidth: {
      default: false,
      type: Boolean
    }
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
  display: flex;
  align-items: center;
  border: none;
  border-radius: 3px;
  padding: 10px 21px 10px 16px;
  font-size: 16px;
  line-height: 1.5;
  transition: background-color .3s;
  cursor: pointer;
}
.custom-button_action {
  color: #fff;
  background-color: #ED5252;
}

.custom-button_action:hover {
  background-color: #F06C6C;
}

.custom-button_action:active {
  background-color: #D54A4A;
}

.custom-button_action:disabled {
  background-color: #F0F1F2;
}

.custom-button_passive {
  color: #303446;
  background-color: rgba(10, 14, 32, 0.07);
}

.custom-button_passive:hover {
  background-color: rgba(10, 14, 32, 0.1);
}

.custom-button_passive:active {
  background-color: rgba(10, 14, 32, 0.15);
}

.custom-button_passive:disabled {
  color: #fff;
  background-color: rgba(197, 199, 208, 1);
}

.custom-button_full-width {
  width: 100%;
}
</style>
