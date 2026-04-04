import busan from '../../planning/01-voting/data/busan.json'
import fukuoka from '../../planning/01-voting/data/fukuoka.json'
import jeju from '../../planning/01-voting/data/jeju.json'

export type DestinationId = 'busan' | 'fukuoka' | 'jeju'

export const FLIGHT_DOCS: Record<DestinationId, typeof busan> = {
  busan,
  fukuoka,
  jeju,
}

export type FlightDoc = (typeof FLIGHT_DOCS)[DestinationId]
export type FlightPeriod = FlightDoc['periods'][number]

export function formatTwd(n: number): string {
  return n.toLocaleString('zh-TW')
}
