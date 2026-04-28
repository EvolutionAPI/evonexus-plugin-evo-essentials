# Evo Essentials — Notes Conventions

Operational rules every agent / skill / heartbeat must follow when interacting
with the `evo_essentials_notes` table.

## Data creation

- Notes created via agent chat MUST be created through the writable_data API
  endpoint (`POST /api/plugins/evo-essentials/data/notes`). Direct SQL writes
  are forbidden — they bypass json_schema validation and audit log.
- `priority` MUST be one of: `low`, `medium`, `high`. Anything else is rejected
  by the plugin's json_schema.
- `due_date` MUST use ISO 8601 (`YYYY-MM-DD`). If the user gives a relative
  date ("tomorrow", "next Friday"), normalize it to ISO before sending.
- `pinned: true` is reserved for genuinely high-priority items only — pinned
  notes show up on the home widget (overview page) and lose their value if
  every note is pinned. Recommend pinning at most 3 active notes at a time.

## Updates

- `PATCH /api/plugins/evo-essentials/data/notes/{id}` accepts the same fields
  as create. Partial updates are allowed.
- Do not edit the underlying table directly — go through the plugin endpoint
  so the audit trail captures who changed what.

## Deletion

- Use `DELETE /api/plugins/evo-essentials/data/notes/{id}`.
- Soft-delete is not implemented in this reference plugin — deletes are
  permanent. Confirm with the user before deleting a pinned note.

## Display

- The Notes List page (`/plugins-ui/evo-essentials/notes-list`) sorts by
  `priority DESC, created_at DESC` by default.
- The Pinned Notes widget on the overview page reads `readonly_data.pinned_notes_count`
  and shows the count badge — actual pinned notes are fetched live by the widget bundle.

## Postgres / SQLite parity

- Boolean comparisons MUST use `TRUE` / `FALSE` (not `1` / `0`) — `pinned` is
  a true boolean column on Postgres, and SQLite accepts the keywords too.
- `NOW()` works on both engines for `created_at` defaults; do not use `CURRENT_TIMESTAMP`
  in plugin SQL (driver inconsistency).
