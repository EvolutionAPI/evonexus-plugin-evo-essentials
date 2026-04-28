---
name: create-note
description: Create a new personal note in the Evo Essentials plugin (title, body, priority, optional due date, pinned flag). Use when the user says "create a note", "/create-note", "save this as a note", or asks to capture an idea/reminder for later.
---

# Skill: create-note

Capture a personal note via the Evo Essentials writable_data endpoint.

## Trigger phrases

- "create a note"
- "save a note about ..."
- "/create-note"
- "anota isso"
- "lembra disso pra mim"

## Inputs

| Field      | Required | Type    | Notes                                          |
|------------|----------|---------|------------------------------------------------|
| `title`    | yes      | string  | 1–200 chars                                    |
| `priority` | yes      | enum    | one of `low`, `medium`, `high` (default `medium`) |
| `body`     | no       | string  | free text                                      |
| `due_date` | no       | string  | ISO 8601 (`YYYY-MM-DD`)                        |
| `pinned`   | no       | boolean | true → shows on home widget                    |

## Flow

1. Ask the user for `title` if not provided. Title is non-negotiable.
2. Ask for `priority`. Default to `medium` if the user is vague.
3. If the user mentioned a deadline ("amanhã", "next Friday", "em 3 dias"), parse it to ISO format and ask to confirm.
4. If the note sounds urgent or unmissable, suggest `pinned: true` — but only one or two pinned notes max, the widget gets noisy otherwise.
5. POST to `/api/plugins/evo-essentials/data/notes` with the JSON body.
6. Confirm creation: echo back the title and priority, plus the URL `/plugins-ui/evo-essentials/notes-list` for review.

## Example

User: "create a note: ligar pro contador na sexta, alta prioridade"

```json
POST /api/plugins/evo-essentials/data/notes
{
  "title": "ligar pro contador",
  "priority": "high",
  "due_date": "2026-05-01",
  "pinned": false
}
```

Response: `201 Created` → "Saved 'ligar pro contador' (high) for 2026-05-01."

## Errors

- `400 Bad Request` → field validation failed; show the message to the user and ask for the missing/invalid field.
- `403 Forbidden` → plugin disabled in /plugins; tell the user to re-enable it.
- `5xx` → backoff and retry once; if still failing, tell the user the plugin API is down.
