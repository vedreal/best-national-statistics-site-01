// Data for the Republic of Almera — a fictional country. Every figure below is
// invented for this site and kept internally consistent across pages: province
// populations sum to the national total, GDP divided by population gives the
// GDP per capita shown, and every series shares the same years.
// Publisher: Almera National Statistics Office (ANSO), Statistical Yearbook 2025.

export const META = {
  country: 'Republic of Almera',
  office: 'Almera National Statistics Office',
  officeShort: 'ANSO',
  capital: 'Centralia City',
  currency: 'Almeran dala (ALD)',
  currencyCode: 'ALD',
  updated: '14 November 2025',
  sourceLine: 'Source: Almera National Statistics Office, Statistical Yearbook 2025.',
};

export const YEARS = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025];

// National series, 2015–2025. Population in millions, GDP in billion USD.
export const SERIES = {
  population: [7.61, 7.70, 7.79, 7.88, 7.97, 8.05, 8.13, 8.21, 8.29, 8.36, 8.42],
  gdp: [58.2, 61.5, 64.8, 68.1, 71.4, 69.8, 76.3, 83.7, 88.9, 92.1, 96.4],
  gdpPerCapita: [7648, 7987, 8318, 8642, 8959, 8671, 9385, 10195, 10724, 11017, 11448],
  unemployment: [7.4, 7.1, 6.8, 6.4, 6.1, 8.9, 7.6, 6.9, 6.3, 6.0, 5.8],
  inflation: [3.1, 2.8, 2.6, 2.4, 2.2, 1.8, 3.4, 4.1, 3.6, 3.2, 2.9],
  lifeExpectancy: [73.9, 74.2, 74.5, 74.8, 75.1, 74.6, 75.3, 75.7, 76.0, 76.2, 76.4],
};

export const KPI_2025 = [
  { label: 'Population', value: '8.42m', change: '+0.7% vs 2024', good: true },
  { label: 'GDP', value: '$96.4bn', change: '+4.7% vs 2024', good: true },
  { label: 'GDP per capita', value: '$11,448', change: '+3.9% vs 2024', good: true },
  { label: 'Unemployment', value: '5.8%', change: '−0.2 pts vs 2024', good: true },
  { label: 'Inflation (CPI)', value: '2.9%', change: '−0.3 pts vs 2024', good: true },
  { label: 'Life expectancy', value: '76.4 yrs', change: '+0.2 yrs vs 2024', good: true },
];

// Age structure 2025 (percent of population).
export const AGE_STRUCTURE = [
  { group: '0–14 years', pct: 21 },
  { group: '15–64 years', pct: 67 },
  { group: '65+ years', pct: 12 },
];

// GDP by sector 2025 (percent of GDP).
export const SECTORS = [
  { sector: 'Services', pct: 58 },
  { sector: 'Industry', pct: 27 },
  { sector: 'Agriculture', pct: 15 },
];

// Provinces. Populations sum to 8,420,000. Areas in km².
export const PROVINCES = [
  { name: 'Centralia', capital: 'Centralia City', pop: 1980000, area: 12400, gdpPc: 16800, unemp: 4.9, urban: 91 },
  { name: 'Eastport', capital: 'Port Ellery', pop: 1640000, area: 9800, gdpPc: 13200, unemp: 5.4, urban: 84 },
  { name: 'Northvale', capital: 'Northton', pop: 1120000, area: 18600, gdpPc: 10900, unemp: 5.9, urban: 62 },
  { name: 'Southridge', capital: 'Millford', pop: 980000, area: 15200, gdpPc: 9800, unemp: 6.1, urban: 58 },
  { name: 'Westfield', capital: 'Dunmere', pop: 860000, area: 21400, gdpPc: 9100, unemp: 6.4, urban: 51 },
  { name: 'Coastline', capital: 'Salthaven', pop: 740000, area: 7600, gdpPc: 12400, unemp: 5.2, urban: 78 },
  { name: 'Lakeside', capital: 'Briar Lake', pop: 620000, area: 13900, gdpPc: 8400, unemp: 6.8, urban: 47 },
  { name: 'Highland', capital: 'Kestrel', pop: 480000, area: 24800, gdpPc: 7200, unemp: 7.3, urban: 38 },
];

