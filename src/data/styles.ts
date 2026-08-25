export type RenovationStyle = {
  id: string
  name: string
  tagline: string
  image: string
  layout: 'portrait' | 'square' | 'wide' | 'feature'
}

const styleImage = (filename: string) =>
  `${import.meta.env.BASE_URL}styles/${filename}`

export const RENOVATION_STYLES: RenovationStyle[] = [
  {
    id: 'modern-minimal',
    name: '現代簡約風',
    tagline: '留白、乾淨線條',
    image: styleImage('modern-minimal.jpg'),
    layout: 'feature',
  },
  {
    id: 'scandinavian',
    name: '北歐風',
    tagline: '明亮、溫暖木調',
    image: styleImage('scandinavian.jpg'),
    layout: 'portrait',
  },
  {
    id: 'japanese',
    name: '日式風',
    tagline: '靜謐、自然材質',
    image: styleImage('japanese.jpg'),
    layout: 'square',
  },
  {
    id: 'contemporary',
    name: '現代風',
    tagline: '俐落、當代感',
    image: styleImage('contemporary.jpg'),
    layout: 'wide',
  },
  {
    id: 'wabisabi',
    name: '侘寂風',
    tagline: '質感、不完美之美',
    image: styleImage('wabisabi.jpg'),
    layout: 'portrait',
  },
  {
    id: 'industrial',
    name: '工業風',
    tagline: '粗獷、金屬質感',
    image: styleImage('industrial.jpg'),
    layout: 'portrait',
  },
  {
    id: 'eclectic',
    name: '混搭風',
    tagline: '自由、個性層次',
    image: styleImage('eclectic.jpg'),
    layout: 'square',
  },
  {
    id: 'french',
    name: '法式風',
    tagline: '優雅、柔美線條',
    image: styleImage('french.jpg'),
    layout: 'feature',
  },
  {
    id: 'midcentury',
    name: '中古風',
    tagline: '復古、經典比例',
    image: styleImage('midcentury.jpg'),
    layout: 'wide',
  },
  {
    id: 'cream',
    name: '奶油風',
    tagline: '柔和、溫潤米色',
    image: styleImage('cream.jpg'),
    layout: 'portrait',
  },
  {
    id: 'british',
    name: '英倫風',
    tagline: '經典、沉穩氣質',
    image: styleImage('british.jpg'),
    layout: 'square',
  },
  {
    id: 'southeast-asian',
    name: '東南亞風',
    tagline: '藤編、熱帶質感',
    image: styleImage('southeast-asian.jpg'),
    layout: 'portrait',
  },
]

export const MATCH_STEPS = [
  { id: 'styles', label: '風格喜好' },
  { id: 'unit', label: '單位資料' },
  { id: 'contact', label: '聯絡資料' },
  { id: 'results', label: '智能配對' },
] as const
