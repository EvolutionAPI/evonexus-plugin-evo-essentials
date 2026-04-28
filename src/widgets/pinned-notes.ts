/**
 * Pinned Notes widget — registers a web component for the legacy widget slot.
 *
 * Reads readonly_data query "pinned_notes_count" from the backend and shows
 * the count of pinned notes on the overview page.
 *
 * Web components still use the v0 web-component mounting path in
 * PluginWidgetsGrid.tsx. This bundle registers the custom element when
 * imported by the host via dynamic import().
 */

const TAG = 'evo-essentials-pinned-notes'

class PinnedNotesWidget extends HTMLElement {
  connectedCallback() {
    this.style.cssText = 'display:block;padding:16px;font-family:inherit'
    this.innerHTML = '<p style="color:#667085;font-size:12px">Loading…</p>'

    fetch('/api/plugins/evo-essentials/data/pinned_notes_count')
      .then(r => r.json())
      .then((d: { rows?: Array<{ count: number }> }) => {
        const count = d.rows?.[0]?.count ?? 0
        this.innerHTML = `
          <div style="display:flex;align-items:center;gap:10px">
            <span style="font-size:28px;font-weight:700;color:#00FFA7">${count}</span>
            <span style="font-size:13px;color:#D0D5DD">pinned note${count !== 1 ? 's' : ''}</span>
          </div>
          <p style="margin:6px 0 0;font-size:11px;color:#667085">Evo Essentials</p>
        `
      })
      .catch(() => {
        this.innerHTML = '<p style="color:#667085;font-size:12px">—</p>'
      })
  }
}

if (!customElements.get(TAG)) {
  customElements.define(TAG, PinnedNotesWidget)
}
