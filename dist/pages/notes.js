import { a as e, c as t, d as n, f as r, m as i, n as a, o, p as s, s as c, t as l, u } from "../chunks/notes-schema-tqswf0Qz.js";
import { useCallback as d, useEffect as f, useState as p } from "react";
//#region src/pages/notes.tsx
var m = "/api/plugins/evo-essentials/readonly-data/notes_all", h = "/api/plugins/evo-essentials/data/notes";
function g({ slug: r }) {
	let { success: g, error: _ } = s(), [v, y] = p([]), [b, x] = p(null), [S, C] = p(!1), w = d(() => fetch(m, { credentials: "include" }).then((e) => e.json()).then((e) => y(e.rows ?? [])), []);
	f(() => {
		w();
	}, [w]);
	let T = d(() => {
		C(!1), x(null);
	}, []), E = async (e) => {
		let t = {};
		for (let [n, r] of Object.entries(e)) r === "" || r === void 0 || (t[n] = r);
		let n = b ? {
			...t,
			id: b.id
		} : t, r = await fetch(h, {
			method: b ? "PUT" : "POST",
			credentials: "include",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(n)
		});
		if (!r.ok) {
			let e = "";
			try {
				e = (await r.json()).error ?? "";
			} catch {}
			_(e || `Error saving note (HTTP ${r.status})`);
			return;
		}
		g(b ? "Note updated" : "Note created"), T(), w();
	}, D = async (e) => {
		let t = await fetch(`${h}?id=${e.id}`, {
			method: "DELETE",
			credentials: "include"
		});
		if (!t.ok) {
			_(`Error deleting note (HTTP ${t.status})`);
			return;
		}
		g("Note deleted"), w();
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
	return /* @__PURE__ */ React.createElement(o, null, /* @__PURE__ */ React.createElement(c, null, /* @__PURE__ */ React.createElement("span", null, "Notes"), /* @__PURE__ */ React.createElement(n, {
		size: "sm",
		onClick: () => {
			x(null), C(!0);
		}
	}, "New Note")), /* @__PURE__ */ React.createElement(t, null, /* @__PURE__ */ React.createElement(i, {
		columns: [...l, O],
		data: v,
		emptyMessage: "No notes yet."
	})), /* @__PURE__ */ React.createElement(u, {
		open: S,
		onClose: T,
		title: b ? "Edit Note" : "New Note"
	}, /* @__PURE__ */ React.createElement(e, {
		schema: a,
		initialValues: b ?? {},
		onSubmit: E,
		onCancel: T
	})));
}
function _(e) {
	return /* @__PURE__ */ React.createElement(r, null, /* @__PURE__ */ React.createElement(g, e));
}
//#endregion
export { _ as default };

//# sourceMappingURL=notes.js.map