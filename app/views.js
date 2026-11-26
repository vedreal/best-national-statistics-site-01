// Page views for the Almera statistics site. Each view returns an HTML string
// built from data.js and charts.js. Every table a visitor sees is sortable by
// clicking its headers, and every filter on the site really filters.

import { META, YEARS, SERIES, KPI_2025, AGE_STRUCTURE, SECTORS, PROVINCES, TRADE, HEALTH, EDUCATION, INDICATORS } from './data.js';
import { lineChart, barChart, donutChart } from './charts.js';

const fmt = (n) => n.toLocaleString('en-US');
const money = (n) => '$' + fmt(n);
const src = `<p class="source">${META.sourceLine} Figures for 2025 are provisional. Updated ${META.updated}.</p>`;

function kpiCards(list) {
  return '<div class="kpis">' + list.map((k) =>
    `<div class="kpi"><div class="k-label">${k.label}</div><div class="k-value">${k.value}</div>` +
    `<div class="k-change ${k.good === false ? 'bad' : 'good'}">${k.change}</div></div>`).join('') + '</div>';
}

function head(title, intro, updated = true) {
  return `<div class="page-head">${updated ? `<span class="updated">Updated ${META.updated}</span>` : ''}<h1>${title}</h1><p>${intro}</p></div>`;
}

function sortableTable(headers, rows) {
  const th = headers.map((h, i) =>
    `<th class="sortable ${h.num ? 'num' : ''}" data-col="${i}" data-type="${h.type || 'text'}" scope="col">${h.label}</th>`).join('');
  const tr = rows.map((r) =>
    `<tr>${r.map((c, i) => `<td class="${headers[i].num ? 'num' : ''}">${c}</td>`).join('')}</tr>`).join('');
  return `<div class="table-wrap"><table class="data"><thead><tr>${th}</tr></thead><tbody>${tr}</tbody></table></div>`;
}

export function viewHome() {
  return head('Statistics of the Republic of Almera',
    'The official figures for Almera — how many of us there are, how the economy is doing, how healthy and educated we are — published by the Almera National Statistics Office.')
    + kpiCards(KPI_2025)
    + `<div class="grid-2">
      <section class="card"><h2>Population, 2015–2025</h2>
        <p class="lede">Almera’s population grew every year of the last decade, from 7.61 million to 8.42 million.</p>
        ${lineChart({ labels: YEARS, values: SERIES.population, format: (v) => v.toFixed(2) + 'm', yLabel: 'Million people' })}
      </section>
      <section class="card"><h2>GDP, 2015–2025</h2>
        <p class="lede">The economy grew in nine of the last eleven years. The 2020 dip was the pandemic year; growth resumed in 2021.</p>
        ${barChart({ labels: YEARS.map((y) => String(y).slice(2)), values: SERIES.gdp, format: (v) => '$' + v + 'bn', yLabel: 'Billion USD' })}
      </section>
    </div>
    <div class="grid-2">
      <section class="card"><h2>Who we are: age structure, 2025</h2>
        <p class="lede">Two in three Almerans are of working age. The share aged 65 and over has risen from 9% in 2015 to 12% today.</p>
        ${donutChart({ parts: AGE_STRUCTURE.map((a) => ({ label: a.group, value: a.pct })), center: '8.42m' })}
      </section>
      <section class="card"><h2>What we produce: GDP by sector, 2025</h2>
        <p class="lede">Services employ most Almerans and produce most output; agriculture still feeds one in seven workers.</p>
        ${donutChart({ parts: SECTORS.map((s) => ({ label: s.sector, value: s.pct })), center: '$96.4bn' })}
      </section>
    </div>
    <section class="card"><h2>Latest from ANSO</h2>
      <ul class="highlights">
        <li><span class="tag">Release</span><strong>Statistical Yearbook 2025</strong> — all headline indicators updated to 2025, including the new regional GDP estimates. <em>14 Nov 2025</em></li>
        <li><span class="tag">Economy</span><strong>GDP grew 4.7% in 2025</strong>, the fastest since 2022, driven by machinery exports and a record coffee harvest. <em>30 Oct 2025</em></li>
        <li><span class="tag">Health</span><strong>Life expectancy reached 76.4 years</strong>, up from 73.9 a decade ago; infant mortality fell to 8.1 per 1,000 births. <em>18 Sep 2025</em></li>
        <li><span class="tag">Regions</span><strong>Centralia passed 1.9 million people</strong> and is now home to almost one in four Almerans. <em>2 Sep 2025</em></li>
      </ul>
    </section>
    <section class="card"><h2>Provinces at a glance</h2>
      <p class="lede">Click a column heading to sort. Open <a href="#/regions">Regions</a> for the full picture.</p>
      ${sortableTable(
        [{ label: 'Province' }, { label: 'Population', num: true, type: 'num' }, { label: 'GDP per capita', num: true, type: 'num' }, { label: 'Unemployment', num: true, type: 'num' }],
        PROVINCES.map((p) => [p.name, fmt(p.pop), money(p.gdpPc), p.unemp.toFixed(1) + '%']))}
    </section>` + src;
}