// Trade 2025 (billion USD).
export const TRADE = {
  exports: 41.2,
  imports: 38.7,
  balance: 2.5,
  partners: [
    { country: 'Meridia', share: 24 },
    { country: 'Ostara', share: 18 },
    { country: 'Kavaria', share: 13 },
    { country: 'Solenne', share: 9 },
    { country: 'Other', share: 36 },
  ],
  goods: [
    { good: 'Machinery & equipment', share: 26 },
    { good: 'Textiles & apparel', share: 19 },
    { good: 'Coffee & spices', share: 14 },
    { good: 'Copper & minerals', share: 12 },
    { good: 'Processed food', share: 11 },
    { good: 'Other goods', share: 18 },
  ],
};

// Health indicators.
export const HEALTH = {
  lifeExpectancy: 76.4,
  lifeExpectancyM: 74.1,
  lifeExpectancyF: 78.8,
  infantMortality: 8.1, // per 1,000 live births
  underFiveMortality: 10.4,
  doctorsPer1000: 2.8,
  bedsPer1000: 4.1,
  healthSpendGdp: 6.4,
  series: {
    infantMortality: [14.2, 13.5, 12.8, 12.1, 11.4, 10.9, 10.1, 9.4, 8.8, 8.4, 8.1],
  },
};

// Education indicators.
export const EDUCATION = {
  literacy: 98.2,
  literacyYouth: 99.4,
  primaryEnrolment: 99.1,
  secondaryEnrolment: 94.6,
  tertiaryEnrolment: 58.3,
  schools: 4182,
  teachers: 96400,
  pupilsPerTeacher: 16.8,
  spendGdp: 4.8,
};

// Every indicator, for the searchable table. Change is vs the previous year.
export const INDICATORS = [
  { name: 'Population', value: '8.42 million', change: '+0.7%', year: 2025, cat: 'Population' },
  { name: 'Population growth rate', value: '0.7% per year', change: '−0.1 pts', year: 2025, cat: 'Population' },
  { name: 'Median age', value: '34.2 years', change: '+0.3 yrs', year: 2025, cat: 'Population' },
  { name: 'Urban population share', value: '68.4%', change: '+0.6 pts', year: 2025, cat: 'Population' },
  { name: 'Fertility rate', value: '1.9 children per woman', change: '−0.05', year: 2025, cat: 'Population' },
  { name: 'GDP (nominal)', value: '$96.4 billion', change: '+4.7%', year: 2025, cat: 'Economy' },
  { name: 'GDP per capita', value: '$11,448', change: '+3.9%', year: 2025, cat: 'Economy' },
  { name: 'GDP growth (real)', value: '4.7%', change: '+0.4 pts', year: 2025, cat: 'Economy' },
  { name: 'Unemployment rate', value: '5.8%', change: '−0.2 pts', year: 2025, cat: 'Economy' },
  { name: 'Inflation (CPI, annual)', value: '2.9%', change: '−0.3 pts', year: 2025, cat: 'Economy' },
  { name: 'Exports of goods', value: '$41.2 billion', change: '+5.1%', year: 2025, cat: 'Economy' },
  { name: 'Imports of goods', value: '$38.7 billion', change: '+4.2%', year: 2025, cat: 'Economy' },
  { name: 'Trade balance', value: '+$2.5 billion', change: '+$0.4bn', year: 2025, cat: 'Economy' },
  { name: 'Government debt (% of GDP)', value: '41.6%', change: '−1.2 pts', year: 2025, cat: 'Economy' },
  { name: 'Life expectancy at birth', value: '76.4 years', change: '+0.2 yrs', year: 2025, cat: 'Health' },
  { name: 'Infant mortality rate', value: '8.1 per 1,000', change: '−0.3', year: 2025, cat: 'Health' },
  { name: 'Doctors per 1,000 people', value: '2.8', change: '+0.1', year: 2025, cat: 'Health' },
  { name: 'Hospital beds per 1,000 people', value: '4.1', change: '+0.1', year: 2025, cat: 'Health' },
  { name: 'Health spending (% of GDP)', value: '6.4%', change: '+0.2 pts', year: 2025, cat: 'Health' },
  { name: 'Adult literacy rate', value: '98.2%', change: '+0.2 pts', year: 2025, cat: 'Education' },
  { name: 'Primary enrolment (net)', value: '99.1%', change: '+0.1 pts', year: 2025, cat: 'Education' },
  { name: 'Secondary enrolment (net)', value: '94.6%', change: '+0.5 pts', year: 2025, cat: 'Education' },
  { name: 'Tertiary enrolment (gross)', value: '58.3%', change: '+1.4 pts', year: 2025, cat: 'Education' },
  { name: 'Pupils per teacher (primary)', value: '16.8', change: '−0.4', year: 2025, cat: 'Education' },
  { name: 'Education spending (% of GDP)', value: '4.8%', change: '0.0 pts', year: 2025, cat: 'Education' },
];
