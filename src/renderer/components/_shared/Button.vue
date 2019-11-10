<template>
  <button
    :class="{ 'btn-text': textButton, 'btn': !textButton, 'btn-tag': tagStyle, 'btn-submit': typeSubmit }"
    :type="typeSubmit ? 'submit' : 'button'"
  >
    {{ text }}
  </button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    text: {
      type: String,
      default: 'a button'
    },
    textButton: {
      type: Boolean,
      default: false
    },
    tagStyle: {
      type: Boolean,
      default: false
    },
    typeSubmit: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style>
/* eslint-disable */
.btn {
  transition: all 225ms linear;
  @apply border border-solid border-orange-800 font-bold px-2 rounded-sm;
}
.btn:hover,
.btn:focus {
  @apply bg-orange-800 text-orange-300;
}
.btn-text {
  @apply text-orange-900;
}
.btn-text:hover,
.btn-text:focus {
  @apply text-orange-700;
}
.btn-tag {
  @apply font-normal;
}
.btn-submit {
  @apply block w-full p-2 bg-orange-800 text-orange-300;

}
.btn-submit:hover,
.btn-submit:focus {
  @apply text-orange-100;
}
/* eslint-enable */
</style>