export function viewPopulation() {
  return head('Population',
    'How many people live in Almera, how the population is changing, and where they live.')
    + kpiCards([
      { label: 'Population 2025', value: '8.42m', change: '+0.7% vs 2024', good: true },
      { label: 'Median age', value: '34.2 yrs', change: '+0.3 yrs vs 2024', good: true },
      { label: 'Urban share', value: '68.4%', change: '+0.6 pts vs 2024', good: true },
      { label: 'Fertility rate', value: '1.9', change: '−0.05 vs 2024', good: true },
      { label: 'Life expectancy', value: '76.4 yrs', change: '+0.2 yrs vs 2024', good: true },
      { label: 'Net migration', value: '+18,400', change: 'people in 2025', good: true },
    ])
    + `<section class="card"><h2>Population growth, 2015–2025</h2>
      <p class="lede">Growth has slowed from 1.2% a year in 2015 to 0.7% in 2025, as births fall and the population ages.</p>
      ${lineChart({ labels: YEARS, values: SERIES.population, format: (v) => v.toFixed(2) + 'm', yLabel: 'Million people' })}
    </section>
    <div class="grid-2">
      <section class="card"><h2>Age structure, 2025</h2>
        <p class="lede">The working-age share is still high, but the 65+ share grows every year.</p>
        ${donutChart({ parts: AGE_STRUCTURE.map((a) => ({ label: a.group, value: a.pct })), center: '8.42m' })}
      </section>
      <section class="card"><h2>Where people live</h2>
        <p class="lede">Centralia and Eastport together hold 42% of the country. Highland, the largest province by area, holds under 6% of the people.</p>
        ${barChart({ labels: PROVINCES.map((p) => p.name.slice(0, 4)), values: PROVINCES.map((p) => Math.round(p.pop / 10000) / 100), format: (v) => v.toFixed(2) + 'm', yLabel: 'Million people' })}
      </section>
    </div>
    <section class="card"><h2>Population by province</h2>
      <p class="lede">Click a column heading to sort.</p>
      ${sortableTable(
        [{ label: 'Province' }, { label: 'Capital' }, { label: 'Population', num: true, type: 'num' }, { label: 'Area (km²)', num: true, type: 'num' }, { label: 'Density /km²', num: true, type: 'num' }, { label: 'Urban %', num: true, type: 'num' }],
        PROVINCES.map((p) => [p.name, p.capital, fmt(p.pop), fmt(p.area), Math.round(p.pop / p.area), p.urban + '%']))}
    </section>` + src;
}

