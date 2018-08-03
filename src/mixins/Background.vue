<template>

</template>
<script>
export default {
  props: {
    overlayBackground: {
      type: String,
      required: false,
      default: function () {
        return 'rgba(0, 0, 0, 0.75)'
      }
    }
  },
  computed: {
    style: function () {
      return `background-color: ${this.overlayBackground}`
    }
  }
}
</script>
