import DefaultTheme from 'vitepress/theme'
import FlightPeriodList from './components/FlightPeriodList.vue'
import FlightPriceChart from './components/FlightPriceChart.vue'
import './custom.css'

export default {
  ...DefaultTheme,
  enhanceApp(ctx) {
    DefaultTheme.enhanceApp?.(ctx)
    ctx.app.component('FlightPeriodList', FlightPeriodList)
    ctx.app.component('FlightPriceChart', FlightPriceChart)
  },
}