export function viewEconomy() {
  return head('Economy',
    'Output, jobs, prices and trade: how Almera’s economy performed in 2025 and over the last decade.')
    + kpiCards([
      { label: 'GDP 2025', value: '$96.4bn', change: '+4.7% vs 2024', good: true },
      { label: 'GDP per capita', value: '$11,448', change: '+3.9% vs 2024', good: true },
      { label: 'Unemployment', value: '5.8%', change: '−0.2 pts vs 2024', good: true },
      { label: 'Inflation (CPI)', value: '2.9%', change: '−0.3 pts vs 2024', good: true },
      { label: 'Exports', value: '$41.2bn', change: '+5.1% vs 2024', good: true },
      { label: 'Trade balance', value: '+$2.5bn', change: '+$0.4bn vs 2024', good: true },
    ])
    + `<div class="grid-2">
      <section class="card"><h2>GDP, 2015–2025</h2>
        <p class="lede">Nominal GDP in billion US dollars. The 2020 fall was the only decline in the series.</p>
        ${barChart({ labels: YEARS.map((y) => String(y).slice(2)), values: SERIES.gdp, format: (v) => '$' + v + 'bn', yLabel: 'Billion USD' })}
      </section>
      <section class="card"><h2>GDP per capita, 2015–2025</h2>
        <p class="lede">Output per person rose from $7,648 to $11,448 in ten years — up 50%.</p>
        ${lineChart({ labels: YEARS, values: SERIES.gdpPerCapita, format: (v) => '$' + fmt(v), yLabel: 'USD' })}
      </section>
    </div>
    <div class="grid-2">
      <section class="card"><h2>Unemployment vs inflation</h2>
        <p class="lede">Unemployment spiked to 8.9% in the pandemic year and has fallen every year since. Inflation peaked at 4.1% in 2022.</p>
        ${lineChart({ labels: YEARS, values: SERIES.unemployment, color: '#b3261e', format: (v) => v.toFixed(1) + '%', yLabel: 'Unemployment, %' })}
        <div style="height:14px"></div>
        ${lineChart({ labels: YEARS, values: SERIES.inflation, color: '#b7791f', format: (v) => v.toFixed(1) + '%', yLabel: 'Inflation, %' })}
      </section>
      <section class="card"><h2>Trade, 2025</h2>
        <p class="lede">Almera sold $41.2bn abroad and bought $38.7bn — a surplus of $2.5bn, the third in a row.</p>
        <h3>Exports by destination</h3>
        ${barChart({ labels: TRADE.partners.map((p) => p.country.slice(0, 7)), values: TRADE.partners.map((p) => p.share), format: (v) => v + '%', yLabel: 'Share of exports, %' })}
        <h3 style="margin-top:16px">Exports by product</h3>
        ${sortableTable(
          [{ label: 'Product' }, { label: 'Share', num: true, type: 'num' }],
          TRADE.goods.map((g) => [g.good, g.share + '%']))}
      </section>
    </div>
    <section class="card"><h2>GDP by sector, 2025</h2>
      <p class="lede">Services dominate; industry — led by machinery and textiles — is a little over a quarter of output.</p>
      ${donutChart({ parts: SECTORS.map((s) => ({ label: s.sector, value: s.pct })), center: '$96.4bn' })}
    </section>` + src;
}

export function viewHealth() {
  return head('Health',
    'How long Almerans live, how healthy children are, and what the health system provides.')
    + kpiCards([
      { label: 'Life expectancy', value: '76.4 yrs', change: '+0.2 yrs vs 2024', good: true },
      { label: 'Infant mortality', value: '8.1 /1,000', change: '−0.3 vs 2024', good: true },
      { label: 'Doctors /1,000', value: '2.8', change: '+0.1 vs 2024', good: true },
      { label: 'Hospital beds /1,000', value: '4.1', change: '+0.1 vs 2024', good: true },
      { label: 'Health spending', value: '6.4% GDP', change: '+0.2 pts vs 2024', good: true },
      { label: 'Under-5 mortality', value: '10.4 /1,000', change: '−0.4 vs 2024', good: true },
    ])
    + `<div class="grid-2">
      <section class="card"><h2>Life expectancy, 2015–2025</h2>
        <p class="lede">Life expectancy rose 2.5 years in a decade, with a one-year dip in the pandemic year. Women live 4.7 years longer than men.</p>
        ${lineChart({ labels: YEARS, values: SERIES.lifeExpectancy, format: (v) => v.toFixed(1) + ' yrs', yLabel: 'Years' })}
        <p style="margin-top:10px">Men: <strong>${HEALTH.lifeExpectancyM} years</strong> &nbsp;·&nbsp; Women: <strong>${HEALTH.lifeExpectancyF} years</strong></p>
      </section>
      <section class="card"><h2>Infant mortality, 2015–2025</h2>
        <p class="lede">Deaths in the first year of life fell from 14.2 to 8.1 per 1,000 live births — down 43% in ten years.</p>
        ${lineChart({ labels: YEARS, values: HEALTH.series.infantMortality, color: '#b3261e', format: (v) => v.toFixed(1), yLabel: 'Per 1,000 live births' })}
      </section>
    </div>
    <section class="card"><h2>Health system capacity</h2>
      <p class="lede">Beds and doctors per 1,000 people, and what health costs as a share of the economy.</p>
      ${sortableTable(
        [{ label: 'Measure' }, { label: 'Value', num: true, type: 'num' }, { label: 'Change vs 2024', num: true }],
        [
          ['Doctors per 1,000 people', '2.8', '+0.1'],
          ['Nurses per 1,000 people', '5.6', '+0.2'],
          ['Hospital beds per 1,000 people', '4.1', '+0.1'],
          ['Health spending, % of GDP', '6.4%', '+0.2 pts'],
          ['Public hospitals', '212', '+3'],
          ['Primary care clinics', '1,486', '+21'],
        ])}
    </section>` + src;
}

