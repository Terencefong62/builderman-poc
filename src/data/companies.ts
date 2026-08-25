export type MatchedCompany = {
  id: string
  rank: number
  name: string
  location: string
  foundedYear: number
  clientCount: number
  avgCompletionMonths: number
  hasOwnFurnitureFactory: boolean
  hasNegativeNews: boolean
  newsSourceUrl?: string
  newsHeadline?: string
  aiScore: number
  matchReason: string
}

export const TOP_MATCH_COUNT = 3
export const MORE_MATCH_COUNT = 5

/** Mock ranked matches — replace with API / AI ranking later */
export const MOCK_MATCHED_COMPANIES: MatchedCompany[] = [
  {
    id: 'atelier-living',
    rank: 1,
    name: '生活工藝裝修',
    location: '觀塘',
    foundedYear: 2012,
    clientCount: 486,
    avgCompletionMonths: 3.5,
    hasOwnFurnitureFactory: true,
    hasNegativeNews: false,
    aiScore: 9.2,
    matchReason:
      '比第2、3名風格更貼近你；同類型單位完工更穩定，AI評分亦明顯較高',
  },
  {
    id: 'harbour-home',
    rank: 2,
    name: '海港居室設計',
    location: '灣仔',
    foundedYear: 2008,
    clientCount: 712,
    avgCompletionMonths: 4,
    hasOwnFurnitureFactory: false,
    hasNegativeNews: true,
    newsHeadline: '客戶投訴工程延誤兩個月',
    newsSourceUrl: 'https://example.com/news/harbour-home-delay',
    aiScore: 8.4,
    matchReason:
      '比第3名住宅案例更豐富，預算同地區匹配度更高，整體更穩陣',
  },
  {
    id: 'northwood-studio',
    rank: 3,
    name: '北木空間',
    location: '葵涌',
    foundedYear: 2016,
    clientCount: 238,
    avgCompletionMonths: 3,
    hasOwnFurnitureFactory: true,
    hasNegativeNews: false,
    aiScore: 8.1,
    matchReason:
      '工期預測較短、未見負面新聞，係前三名入面較穩陣安全嘅選擇之一',
  },
  {
    id: 'cedar-line',
    rank: 4,
    name: '杉線家居',
    location: '沙田',
    foundedYear: 2014,
    clientCount: 320,
    avgCompletionMonths: 3.8,
    hasOwnFurnitureFactory: true,
    hasNegativeNews: false,
    aiScore: 7.9,
    matchReason: '新界住宅經驗多，預算彈性較高',
  },
  {
    id: 'form-house',
    rank: 5,
    name: '形舍裝修',
    location: '旺角',
    foundedYear: 2010,
    clientCount: 540,
    avgCompletionMonths: 4.2,
    hasOwnFurnitureFactory: false,
    hasNegativeNews: true,
    newsHeadline: '報導指個別項目物料品質爭議',
    newsSourceUrl: 'https://example.com/news/form-house-materials',
    aiScore: 7.6,
    matchReason: '市區單位改造案例多，風格覆蓋面廣',
  },
  {
    id: 'quiet-craft',
    rank: 6,
    name: '靜作設計',
    location: '火炭',
    foundedYear: 2018,
    clientCount: 156,
    avgCompletionMonths: 2.8,
    hasOwnFurnitureFactory: true,
    hasNegativeNews: false,
    aiScore: 7.4,
    matchReason: '小型團隊，溝通直接，工期預測較短',
  },
  {
    id: 'eastbay-reno',
    rank: 7,
    name: '東灣裝修',
    location: '將軍澳',
    foundedYear: 2006,
    clientCount: 890,
    avgCompletionMonths: 4.5,
    hasOwnFurnitureFactory: true,
    hasNegativeNews: false,
    aiScore: 7.2,
    matchReason: '大型屋苑翻新經驗豐富，工序成熟',
  },
  {
    id: 'lumen-space',
    rank: 8,
    name: '光域空間',
    location: '銅鑼灣',
    foundedYear: 2015,
    clientCount: 275,
    avgCompletionMonths: 3.2,
    hasOwnFurnitureFactory: false,
    hasNegativeNews: false,
    aiScore: 7.0,
    matchReason: '設計導向較強，適合追求細節嘅單位',
  },
]

export function getTopMatchedCompanies(): MatchedCompany[] {
  return MOCK_MATCHED_COMPANIES.slice(0, TOP_MATCH_COUNT)
}

export function getMoreMatchedCompanies(): MatchedCompany[] {
  return MOCK_MATCHED_COMPANIES.slice(
    TOP_MATCH_COUNT,
    TOP_MATCH_COUNT + MORE_MATCH_COUNT,
  )
}

/** Delay scales slightly with how complete the draft feels (1–2s) */
export function getMatchingDurationMs(options: {
  styleCount: number
  hasUnitArea: boolean
}): number {
  let ms = 1200
  if (options.styleCount >= 2) ms += 200
  if (options.hasUnitArea) ms += 300
  return Math.min(2000, Math.max(1000, ms))
}
