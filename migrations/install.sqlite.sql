-- evo-essentials install (SQLite)
-- Table: evo_essentials_notes
-- Part of the evo-essentials v2 reference plugin.

CREATE TABLE IF NOT EXISTS evo_essentials_notes (
    id        INTEGER PRIMARY KEY AUTOINCREMENT,
    title     TEXT    NOT NULL CHECK(length(title) BETWEEN 1 AND 200),
    body      TEXT    NOT NULL DEFAULT '',
    priority  TEXT    NOT NULL DEFAULT 'medium'
                      CHECK(priority IN ('low', 'medium', 'high')),
    pinned    INTEGER NOT NULL DEFAULT 0 CHECK(pinned IN (0, 1)),
    due_date  TEXT,
    created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now')),
    updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now'))
);

CREATE INDEX IF NOT EXISTS idx_evo_essentials_notes_priority
    ON evo_essentials_notes (priority);

CREATE INDEX IF NOT EXISTS idx_evo_essentials_notes_pinned
    ON evo_essentials_notes (pinned);

-- Trigger: auto-update updated_at on row changes
CREATE TRIGGER IF NOT EXISTS trg_evo_essentials_notes_updated_at
    AFTER UPDATE ON evo_essentials_notes
    FOR EACH ROW
BEGIN
    UPDATE evo_essentials_notes
       SET updated_at = strftime('%Y-%m-%dT%H:%M:%SZ', 'now')
     WHERE id = NEW.id;
END;
