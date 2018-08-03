<template>
  <div class="parent">
    <div class="overlay" ref="overlay" :style="style">
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
import Background from '@/mixins/Background.vue'

export default {
  name: 'v-circlemask',
  mixins: [ Background ],
  props: {
    circle: {
      type: Object,
      required: true,
      default: function () {
        return {
          x: 0,
          y: 0,
          radius: 50
        }
      }
    }
  },
  computed: {
    svgPath: function () {
      const cx = this.circle.x
      const cy = this.circle.y
      const r = this.circle.radius
      const d = r * 2

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

      // returns a SVG path of a box with a circle excluded.
      // This is done by drawing two arcs to create the circle, then drawing the box around
      return `M ${cx} ${cy} ` +
            `m 0,-${r}  ` +
            `a ${r},${r} 1 0,1 0,${d} ` +
            `a ${r},${r} 1 0,1 0,-${d} ` +
            `L 0 ${cx} ` +
            `L 0 ${overlayWidth} ` +
            `L ${overlayHeight} ${overlayWidth} ` +
            `L ${overlayHeight} 0 ` +
            'L 0 0 ' +
            `L 0 ${cx} ` +
            'Z'
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
    /* background-color: rgba(0, 0, 0, 0.75); */
    clip-path: url(#svgPath);
    pointer-events: visiblePainted;
  }
</style>
