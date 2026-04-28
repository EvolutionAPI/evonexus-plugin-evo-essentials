# evo-essentials

EvoNexus v2 reference plugin. Demonstrates the full schema-driven contract:

- **schema_version 2.0** — React + `@evoapi/evonexus-ui` host design system
- **dialect-aware SQL** — ships `install.sqlite.sql` + `install.postgres.sql` from commit 1
- **`<SchemaForm>` + `<SchemaTable>`** — single-resource CRUD in 43 LOC of TSX
- **home widget** — reads `readonly_data`, renders inside the host dashboard

The plugin domain is deliberately didactic: a "Notes" resource (title, body, priority, pinned, due_date) that exercises every widget type in `<SchemaForm>` (string, number, boolean, enum, date).

## Install

In your EvoNexus dashboard (>= v0.34.0), open **Plugins → Install from URL** and paste:

```
https://github.com/EvolutionAPI/evonexus-plugin-evo-essentials
```

The host clones the repo, validates `plugin.yaml`, runs the dialect-aware migration
(SQLite or Postgres, picked from the active backend), and registers the UI pages,
widget, agent, skill, and rules. Works on both SQLite and Postgres.

## Develop

```bash
git clone https://github.com/EvolutionAPI/evonexus-plugin-evo-essentials
cd evonexus-plugin-evo-essentials
npm install
npm run build       # produce ESM bundle in dist/
npm run typecheck   # TypeScript pass
```

## License

MIT — see `LICENSE`.
