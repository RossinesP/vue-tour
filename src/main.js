import VTour from './components/VTour'
import VStep from './components/VStep'
import CircleMask from './components/CircleMask'
import RectangleMask from './components/RectangleMask'

const VueTour = {
  install (Vue, options) {
    Vue.component(VTour.name, VTour)
    Vue.component(VStep.name, VStep)
    Vue.component(CircleMask.name, CircleMask)
    Vue.component(RectangleMask.name, RectangleMask)

    // Object containing Tour objects (see VTour.vue) where the tour name is used as key
    Vue.prototype.$tours = {}
  }
}

export default VueTour

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VueTour)
}