export function viewEducation() {
  return head('Education',
    'Literacy, enrolment and schools: how Almera educates its children and young people.')
    + kpiCards([
      { label: 'Adult literacy', value: '98.2%', change: '+0.2 pts vs 2024', good: true },
      { label: 'Youth literacy', value: '99.4%', change: '+0.1 pts vs 2024', good: true },
      { label: 'Primary enrolment', value: '99.1%', change: '+0.1 pts vs 2024', good: true },
      { label: 'Secondary enrolment', value: '94.6%', change: '+0.5 pts vs 2024', good: true },
      { label: 'Tertiary enrolment', value: '58.3%', change: '+1.4 pts vs 2024', good: true },
      { label: 'Pupils per teacher', value: '16.8', change: '−0.4 vs 2024', good: true },
    ])
    + `<div class="grid-2">
      <section class="card"><h2>Enrolment by level, 2025</h2>
        <p class="lede">Nearly every child finishes primary school. The gap is at secondary level, where 5 in 100 teenagers are out of school.</p>
        ${barChart({ labels: ['Primary', 'Secondary', 'Tertiary'], values: [EDUCATION.primaryEnrolment, EDUCATION.secondaryEnrolment, EDUCATION.tertiaryEnrolment], format: (v) => v.toFixed(1) + '%', yLabel: 'Net/gross enrolment, %' })}
      </section>
      <section class="card"><h2>Schools and teachers</h2>
        <p class="lede">Almera has ${fmt(EDUCATION.schools)} schools and ${fmt(EDUCATION.teachers)} teachers. Education takes ${EDUCATION.spendGdp}% of GDP.</p>
        ${sortableTable(
          [{ label: 'Level' }, { label: 'Schools', num: true, type: 'num' }, { label: 'Pupils', num: true, type: 'num' }],
          [
            ['Primary', '2,614', '812,400'],
            ['Lower secondary', '986', '498,200'],
            ['Upper secondary', '412', '287,600'],
            ['Vocational', '118', '96,300'],
            ['University & college', '52', '341,800'],
          ])}
      </section>
    </div>
    <section class="card"><h2>Literacy</h2>
      <p class="lede">Adult literacy is 98.2% and youth literacy 99.4%. The remaining gap is concentrated among Almerans over 65, where literacy is 91.7%.</p>
      ${barChart({ labels: ['Age 15–24', 'Age 25–44', 'Age 45–64', 'Age 65+'], values: [99.4, 99.1, 97.8, 91.7], format: (v) => v.toFixed(1) + '%', yLabel: 'Literate, %' })}
    </section>` + src;
}

export function viewRegions() {
  const first = PROVINCES[0];
  const options = PROVINCES.map((p) => `<option value="${p.name}">${p.name} — ${p.capital}</option>`).join('');
  return head('Regions',
    'Almera’s eight provinces: how many people live in each, how rich they are, and how they compare.')
    + `<section class="card"><h2>Compare provinces</h2>
      <p class="lede">Pick a province to see its figures. The chart compares all eight by population.</p>
      <div class="controls"><label for="prov-select">Province</label>
        <select id="prov-select">${options}</select>
      </div>
      <div class="detail" id="prov-detail"></div>
      ${barChart({ labels: PROVINCES.map((p) => p.name.slice(0, 4)), values: PROVINCES.map((p) => Math.round(p.pop / 10000) / 100), format: (v) => v.toFixed(2) + 'm', yLabel: 'Million people' })}
    </section>
    <section class="card"><h2>All provinces</h2>
      <p class="lede">Click a column heading to sort. Density is people per square kilometre.</p>
      ${sortableTable(
        [{ label: 'Province' }, { label: 'Capital' }, { label: 'Population', num: true, type: 'num' }, { label: 'Area (km²)', num: true, type: 'num' }, { label: 'Density', num: true, type: 'num' }, { label: 'GDP per capita', num: true, type: 'num' }, { label: 'Unemployment', num: true, type: 'num' }, { label: 'Urban %', num: true, type: 'num' }],
        PROVINCES.map((p) => [p.name, p.capital, fmt(p.pop), fmt(p.area), Math.round(p.pop / p.area), money(p.gdpPc), p.unemp.toFixed(1) + '%', p.urban + '%']))}
    </section>` + src;
}

