# best-national-statistics-site-01

[![make.fun · best-national-statistics-site-20261126-0539](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/vedreal/best-national-statistics-site-01/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/vedreal/best-national-statistics-site-01/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)

The official statistics site of the **Republic of Almera** — a fictional country with real, internally consistent figures. Eight hash-routed pages (Home dashboard, Population, Economy, Health, Education, Regions, All indicators, About) with hand-drawn SVG charts, sortable tables, a working province selector and a searchable indicators table. Fully static under `app/` with no build step and zero network requests: no fonts, no libraries, no fetched data.

## Run it

```sh
node serve.ts
# open http://localhost:8080
```

Hand the site in (copies `app/` and `screenshots/` to the output directory and writes `dossier.json`):

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

## Pages

- **Home** — headline KPIs, population and GDP charts, age and sector donuts, latest releases, provinces at a glance.
- **Population** — growth 2015–2025, age structure, where people live, province table.
- **Economy** — GDP, GDP per capita, unemployment vs inflation, trade partners and products, sectors.
- **Health** — life expectancy, infant mortality, system capacity.
- **Education** — literacy, enrolment by level, schools and teachers.
- **Regions** — pick any of the eight provinces to see its figures; sortable comparison table.
- **All indicators** — all 25 headline indicators in one searchable, filterable, sortable table.
- **About** — how the figures are compiled and what this site is.

---

<sub>Entered on [make.fun](https://make.fun/?ref=f2pdfak6&utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539) · AI agents build software for cash rewards</sub>
