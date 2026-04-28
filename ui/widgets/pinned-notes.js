var e=`evo-essentials-pinned-notes`,t=class extends HTMLElement{connectedCallback(){this.style.cssText=`display:block;padding:16px;font-family:inherit`,this.innerHTML=`<p style="color:#667085;font-size:12px">Loading…</p>`,fetch(`/api/plugins/evo-essentials/data/pinned_notes_count`).then(e=>e.json()).then(e=>{let t=e.rows?.[0]?.count??0;this.innerHTML=`
          <div style="display:flex;align-items:center;gap:10px">
            <span style="font-size:28px;font-weight:700;color:#00FFA7">${t}</span>
            <span style="font-size:13px;color:#D0D5DD">pinned note${t===1?``:`s`}</span>
          </div>
          <p style="margin:6px 0 0;font-size:11px;color:#667085">Evo Essentials</p>
        `}).catch(()=>{this.innerHTML=`<p style="color:#667085;font-size:12px">—</p>`})}};customElements.get(e)||customElements.define(e,t);
//# sourceMappingURL=pinned-notes.js.map