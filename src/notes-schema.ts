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
    // `format: 'date'` requires @evoapi/evonexus-ui >= 0.1.1 (which loads
    // ajv-formats). It both validates ISO 8601 dates and tells SchemaForm
    // to render the matching <input type="date"> with a native picker.
    due_date: { type: 'string', title: 'Due Date', format: 'date' },
  },
}

// ─── Table columns (used by SchemaTable in both pages) ────────────────────────
export const NOTES_COLUMNS: TableColumn[] = [
  { key: 'title', label: 'Title', sortable: true },
  { key: 'priority', label: 'Priority', type: 'badge', sortable: true },
  { key: 'pinned', label: 'Pinned', type: 'boolean' },
  { key: 'due_date', label: 'Due Date', type: 'date', sortable: true },
]
