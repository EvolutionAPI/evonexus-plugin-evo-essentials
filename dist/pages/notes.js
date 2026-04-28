import { a as e, c as t, d as n, f as r, n as i, o as a, p as o, s, t as c, u as l } from "../chunks/notes-schema-CRlWSxzj.js";
import { useCallback as u, useEffect as d, useState as f } from "react";
//#region src/pages/notes.tsx
var p = "/api/plugins/evo-essentials/data/notes";
function m({ slug: m }) {
	let { success: h, error: g } = o(), [_, v] = f([]), [y, b] = f(null), [x, S] = f(!1), C = u(() => fetch(p).then((e) => e.json()).then((e) => v(e.rows ?? [])), []);
	d(() => {
		C();
	}, [C]);
	let w = u(() => {
		S(!1), b(null);
	}, []), T = async (e) => {
		let t = y ? {
			...e,
			id: y.id
		} : e;
		if (!(await fetch(p, {
			method: y ? "PUT" : "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(t)
		})).ok) {
			g("Error saving note");
			return;
		}
		h(y ? "Updated" : "Created"), w(), C();
	}, E = async (e) => {
		await fetch(`${p}?id=${e.id}`, { method: "DELETE" }), h("Deleted"), C();
	}, D = {
		key: "_actions",
		label: "",
		render: (e, t) => /* @__PURE__ */ React.createElement("span", { style: {
			display: "flex",
			gap: 6
		} }, /* @__PURE__ */ React.createElement(n, {
			size: "sm",
			variant: "secondary",
			onClick: () => {
				b(t), S(!0);
			}
		}, "Edit"), /* @__PURE__ */ React.createElement(n, {
			size: "sm",
			variant: "danger",
			onClick: () => E(t)
		}, "Del"))
	};
	return /* @__PURE__ */ React.createElement(e, null, /* @__PURE__ */ React.createElement(a, null, /* @__PURE__ */ React.createElement("span", null, "Notes"), /* @__PURE__ */ React.createElement(n, {
		size: "sm",
		onClick: () => {
			b(null), S(!0);
		}
	}, "New Note")), /* @__PURE__ */ React.createElement(t, null, /* @__PURE__ */ React.createElement(s, {
		columns: [...c, D],
		data: _,
		emptyMessage: "No notes yet."
	})), /* @__PURE__ */ React.createElement(l, {
		open: x,
		onClose: w,
		title: y ? "Edit Note" : "New Note"
	}, /* @__PURE__ */ React.createElement(r, {
		schema: i,
		initialValues: y ?? {},
		onSubmit: T,
		onCancel: w
	})));
}
//#endregion
export { m as default };

//# sourceMappingURL=notes.js.map