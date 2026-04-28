# Skill: create-note

Create a new note via the Evo Essentials plugin.

## Trigger

`/create-note` or "create a note"

## Steps

1. Ask for note title (required)
2. Ask for priority: low / medium / high (default: medium)
3. Optionally ask for body, due date, and pinned status
4. POST to `/api/plugins/evo-essentials/data/notes` with the collected fields
5. Confirm creation with the note title
