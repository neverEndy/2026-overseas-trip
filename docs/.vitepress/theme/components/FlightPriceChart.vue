<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { withBase } from 'vitepress'
import { Bar, Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Filler,
} from 'chart.js'
import type { DestinationId } from '../flightData'
import { FLIGHT_DOCS } from '../flightData'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Filler,
)

const props = withDefaults(
  defineProps<{
    /** 單一地點長條圖 */
    destination?: DestinationId
    /** 三地同一圖：折線對照 */
    compare?: boolean
    /** 單一地點時：bar 或 line */
    variant?: 'bar' | 'line'
    /** 圖表高度 px */
    height?: number
  }>(),
  {
    compare: false,
    variant: 'bar',
    height: 320,
  },
)

const mounted = ref(false)
const jejuExplainHref = withBase('/planning/01-voting/jeju')

onMounted(() => {
  mounted.value = true
})

const labels = computed(() => FLIGHT_DOCS.busan.periods.map((p) => p.labelChart))

const COLORS: Record<DestinationId, { border: string; bg: string }> = {
  busan: { border: 'rgb(54, 162, 235)', bg: 'rgba(54, 162, 235, 0.35)' },
  fukuoka: { border: 'rgb(255, 99, 132)', bg: 'rgba(255, 99, 132, 0.35)' },
  jeju: { border: 'rgb(75, 192, 192)', bg: 'rgba(75, 192, 192, 0.35)' },
}

const chartData = computed(() => {
  if (props.compare) {
    const ids: DestinationId[] = ['busan', 'fukuoka', 'jeju']
    return {
      labels: labels.value,
      datasets: ids.map((id) => {
        const c = COLORS[id]
        return {
          label: FLIGHT_DOCS[id].destination.displayNameZh,
          data: FLIGHT_DOCS[id].periods.map((p) => p.quote.roundTripFromTwd),
          borderColor: c.border,
          backgroundColor: c.bg,
          tension: 0.25,
          fill: false,
          pointRadius: 2,
          pointHoverRadius: 5,
        }
      }),
    }
  }
  const id = props.destination ?? 'busan'
  const c = COLORS[id]
  const data = FLIGHT_DOCS[id].periods.map((p) => p.quote.roundTripFromTwd)
  return {
    labels: labels.value,
    datasets: [
      {
        label: `${FLIGHT_DOCS[id].destination.displayNameZh} 來回起價（TWD）`,
        data,
        borderColor: c.border,
        backgroundColor: props.variant === 'bar' ? c.bg : c.border,
        tension: 0.25,
        fill: props.variant === 'line',
      },
    ],
  }
})

const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  interaction: { mode: 'index' as const, intersect: false },
  plugins: {
    legend: {
      display: props.compare || props.variant === 'line',
      position: 'top' as const,
    },
    tooltip: {
      callbacks: {
        label(ctx: { dataset: { label?: string }; parsed: { y: number | null } }) {
          const v = ctx.parsed.y
          if (v == null) return ''
          return `${ctx.dataset.label ?? ''}: $${v.toLocaleString('zh-TW')}`
        },
      },
    },
  },
  scales: {
    x: {
      ticks: {
        maxRotation: 60,
        minRotation: 45,
        autoSkip: true,
        maxTicksLimit: 14,
      },
    },
    y: {
      title: { display: true, text: 'TWD（起）' },
      ticks: {
        callback: (v: string | number) =>
          '$' + Number(v).toLocaleString('zh-TW'),
      },
    },
  },
}))
</script>

<template>
  <figure class="flight-price-chart" :style="{ height: `${height}px` }">
    <div v-if="mounted" class="flight-price-chart__inner">
      <Line v-if="compare || variant === 'line'" :data="chartData" :options="chartOptions" />
      <Bar v-else :data="chartData" :options="chartOptions" />
    </div>
    <p v-else class="flight-price-chart__placeholder">載入圖表中…</p>
    <figcaption v-if="compare" class="flight-price-chart__caption">
      折線為各假期檔期對應之「表列起價」；濟州 10/28 起為轉機價，與直達不宜直接相比，詳見
      <a :href="jejuExplainHref">濟州頁說明</a>。
    </figcaption>
  </figure>
</template>

<style scoped>
.flight-price-chart {
  margin: 1.25rem 0;
  max-width: 100%;
}
.flight-price-chart__inner {
  height: 100%;
  position: relative;
}
.flight-price-chart__placeholder {
  margin: 0;
  padding: 2rem;
  text-align: center;
  color: var(--vp-c-text-2);
}
.flight-price-chart__caption {
  margin-top: 0.5rem;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}
</style>
