# Evo Essentials — Notes Conventions

## Data creation

- Notes created via agent chat MUST be created through the writable_data API endpoint
- Priority MUST be one of: `low`, `medium`, `high`
- Due dates MUST use ISO 8601 format: `YYYY-MM-DD`
- Pin sparingly: only truly time-sensitive or high-priority notes

## Display

- Pinned notes appear on the home widget (overview page)
- Notes are sorted by priority descending, then by created_at descending
