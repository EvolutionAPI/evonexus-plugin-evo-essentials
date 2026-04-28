import { a as e, c as t, d as n, f as r, n as i, o as a, p as o, s, t as c, u as l } from "../chunks/notes-schema-CRlWSxzj.js";
import { useCallback as u, useEffect as d, useState as f } from "react";
//#region src/pages/notes.tsx
var p = "/api/plugins/evo-essentials/readonly-data/notes_all", m = "/api/plugins/evo-essentials/data/notes";
function h({ slug: h }) {
	let { success: g, error: _ } = o(), [v, y] = f([]), [b, x] = f(null), [S, C] = f(!1), w = u(() => fetch(p, { credentials: "include" }).then((e) => e.json()).then((e) => y(e.rows ?? [])), []);
	d(() => {
		w();
	}, [w]);
	let T = u(() => {
		C(!1), x(null);
	}, []), E = async (e) => {
		let t = b ? {
			...e,
			id: b.id
		} : e;
		if (!(await fetch(m, {
			method: b ? "PUT" : "POST",
			credentials: "include",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(t)
		})).ok) {
			_("Error saving note");
			return;
		}
		g(b ? "Updated" : "Created"), T(), w();
	}, D = async (e) => {
		await fetch(`${m}?id=${e.id}`, {
			method: "DELETE",
			credentials: "include"
		}), g("Deleted"), w();
	}, O = {
		key: "_actions",
		label: "",
		render: (e, t) => /* @__PURE__ */ React.createElement("span", { style: {
			display: "flex",
			gap: 6
		} }, /* @__PURE__ */ React.createElement(n, {
			size: "sm",
			variant: "secondary",
			onClick: () => {
				x(t), C(!0);
			}
		}, "Edit"), /* @__PURE__ */ React.createElement(n, {
			size: "sm",
			variant: "danger",
			onClick: () => D(t)
		}, "Del"))
	};
	return /* @__PURE__ */ React.createElement(e, null, /* @__PURE__ */ React.createElement(a, null, /* @__PURE__ */ React.createElement("span", null, "Notes"), /* @__PURE__ */ React.createElement(n, {
		size: "sm",
		onClick: () => {
			x(null), C(!0);
		}
	}, "New Note")), /* @__PURE__ */ React.createElement(t, null, /* @__PURE__ */ React.createElement(s, {
		columns: [...c, O],
		data: v,
		emptyMessage: "No notes yet."
	})), /* @__PURE__ */ React.createElement(l, {
		open: S,
		onClose: T,
		title: b ? "Edit Note" : "New Note"
	}, /* @__PURE__ */ React.createElement(r, {
		schema: i,
		initialValues: b ?? {},
		onSubmit: E,
		onCancel: T
	})));
}
//#endregion
export { h as default };

//# sourceMappingURL=notes.js.map