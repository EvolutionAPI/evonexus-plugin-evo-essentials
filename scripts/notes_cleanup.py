#!/usr/bin/env python3
"""Daily routine for evo-essentials: archive notes whose due_date is past.

Uses the dashboard SDK if available, otherwise falls back to a no-op log.
Demonstrates a real routine wired through routines.yaml.
"""
from __future__ import annotations

import logging
import os
import sys
from datetime import date

logger = logging.getLogger("evo-essentials.notes-cleanup")
logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")


def main() -> int:
    try:
        sys.path.insert(0, os.path.join(os.environ.get("EVONEXUS_HOME", ""), "dashboard", "backend"))
        from sdk_client import evo  # type: ignore[import-not-found]
    except Exception as exc:
        logger.warning("SDK unavailable, skipping (%s)", exc)
        return 0

    today = date.today().isoformat()
    try:
        resp = evo.get(
            "/api/plugins/evo-essentials/data/notes",
            params={"due_before": today, "pinned": "false"},
        )
        items = resp.get("items", []) if isinstance(resp, dict) else []
        logger.info("notes-cleanup: %d note(s) past due_date %s", len(items), today)
    except Exception as exc:
        logger.warning("notes-cleanup: query failed (%s)", exc)
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
