-- evo-essentials install (Postgres)
-- Table: evo_essentials_notes
-- Part of the evo-essentials v2 reference plugin.

CREATE TABLE IF NOT EXISTS evo_essentials_notes (
    id         SERIAL PRIMARY KEY,
    title      TEXT    NOT NULL CHECK(char_length(title) BETWEEN 1 AND 200),
    body       TEXT    NOT NULL DEFAULT '',
    priority   TEXT    NOT NULL DEFAULT 'medium'
                       CHECK(priority IN ('low', 'medium', 'high')),
    pinned     BOOLEAN NOT NULL DEFAULT FALSE,
    due_date   DATE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_evo_essentials_notes_priority
    ON evo_essentials_notes (priority);

CREATE INDEX IF NOT EXISTS idx_evo_essentials_notes_pinned
    ON evo_essentials_notes (pinned);

-- Function + trigger: auto-update updated_at on row changes
CREATE OR REPLACE FUNCTION fn_evo_essentials_notes_set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
    NEW.updated_at := now();
    RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_evo_essentials_notes_updated_at
    ON evo_essentials_notes;

CREATE TRIGGER trg_evo_essentials_notes_updated_at
    BEFORE UPDATE ON evo_essentials_notes
    FOR EACH ROW
    EXECUTE FUNCTION fn_evo_essentials_notes_set_updated_at();
