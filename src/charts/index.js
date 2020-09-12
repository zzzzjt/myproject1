import VeLine from "v-charts/lib/line.common";
import VeRing from "v-charts/lib/ring.common";

const Vcharts = {
  install: function(Vue) {
    Vue.component(VeLine.name, VeLine);
    Vue.component(VeRing.name, VeRing);
  },
};
export default Vcharts;
