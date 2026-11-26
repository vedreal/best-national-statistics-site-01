// Republic of Almera — National Statistics Office site: hand-in program.
// Node 22, standard library only. It takes the finished site in app/ and the
// screenshots in screenshots/ from beside this file, copies them into the
// grader's output directory, and writes dossier.json there with the vendored
// make.fun library (vendor/makefun-frontend.ts, untouched). The dossier is the
// summary the judge reads: the screenshots, the first load's files and bytes,
// and the site's source. Run outside the grader with:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { cpSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

// Where this program lives (the repository root) and where the hand-in goes.
const repoRoot = fileURLToPath(new URL('.', import.meta.url));
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const appSource = join(repoRoot, 'app');
const shotsSource = join(repoRoot, 'screenshots');
const appTarget = join(outputDir, 'app');
const shotsTarget = join(outputDir, 'screenshots');

// The site itself: copy every static file, then the screenshots beside it.
// (The dossier is written by the second half of this file, below.)
mkdirSync(outputDir, { recursive: true });
cpSync(appSource, appTarget, { recursive: true });
mkdirSync(shotsTarget, { recursive: true });
if (existsSync(shotsSource)) {
  cpSync(shotsSource, shotsTarget, { recursive: true });
}

// The dossier: the summary the judge reads. buildDossier scans the copied
// app/ and screenshots/ and refuses anything over its caps (at most 4
// screenshots, each at most 256 KiB; app/ at most 993 files and 16 MiB of
// files). The scorer requires dossier.json to be byte for byte what its own
// copy of buildDossier writes, so the options below are the kit's own caps.
writeFileSync(
  join(outputDir, 'dossier.json'),
  buildDossier(outputDir, { text_max_bytes: 163840, screenshots: { max: 4, max_bytes: 262144 }, app_max_files: 993, app_max_bytes: 16777216 }),
);

console.log(`Almera statistics site handed in to ${outputDir}`);
