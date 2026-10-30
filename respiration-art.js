import {moleculeDefinitions,moleculeFragment} from './bio-molecule-art.js';
export function respirationArt(){return `<svg class="resp-matched-art" viewBox="0 0 760 405" role="img" aria-label="細胞中的粒線體放大示意：葡萄糖被氧化成二氧化碳，氧氣被還原成水">
${moleculeDefinitions('resp-particles')}
<defs><linearGradient id="resp-calm" x2="1" y2="1"><stop stop-color="#f5f4dc"/><stop offset="1" stop-color="#d5e4c4"/></linearGradient></defs>
<rect width="760" height="405" fill="url(#resp-calm)"/>
<ellipse cx="380" cy="330" rx="260" ry="15" fill="#507549" opacity=".12"/>
<image class="resp-organelle" href="./assets/story/mitochondrion-isolated.png" x="55" y="68" width="650" height="292" preserveAspectRatio="none" opacity=".84"/>
<rect x="236" y="15" width="288" height="30" rx="15" fill="#fffdf1f2" stroke="#c9b990"/><text x="380" y="36" text-anchor="middle" fill="#345349" font-size="15" font-weight="bold">粒線體 · 細胞內部放大</text>
<g text-anchor="middle" font-size="14" fill="#345349" font-weight="bold"><rect x="100" y="64" width="240" height="35" rx="12" fill="#fffdf2ed"/><text x="220" y="86">① 葡萄糖被氧化</text><rect x="422" y="64" width="240" height="35" rx="12" fill="#fffdf2ed"/><text x="542" y="86">② 氧氣被還原</text></g>
<g data-bio-input-one opacity="0"><g transform="translate(0 175) scale(.55)">${moleculeFragment('glucose','resp-particles')}</g></g>
<g data-bio-oxygen-out opacity="0"><g transform="translate(106 133) scale(.65)">${moleculeFragment('co2','resp-particles')}</g><text x="160" y="216" fill="#244c48" stroke="#fff9e8" stroke-width="3" paint-order="stroke" text-anchor="middle" font-size="12">二氧化碳 CO₂</text></g>
<g data-bio-input-two opacity="0"><g transform="translate(662 181) scale(.55)">${moleculeFragment('oxygen','resp-particles')}</g></g>
<g data-bio-product opacity="0"><g transform="translate(588 257) scale(.65)">${moleculeFragment('water','resp-particles')}</g><text x="643" y="344" text-anchor="middle" fill="#244c48" stroke="#fff9e8" stroke-width="3" paint-order="stroke" font-size="12">水 H₂O</text></g>
<rect x="100" y="360" width="560" height="30" rx="12" fill="#fffdf2ed"/><text x="380" y="380" text-anchor="middle" fill="#345349" font-size="13">葡萄糖 → 二氧化碳　｜　氧氣 → 水　｜　釋放能量</text></svg>`;}
