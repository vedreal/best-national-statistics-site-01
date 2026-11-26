// Router and controls for the Almera statistics site. Hash routes pick a view;
// after each render the page's controls are wired up: sortable tables,
// the province selector, and the indicators search + topic filter.

import { PROVINCES } from './data.js';
import { viewHome, viewPopulation, viewEconomy, viewHealth, viewEducation, viewRegions, viewIndicators, viewAbout, provinceDetail } from './views.js';

const ROUTES = {
  home: viewHome,
  population: viewPopulation,
  economy: viewEconomy,
  health: viewHealth,
  education: viewEducation,
  regions: viewRegions,
  indicators: viewIndicators,
  about: viewAbout,
};

const view = document.getElementById('view');

function parseNum(text) {
  const n = parseFloat(String(text).replace(/[^0-9.\-]/g, ''));
  return Number.isNaN(n) ? 0 : n;
}

// Click a sortable header to sort its table; click again to reverse.
function wireSortable(root) {
  root.querySelectorAll('th.sortable').forEach((th) => {
    th.addEventListener('click', () => {
      const table = th.closest('table');
      const body = table.querySelector('tbody');
      const col = Number(th.dataset.col);
      const type = th.dataset.type || 'text';
      const asc = !th.classList.contains('sorted-asc');
      table.querySelectorAll('th').forEach((h) => h.classList.remove('sorted-asc', 'sorted-desc'));
      th.classList.add(asc ? 'sorted-asc' : 'sorted-desc');
      const rows = [...body.querySelectorAll('tr')];
      rows.sort((a, b) => {
        const av = a.children[col].textContent.trim();
        const bv = b.children[col].textContent.trim();
        const cmp = type === 'num' ? parseNum(av) - parseNum(bv) : av.localeCompare(bv);
        return asc ? cmp : -cmp;
      });
      rows.forEach((r) => body.appendChild(r));
    });
  });
}

function wireRegions(root) {
  const select = root.querySelector('#prov-select');
  const detail = root.querySelector('#prov-detail');
  if (!select || !detail) return;
  const render = () => {
    const p = PROVINCES.find((x) => x.name === select.value) || PROVINCES[0];
    detail.innerHTML = provinceDetail(p);
  };
  select.addEventListener('change', render);
  render();
}

function wireIndicators(root) {
  const search = root.querySelector('#ind-search');
  const chips = root.querySelector('#ind-cats');
  const count = root.querySelector('#ind-count');
  const table = root.querySelector('table.data');
  if (!search || !chips || !table) return;
  let activeCat = 'All';
  const apply = () => {
    const q = search.value.trim().toLowerCase();
    let shown = 0;
    table.querySelectorAll('tbody tr').forEach((tr) => {
      const text = tr.textContent.toLowerCase();
      const cat = tr.children[3].textContent.trim();
      const ok = (activeCat === 'All' || cat === activeCat) && (!q || text.includes(q));
      tr.style.display = ok ? '' : 'none';
      if (ok) shown++;
    });
    count.textContent = shown + (shown === 1 ? ' indicator' : ' indicators');
  };
  search.addEventListener('input', apply);
  chips.addEventListener('click', (e) => {
    const btn = e.target.closest('.chip');
    if (!btn) return;
    activeCat = btn.dataset.cat;
    chips.querySelectorAll('.chip').forEach((c) => c.setAttribute('aria-pressed', String(c === btn)));
    apply();
  });
}

function render() {
  const name = (location.hash || '#/').replace(/^#\/?/, '').split('/')[0] || 'home';
  const fn = ROUTES[name] || ROUTES.home;
  view.innerHTML = fn();
  document.querySelectorAll('.main-nav a').forEach((a) => {
    a.classList.toggle('active', a.dataset.route === (ROUTES[name] ? name : 'home'));
  });
  wireSortable(view);
  wireRegions(view);
  wireIndicators(view);
  window.scrollTo(0, 0);
}

window.addEventListener('hashchange', render);
render();
