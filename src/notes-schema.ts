import type { JsonSchema, TableColumn } from '@evoapi/evonexus-ui'

// ─── JSON Schema (mirrors plugin.yaml writable_data.json_schema) ──────────────
export const NOTES_SCHEMA: JsonSchema = {
  type: 'object',
  title: 'Note',
  required: ['title', 'priority'],
  properties: {
    title: { type: 'string', title: 'Title', minLength: 1, maxLength: 200 },
    body: { type: 'string', title: 'Body', description: 'Note content' },
    priority: {
      type: 'string',
      title: 'Priority',
      enum: ['low', 'medium', 'high'],
    },
    pinned: {
      type: 'boolean',
      title: 'Pinned',
      description: 'Show on home widget',
    },
    // No `format: 'date'` — the lib's Ajv instance runs in strict mode
    // without ajv-formats loaded, so any unknown format (date, email, uri…)
    // crashes the SchemaForm at submit time with:
    //   Error: unknown format "date" ignored in schema at path …
    // Until @evoapi/evonexus-ui ships with ajv-formats, plugins must keep
    // the schema format-free. The description below tells the user the
    // expected shape and the host-side json_schema in plugin.yaml can keep
    // `format: date` for documentation purposes (the host validator is more
    // permissive).
    due_date: {
      type: 'string',
      title: 'Due Date',
      description: 'YYYY-MM-DD',
    },
  },
}

// ─── Table columns (used by SchemaTable in both pages) ────────────────────────
export const NOTES_COLUMNS: TableColumn[] = [
  { key: 'title', label: 'Title', sortable: true },
  { key: 'priority', label: 'Priority', type: 'badge', sortable: true },
  { key: 'pinned', label: 'Pinned', type: 'boolean' },
  { key: 'due_date', label: 'Due Date', type: 'date', sortable: true },
]
