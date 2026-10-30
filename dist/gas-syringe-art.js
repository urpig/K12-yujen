export function gasSyringe(suffix){return `<svg class="bleach-supply gas-syringe" viewBox="0 0 180 142" aria-hidden="true"><defs>
<linearGradient id="syringe-glass-${suffix}" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#f5ffff" stop-opacity=".96"/><stop offset=".18" stop-color="#a8cad3" stop-opacity=".62"/><stop offset=".43" stop-color="#f6ffff" stop-opacity=".25"/><stop offset=".7" stop-color="#c2e0e6" stop-opacity=".35"/><stop offset="1" stop-color="#718f9a" stop-opacity=".85"/></linearGradient>
<linearGradient id="syringe-steel-${suffix}" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#f9ffff"/><stop offset=".27" stop-color="#8babb3"/><stop offset=".5" stop-color="#e4f1f2"/><stop offset="1" stop-color="#506f79"/></linearGradient>
<linearGradient id="syringe-rubber-${suffix}"><stop stop-color="#122c34"/><stop offset=".5" stop-color="#4c6971"/><stop offset="1" stop-color="#0c242d"/></linearGradient>
</defs><ellipse cx="88" cy="122" rx="72" ry="7" fill="#294a5425"/>
<g transform="rotate(-22 90 71)">
<path d="M12 60H56V69H12Z" fill="url(#syringe-steel-${suffix})" stroke="#5d7d87"/>
<rect x="7" y="47" width="8" height="35" rx="3" fill="url(#syringe-steel-${suffix})" stroke="#69858e"/><path d="M9 51V78" stroke="#faffff" stroke-width="2"/>
<rect x="46" y="44" width="11" height="41" rx="3" fill="#d9edf0" fill-opacity=".75" stroke="#7e9da8"/>
<rect x="52" y="46" width="82" height="36" rx="5" fill="url(#syringe-glass-${suffix})" stroke="#688e9b" stroke-width="1.5"/>
<path d="M57 49H128M56 53H129" stroke="#fff" stroke-opacity=".9" stroke-width="1.6"/><path d="M56 79H128" stroke="#b4dce1"/>
<rect x="59" y="49" width="9" height="30" rx="3" fill="url(#syringe-rubber-${suffix})"/><path d="M61 51V77M66 51V77" stroke="#061d26" stroke-width="1.2"/>
${Array.from({length:11},(_,i)=>`<path d="M${73+i*5} 48V${i%2?54:59}" stroke="#355c68" stroke-width=".9"/>`).join('')}
<text x="91" y="69" fill="#315967" font-size="8" text-anchor="middle">20</text><text x="121" y="69" fill="#315967" font-size="8" text-anchor="middle">50 mL</text>
<path d="M134 55H143L149 61V69L143 75H134Z" fill="url(#syringe-steel-${suffix})" stroke="#6c8b94"/>
<path d="M149 62H168V68H149Z" fill="#bad3dc" stroke="#5b808f"/><path d="M151 63H168" stroke="#f2ffff" stroke-width="1.2"/>
<rect x="80" y="85" width="41" height="18" rx="3" fill="#fffbed" stroke="#c2cdbd"/><text x="100" y="98" text-anchor="middle" font-size="12" font-weight="600" fill="#315560">SO₂</text>
</g></svg><strong>二氧化硫 SO₂</strong>`;}
