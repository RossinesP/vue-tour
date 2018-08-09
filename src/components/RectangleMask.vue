<template>
  <div class="parent">
    <div class="overlay" ref="overlay">
      <svg xmlns="http://www.w3.org/2000/svg">
        <defs>
          <clipPath id="svgPath">
            <polygon :points="points" />
          </clipPath>
        </defs>
      </svg>
    </div>
  </div>
</template>

<script>
import Background from '@/mixins/Background.vue'

export default {
  name: 'v-rectanglemask',
  mixins: [ Background ],
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
    points: function () {
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

      const points = '0 0, ' +
                     `0 ${overlayHeight}, ` +
                     `${this.rectangle.x} ${overlayHeight}, ` +
                     `${this.rectangle.x} ${this.rectangle.y}, ` +
                     `${this.rectangle.x + this.rectangle.width} ${this.rectangle.y}, ` +
                     `${this.rectangle.x + this.rectangle.width} ${this.rectangle.y + this.rectangle.height}, ` +
                     `${this.rectangle.x} ${this.rectangle.y + this.rectangle.height}, ` +
                     `${this.rectangle.x} ${overlayHeight}, ` +
                     `${overlayWidth} ${overlayHeight}, ` +
                     `${overlayWidth} 0, ` +
                     '0, 0'
      return points
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
    -webkit-clip-path: url(#svgPath);
    pointer-events: visiblePainted;
  }
</style>
