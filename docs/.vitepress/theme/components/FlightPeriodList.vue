<script setup lang="ts">
import { computed } from 'vue'
import type { DestinationId } from '../flightData'
import { FLIGHT_DOCS, formatTwd } from '../flightData'

const props = defineProps<{
  destination: DestinationId
}>()

const doc = computed(() => FLIGHT_DOCS[props.destination])
const periods = computed(() => doc.value.periods)
</script>

<template>
  <div class="flight-period-list vp-doc">
    <p class="flight-period-list__note">{{ doc.meta.priceNoteZh }}</p>
    <ul>
      <li v-for="p in periods" :key="p.id">
        <p>
          <strong>{{ p.labelZh }}</strong>
          <span v-if="p.quote.roundTripFromTwd != null">
            ｜來回票價 ${{ formatTwd(p.quote.roundTripFromTwd) }} 起
          </span>
          <span v-if="!p.quote.direct" class="flight-period-list__tag">轉機</span>
        </p>
        <ul v-if="p.sampleOutboundSummary">
          <li>去程參考：{{ p.sampleOutboundSummary }}</li>
          <li>回程參考：{{ p.sampleReturnSummary }}</li>
          <li>
            <a :href="p.googleFlightsSearchUrl" target="_blank" rel="noopener noreferrer"
              >查詢連結</a
            >
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.flight-period-list__note {
  font-size: 0.95em;
  color: var(--vp-c-text-2);
  margin-bottom: 1rem;
}
.flight-period-list__tag {
  margin-left: 0.35rem;
  font-size: 0.85em;
  color: var(--vp-c-warning-1, #d4a017);
}
</style>
