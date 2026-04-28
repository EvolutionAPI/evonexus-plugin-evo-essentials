import { useState, useEffect, useCallback } from 'react'
import { Card, CardHeader, CardBody, Button, Modal, SchemaForm, SchemaTable } from '@evoapi/evonexus-ui'
import { NOTES_SCHEMA, NOTES_COLUMNS } from '../notes-schema'

type Note = Record<string, unknown>
const READ = '/api/plugins/evo-essentials/readonly-data/notes_all'
const WRITE = '/api/plugins/evo-essentials/data/notes'

// Plugins run inside a host that has its own ToastProvider, but
// @evoapi/evonexus-ui ships a SEPARATE ToastProvider. Importing
// useToast from the lib without wrapping the page in that lib's own
// provider crashes with "useToast must be used within <ToastProvider>".
// Simplest stable fix: don't depend on the lib's toast — fall back to
// a console + window-level signal that the host can wire up later.
function notify(msg: string, kind: 'success' | 'error' = 'success') {
  // eslint-disable-next-line no-console
  console.log(`[evo-essentials] ${kind}: ${msg}`)
}

export default function NotesPage({ slug }: { slug: string }) {
  void slug
  const [notes, setNotes] = useState<Note[]>([])
  const [editing, setEditing] = useState<Note | null>(null)
  const [open, setOpen] = useState(false)
  const load = useCallback(
    () => fetch(READ, { credentials: 'include' }).then(r => r.json()).then(d => setNotes(d.rows ?? [])),
    []
  )
  useEffect(() => { load() }, [load])
  const close = useCallback(() => { setOpen(false); setEditing(null) }, [])

  const save = async (v: Note) => {
    const body = editing ? { ...v, id: editing.id } : v
    const res = await fetch(WRITE, {
      method: editing ? 'PUT' : 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    if (!res.ok) { notify('Error saving note', 'error'); return }
    notify(editing ? 'Updated' : 'Created')
    close(); load()
  }

  const del = async (row: Note) => {
    await fetch(`${WRITE}?id=${row.id}`, { method: 'DELETE', credentials: 'include' })
    notify('Deleted'); load()
  }

  const actionCol = { key: '_actions', label: '', render: (_: unknown, row: Note) => (
    <span style={{ display: 'flex', gap: 6 }}>
      <Button size="sm" variant="secondary" onClick={() => { setEditing(row); setOpen(true) }}>Edit</Button>
      <Button size="sm" variant="danger" onClick={() => del(row)}>Del</Button>
    </span>
  ) }

  return (
    <Card>
      <CardHeader><span>Notes</span><Button size="sm" onClick={() => { setEditing(null); setOpen(true) }}>New Note</Button></CardHeader>
      <CardBody><SchemaTable columns={[...NOTES_COLUMNS, actionCol]} data={notes} emptyMessage="No notes yet." /></CardBody>
      <Modal open={open} onClose={close} title={editing ? 'Edit Note' : 'New Note'}>
        <SchemaForm schema={NOTES_SCHEMA} initialValues={editing ?? {}} onSubmit={save} onCancel={close} />
      </Modal>
    </Card>
  )
}
