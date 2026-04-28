import { a as e, c as t, d as n, f as r, n as i, o as a, s as o, t as s, u as c } from "../chunks/notes-schema-IAlPDeqR.js";
import { useCallback as l, useEffect as u, useState as d } from "react";
//#region src/pages/notes.tsx
var f = "/api/plugins/evo-essentials/readonly-data/notes_all", p = "/api/plugins/evo-essentials/data/notes";
function m(e, t = "success") {
	console.log(`[evo-essentials] ${t}: ${e}`);
}
function h({ slug: h }) {
	let [g, _] = d([]), [v, y] = d(null), [b, x] = d(!1), S = l(() => fetch(f, { credentials: "include" }).then((e) => e.json()).then((e) => _(e.rows ?? [])), []);
	u(() => {
		S();
	}, [S]);
	let C = l(() => {
		x(!1), y(null);
	}, []), w = async (e) => {
		let t = v ? {
			...e,
			id: v.id
		} : e;
		if (!(await fetch(p, {
			method: v ? "PUT" : "POST",
			credentials: "include",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(t)
		})).ok) {
			m("Error saving note", "error");
			return;
		}
		m(v ? "Updated" : "Created"), C(), S();
	}, T = async (e) => {
		await fetch(`${p}?id=${e.id}`, {
			method: "DELETE",
			credentials: "include"
		}), m("Deleted"), S();
	}, E = {
		key: "_actions",
		label: "",
		render: (e, t) => /* @__PURE__ */ React.createElement("span", { style: {
			display: "flex",
			gap: 6
		} }, /* @__PURE__ */ React.createElement(n, {
			size: "sm",
			variant: "secondary",
			onClick: () => {
				y(t), x(!0);
			}
		}, "Edit"), /* @__PURE__ */ React.createElement(n, {
			size: "sm",
			variant: "danger",
			onClick: () => T(t)
		}, "Del"))
	};
	return /* @__PURE__ */ React.createElement(e, null, /* @__PURE__ */ React.createElement(a, null, /* @__PURE__ */ React.createElement("span", null, "Notes"), /* @__PURE__ */ React.createElement(n, {
		size: "sm",
		onClick: () => {
			y(null), x(!0);
		}
	}, "New Note")), /* @__PURE__ */ React.createElement(t, null, /* @__PURE__ */ React.createElement(o, {
		columns: [...s, E],
		data: g,
		emptyMessage: "No notes yet."
	})), /* @__PURE__ */ React.createElement(c, {
		open: b,
		onClose: C,
		title: v ? "Edit Note" : "New Note"
	}, /* @__PURE__ */ React.createElement(r, {
		schema: i,
		initialValues: v ?? {},
		onSubmit: w,
		onCancel: C
	})));
}
//#endregion
export { h as default };

//# sourceMappingURL=notes.js.map