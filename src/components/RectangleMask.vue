<template>
  <div class="parent">
    <div class="overlay" ref="overlay">
      <svg xmlns="http://www.w3.org/2000/svg">
        <def>
          <clipPath id="svgPath">
            <path :d="svgPath" />
          </clipPath>
        </def>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: 'v-rectanglemask',
  props: {
    rectangle: {
      type: Object,
      required: true,
      default: function () {
        return {
          x: 0,
          y: 0,
          width: 50,
          height: 30
        }
      }
    }
  },
  computed: {
    svgPath: function () {
      // This bounding rect declaration is disgusting
      // but this is the only way I found to make it work
      let boundingRect = {
        x: 0,
        y: 0,
        top: 0,
        left: 0,
        bottom: 99999,
        right: 99999,
        width: 99999,
        height: 99999
      }

      const overlayWidth = boundingRect.right - boundingRect.left
      const overlayHeight = boundingRect.bottom - boundingRect.top

      const path = `M ${this.rectangle.x} ${this.rectangle.y} ` +
            `l 0 ${this.rectangle.height} ` +
            `l ${this.rectangle.width} 0 ` +
            `l 0 -${this.rectangle.height} ` +
            `l -${this.rectangle.width} 0 ` +
            `L ${this.rectangle.x} 0 ` +
            `L ${overlayWidth} 0 ` +
            `L ${overlayWidth} ${overlayHeight} ` +
            `L 0 ${overlayHeight} ` +
            'L 0 0 ' +
            `L ${this.rectangle.x} 0 ` +
            'Z'
      return path
    }
  }
}
</script>

<style scoped>
  .parent {
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    min-height: 100%;
  }

  .overlay {
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    min-height: 100%;
    background-color: rgba(0, 0, 0, 0.75);
    clip-path: url(#svgPath);
    pointer-events: visiblePainted;
  }
</style>
