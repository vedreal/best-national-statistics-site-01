// Tiny SVG chart helpers for the Almera statistics site. No libraries: every
// chart is built as an SVG string from plain arrays, so the site stays fully
// offline and the first load stays small.

const NAVY = '#12324f';
const TEAL = '#0e7490';
const GOLD = '#b7791f';
const GRID = '#d9e1e8';
const MUTED = '#5b6b7a';

function niceMax(v) {
  const p = Math.pow(10, Math.floor(Math.log10(v)));
  const n = v / p;
  const m = n <= 1 ? 1 : n <= 2 ? 2 : n <= 2.5 ? 2.5 : n <= 5 ? 5 : 10;
  return m * p;
}

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// Line chart with dots, gridlines and value labels on the first/last points.
export function lineChart({ labels, values, height = 260, color = TEAL, format = (v) => String(v), yLabel = '' }) {
  const W = 640, H = height, PL = 52, PR = 14, PT = 14, PB = 30;
  const max = niceMax(Math.max(...values) * 1.05);
  const min = Math.min(0, Math.min(...values) * 0.95);
  const x = (i) => PL + (i * (W - PL - PR)) / (labels.length - 1);
  const y = (v) => PT + (1 - (v - min) / (max - min)) * (H - PT - PB);
  let grid = '';
  for (let t = 0; t <= 4; t++) {
    const v = min + ((max - min) * t) / 4;
    const gy = y(v);
    grid += `<line x1="${PL}" y1="${gy}" x2="${W - PR}" y2="${gy}" stroke="${GRID}" stroke-width="1"/>` +
      `<text x="${PL - 8}" y="${gy + 4}" text-anchor="end" font-size="11" fill="${MUTED}">${esc(format(Math.round(v * 10) / 10))}</text>`;
  }
  const pts = values.map((v, i) => `${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ');
  const dots = values.map((v, i) =>
    `<circle cx="${x(i)}" cy="${y(v)}" r="3.5" fill="${color}" stroke="#fff" stroke-width="1.5"/>`).join('');
  const xlabels = labels.map((l, i) =>
    (i % 2 === 0 || i === labels.length - 1)
      ? `<text x="${x(i)}" y="${H - 8}" text-anchor="middle" font-size="11" fill="${MUTED}">${esc(l)}</text>` : '').join('');
  const first = `<text x="${x(0)}" y="${y(values[0]) - 10}" text-anchor="middle" font-size="12" font-weight="700" fill="${NAVY}">${esc(format(values[0]))}</text>`;
  const last = `<text x="${x(values.length - 1)}" y="${y(values[values.length - 1]) - 10}" text-anchor="middle" font-size="12" font-weight="700" fill="${NAVY}">${esc(format(values[values.length - 1]))}</text>`;
  const title = yLabel ? `<text x="${PL}" y="12" font-size="12" font-weight="700" fill="${NAVY}">${esc(yLabel)}</text>` : '';
  return `<svg class="chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="Line chart">${title}${grid}` +
    `<polyline points="${pts}" fill="none" stroke="${color}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>${dots}${first}${last}${xlabels}</svg>`;
}

// Vertical bar chart with a value label on every bar.
export function barChart({ labels, values, height = 260, color = TEAL, format = (v) => String(v), yLabel = '' }) {
  const W = 640, H = height, PL = 52, PR = 14, PT = 24, PB = 30;
  const max = niceMax(Math.max(...values) * 1.08);
  const slot = (W - PL - PR) / values.length;
  const bw = Math.min(52, slot * 0.62);
  const y = (v) => PT + (1 - v / max) * (H - PT - PB);
  let grid = '';
  for (let t = 0; t <= 4; t++) {
    const v = (max * t) / 4;
    const gy = y(v);
    grid += `<line x1="${PL}" y1="${gy}" x2="${W - PR}" y2="${gy}" stroke="${GRID}" stroke-width="1"/>` +
      `<text x="${PL - 8}" y="${gy + 4}" text-anchor="end" font-size="11" fill="${MUTED}">${esc(format(Math.round(v * 10) / 10))}</text>`;
  }
  const bars = values.map((v, i) => {
    const cx = PL + slot * i + slot / 2;
    return `<rect x="${(cx - bw / 2).toFixed(1)}" y="${y(v).toFixed(1)}" width="${bw}" height="${(H - PB - y(v)).toFixed(1)}" rx="3" fill="${color}"/>` +
      `<text x="${cx}" y="${(y(v) - 6).toFixed(1)}" text-anchor="middle" font-size="11.5" font-weight="700" fill="${NAVY}">${esc(format(v))}</text>` +
      `<text x="${cx}" y="${H - 8}" text-anchor="middle" font-size="11" fill="${MUTED}">${esc(labels[i])}</text>`;
  }).join('');
  const title = yLabel ? `<text x="${PL}" y="12" font-size="12" font-weight="700" fill="${NAVY}">${esc(yLabel)}</text>` : '';
  return `<svg class="chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="Bar chart">${title}${grid}${bars}</svg>`;
}

// Donut chart with a centre total and a legend underneath.
export function donutChart({ parts, center = '', colors = [TEAL, NAVY, GOLD, '#5b8c5a', '#7c5cbf', '#c2571b'] }) {
  const R = 84, IR = 54, CX = 110, CY = 110;
  const total = parts.reduce((a, p) => a + p.value, 0);
  let offset = 0;
  let arcs = '';
  parts.forEach((p, i) => {
    const frac = p.value / total;
    const a0 = offset * 2 * Math.PI - Math.PI / 2;
    const a1 = (offset + frac) * 2 * Math.PI - Math.PI / 2;
    offset += frac;
    const large = frac > 0.5 ? 1 : 0;
    const x0 = CX + R * Math.cos(a0), y0 = CY + R * Math.sin(a0);
    const x1 = CX + R * Math.cos(a1), y1 = CY + R * Math.sin(a1);
    const xi1 = CX + IR * Math.cos(a1), yi1 = CY + IR * Math.sin(a1);
    const xi0 = CX + IR * Math.cos(a0), yi0 = CY + IR * Math.sin(a0);
    const c = colors[i % colors.length];
    arcs += `<path d="M ${x0.toFixed(1)} ${y0.toFixed(1)} A ${R} ${R} 0 ${large} 1 ${x1.toFixed(1)} ${y1.toFixed(1)} L ${xi1.toFixed(1)} ${yi1.toFixed(1)} A ${IR} ${IR} 0 ${large} 0 ${xi0.toFixed(1)} ${yi0.toFixed(1)} Z" fill="${c}"/>`;
  });
  const legend = parts.map((p, i) =>
    `<div><span class="sw" style="background:${colors[i % colors.length]}"></span>${esc(p.label)} — <strong>${p.value}%</strong></div>`).join('');
  return `<div style="display:flex;flex-wrap:wrap;align-items:center;gap:8px 24px">
    <svg viewBox="0 0 220 220" width="180" height="180" role="img" aria-label="Donut chart">${arcs}
    <text x="${CX}" y="${CY - 4}" text-anchor="middle" font-size="22" font-weight="700" fill="${NAVY}">${esc(center)}</text>
    <text x="${CX}" y="${CY + 16}" text-anchor="middle" font-size="11" fill="${MUTED}">of total</text></svg>
    <div class="legend" style="margin-top:0">${legend}</div></div>`;
}
