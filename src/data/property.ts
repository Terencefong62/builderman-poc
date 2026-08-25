export const PROPERTY_TYPES = [
  { id: 'private', name: '私樓' },
  { id: 'public', name: '公屋' },
  { id: 'hosh', name: '居屋' },
  { id: 'village', name: '村屋' },
  { id: 'tonglau', name: '唐樓' },
  { id: 'new', name: '全新樓' },
] as const

export const BUDGET_MIN_WAN = 0
export const BUDGET_MAX_WAN = 300
export const BUDGET_STEP_WAN = 5
export const BUDGET_DEFAULT_MIN_WAN = 30
export const BUDGET_DEFAULT_MAX_WAN = 80

export const HK_DISTRICTS = [
  { region: '港島', items: ['中西區', '灣仔', '東區', '南區'] },
  { region: '九龍', items: ['油尖旺', '深水埗', '九龍城', '黃大仙', '觀塘'] },
  {
    region: '新界',
    items: ['葵青', '荃灣', '屯門', '元朗', '北區', '大埔', '沙田', '西貢', '離島'],
  },
] as const

export type PropertyTypeId = (typeof PROPERTY_TYPES)[number]['id']
export type FurnitureChoice = 'yes' | 'no'
export type KitchenType = 'enclosed' | 'open'

export type UnitDetails = {
  budgetMinWan: number
  budgetMaxWan: number
  propertyType: PropertyTypeId | ''
  district: string
  estate: string
  block: string
  unit: string
  areaSqft: string
  rooms: number
  toilets: number
  kitchen: KitchenType | ''
  furniture: FurnitureChoice | ''
}

export const EMPTY_UNIT_DETAILS: UnitDetails = {
  budgetMinWan: BUDGET_DEFAULT_MIN_WAN,
  budgetMaxWan: BUDGET_DEFAULT_MAX_WAN,
  propertyType: '',
  district: '',
  estate: '',
  block: '',
  unit: '',
  areaSqft: '',
  rooms: 1,
  toilets: 1,
  kitchen: '',
  furniture: '',
}

export function clampBudgetWan(value: number) {
  const stepped = Math.round(value / BUDGET_STEP_WAN) * BUDGET_STEP_WAN
  return Math.min(BUDGET_MAX_WAN, Math.max(BUDGET_MIN_WAN, stepped))
}

export function formatBudgetWan(wan: number) {
  if (wan <= 0) return 'HK$ 0'
  return `HK$ ${wan}萬`
}

export function formatBudgetHkd(wan: number) {
  return `HK$ ${(wan * 10000).toLocaleString('en-HK')}`
}

export function formatBudgetRange(minWan: number, maxWan: number) {
  if (minWan === maxWan) return formatBudgetWan(minWan)
  return `${formatBudgetWan(minWan)} – ${maxWan}萬`
}

export function formatBudgetRangeHkd(minWan: number, maxWan: number) {
  if (minWan === maxWan) return formatBudgetHkd(minWan)
  return `${formatBudgetHkd(minWan)} – ${formatBudgetHkd(maxWan)}`
}
