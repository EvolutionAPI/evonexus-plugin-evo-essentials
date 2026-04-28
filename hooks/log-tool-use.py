#!/usr/bin/env python3
"""PostToolUse hook for evo-essentials.

Logs every tool invocation to plugins/evo-essentials/.runtime/tool-use.log
so the Notes plugin can demonstrate a working hook end-to-end. The log is
append-only and rotates manually (no daemon).

Hooks receive a JSON payload on stdin from the host runtime. We read it,
extract the tool name and exit code, and append a timestamped line.
"""
from __future__ import annotations

import json
import os
import sys
from datetime import datetime, timezone
from pathlib import Path

PLUGIN_DIR = Path(__file__).resolve().parent.parent
LOG_DIR = PLUGIN_DIR / ".runtime"
LOG_FILE = LOG_DIR / "tool-use.log"


def main() -> int:
    try:
        payload = json.loads(sys.stdin.read() or "{}")
    except json.JSONDecodeError:
        payload = {}

    tool_name = payload.get("tool_name") or payload.get("tool") or "unknown"
    exit_code = payload.get("exit_code")
    timestamp = datetime.now(timezone.utc).isoformat(timespec="seconds")

    LOG_DIR.mkdir(parents=True, exist_ok=True)
    line = f"{timestamp} tool={tool_name} exit={exit_code}\n"
    with LOG_FILE.open("a", encoding="utf-8") as f:
        f.write(line)

    return 0


if __name__ == "__main__":
    sys.exit(main())
