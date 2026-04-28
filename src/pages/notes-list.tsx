import { useState, useEffect } from 'react'
import { Card, CardHeader, CardBody, Select, Checkbox, SchemaTable, Badge } from '@evoapi/evonexus-ui'
import type { SelectOption, BadgeVariant } from '@evoapi/evonexus-ui'
import { NOTES_COLUMNS } from '../notes-schema'

type Note = Record<string, unknown>
const READ = '/api/plugins/evo-essentials/readonly-data/notes_all'

const PRIORITY_OPTIONS: SelectOption[] = [
  { value: '', label: 'All priorities' },
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
]

const PRIORITY_VARIANT: Record<string, BadgeVariant> = {
  high: 'danger',
  medium: 'warning',
  low: 'success',
}

/**
 * Notes List page — filterable by priority and pinned status.
 * Demonstrates SchemaTable with custom column renderers + filter controls
 * from @evonexus/ui primitives. Separate from the CRUD page (notes.tsx).
 */
export default function NotesListPage({ slug }: { slug: string }) {
  void slug
  const [notes, setNotes] = useState<Note[]>([])
  const [priority, setPriority] = useState('')
  const [pinnedOnly, setPinnedOnly] = useState(false)

  useEffect(() => {
    fetch(READ, { credentials: 'include' })
      .then(r => r.json())
      .then(d => setNotes(d.rows ?? []))
      .catch(() => setNotes([]))
  }, [])

  const filtered = notes.filter(n => {
    if (priority && n.priority !== priority) return false
    if (pinnedOnly && !n.pinned) return false
    return true
  })

  const cols = NOTES_COLUMNS.map(col =>
    col.key === 'priority'
      ? {
          ...col,
          render: (v: unknown) => (
            <Badge variant={PRIORITY_VARIANT[v as string] ?? 'default'}>
              {String(v ?? '')}
            </Badge>
          ),
        }
      : col
  )

  return (
    <Card>
      <CardHeader>
        <span>All Notes ({filtered.length})</span>
      </CardHeader>
      <CardBody>
        <div style={{ display: 'flex', gap: 16, alignItems: 'flex-end', marginBottom: 16 }}>
          <Select
            label="Priority"
            options={PRIORITY_OPTIONS}
            value={priority}
            onChange={e => setPriority(e.target.value)}
          />
          <Checkbox
            id="pinned-filter"
            label="Pinned only"
            checked={pinnedOnly}
            onChange={e => setPinnedOnly(e.target.checked)}
          />
        </div>
        <SchemaTable
          columns={cols}
          data={filtered}
          emptyMessage={pinnedOnly || priority ? 'No notes match the current filters.' : 'No notes yet.'}
        />
      </CardBody>
    </Card>
  )
}
