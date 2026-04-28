-- evo-essentials uninstall (Postgres)
DROP TRIGGER IF EXISTS trg_evo_essentials_notes_updated_at
    ON evo_essentials_notes;
DROP FUNCTION IF EXISTS fn_evo_essentials_notes_set_updated_at();
DROP TABLE IF EXISTS evo_essentials_notes;
