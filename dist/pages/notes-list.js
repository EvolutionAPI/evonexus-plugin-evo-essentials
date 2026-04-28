import { c as e, i as t, l as n, m as r, o as i, r as a, s as o, t as s } from "../chunks/notes-schema-tqswf0Qz.js";
import { useEffect as c, useState as l } from "react";
//#region src/pages/notes-list.tsx
var u = "/api/plugins/evo-essentials/readonly-data/notes_all", d = [
	{
		value: "",
		label: "All priorities"
	},
	{
		value: "low",
		label: "Low"
	},
	{
		value: "medium",
		label: "Medium"
	},
	{
		value: "high",
		label: "High"
	}
], f = {
	high: "danger",
	medium: "warning",
	low: "success"
};
function p({ slug: p }) {
	let [m, h] = l([]), [g, _] = l(""), [v, y] = l(!1);
	c(() => {
		fetch(u, { credentials: "include" }).then((e) => e.json()).then((e) => h(e.rows ?? [])).catch(() => h([]));
	}, []);
	let b = m.filter((e) => !(g && e.priority !== g || v && !e.pinned)), x = s.map((e) => e.key === "priority" ? {
		...e,
		render: (e) => /* @__PURE__ */ React.createElement(t, { variant: f[e] ?? "default" }, String(e ?? ""))
	} : e);
	return /* @__PURE__ */ React.createElement(i, null, /* @__PURE__ */ React.createElement(o, null, /* @__PURE__ */ React.createElement("span", null, "All Notes (", b.length, ")")), /* @__PURE__ */ React.createElement(e, null, /* @__PURE__ */ React.createElement("div", { style: {
		display: "flex",
		gap: 16,
		alignItems: "flex-end",
		marginBottom: 16
	} }, /* @__PURE__ */ React.createElement(n, {
		label: "Priority",
		options: d,
		value: g,
		onChange: (e) => _(e.target.value)
	}), /* @__PURE__ */ React.createElement(a, {
		id: "pinned-filter",
		label: "Pinned only",
		checked: v,
		onChange: (e) => y(e.target.checked)
	})), /* @__PURE__ */ React.createElement(r, {
		columns: x,
		data: b,
		emptyMessage: v || g ? "No notes match the current filters." : "No notes yet."
	})));
}
//#endregion
export { p as default };

//# sourceMappingURL=notes-list.js.map