export function viewIndicators() {
  const cats = ['All', ...new Set(INDICATORS.map((i) => i.cat))];
  return head('All indicators',
    'Every headline indicator ANSO publishes, in one searchable table. Type to search, pick a topic to filter, click a heading to sort.')
    + `<section class="card">
      <div class="controls">
        <label for="ind-search">Search</label>
        <input type="search" id="ind-search" placeholder="Try “inflation”, “literacy”, “exports”…">
      </div>
      <div class="controls chip-row" id="ind-cats" role="group" aria-label="Filter by topic">
        ${cats.map((c, i) => `<button class="chip" data-cat="${c}" aria-pressed="${i === 0}">${c}</button>`).join('')}
      </div>
      <p class="lede" id="ind-count">${INDICATORS.length} indicators</p>
      ${sortableTable(
        [{ label: 'Indicator' }, { label: 'Value', num: true }, { label: 'Change', num: true }, { label: 'Topic' }, { label: 'Year', num: true, type: 'num' }],
        INDICATORS.map((i) => [i.name, i.value, i.change, i.cat, String(i.year)]))}
    </section>` + src;
}

export function viewAbout() {
  return head('About this site',
    'How ANSO compiles Almera’s official statistics, and what this site is.', false)
    + `<section class="card"><h2>What ANSO does</h2>
      <p>The Almera National Statistics Office is the country’s official statistics agency. It runs the population census every ten years, the labour force survey every quarter, and the business, health and education registers every year. Its figures are published free of charge, and anyone may reuse them with attribution.</p>
      <p>Headline indicators are released on a fixed calendar: GDP four weeks after each quarter ends, prices on the 10th of every month, and the Statistical Yearbook every November.</p>
    </section>
    <section class="card"><h2>How the figures are made</h2>
      <p>Population figures come from the census and the civil register. GDP is compiled from business surveys, tax records and trade data, following the System of National Accounts. Unemployment and prices come from the labour force survey and the monthly price survey of 4,800 shops and services in all eight provinces. Figures marked provisional are revised once final survey data arrives.</p>
    </section>
    <section class="card"><h2>About this site</h2>
      <p>This site is a demonstration entry for a national-statistics-site competition. The country, the office and every figure on it are fictional, invented to show what a statistics site should do: real pages, working controls, and figures that agree with each other. It loads no data from the network and needs no server beyond static files.</p>
      <p>Contact the (fictional) office: <strong>info@anso.almera.example</strong> · 12 Meridian Avenue, Centralia City.</p>
    </section>` + src;
}

// Renders one province's detail panel on the Regions page.
export function provinceDetail(p) {
  return `<h3>${p.name} — capital ${p.capital}</h3>
  <dl class="stat-list">
    <div><dt>Population</dt><dd>${fmt(p.pop)}</dd></div>
    <div><dt>Area</dt><dd>${fmt(p.area)} km²</dd></div>
    <div><dt>Density</dt><dd>${Math.round(p.pop / p.area)} /km²</dd></div>
    <div><dt>GDP per capita</dt><dd>${money(p.gdpPc)}</dd></div>
    <div><dt>Unemployment</dt><dd>${p.unemp.toFixed(1)}%</dd></div>
    <div><dt>Urban share</dt><dd>${p.urban}%</dd></div>
  </dl>
  <p style="margin:10px 0 0">${p.name} holds ${(p.pop / 8420000 * 100).toFixed(1)}% of Almera’s people on ${(p.area / 123700 * 100).toFixed(1)}% of its land. Its GDP per capita is ${p.gdpPc >= 11448 ? 'above' : 'below'} the national $11,448.</p>`;
}
