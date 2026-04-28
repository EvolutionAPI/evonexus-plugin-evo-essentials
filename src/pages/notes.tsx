import { useState, useEffect, useCallback } from 'react'
import {
  Card, CardHeader, CardBody, Button, Modal,
  SchemaForm, SchemaTable, ToastProvider, useToast,
} from '@evoapi/evonexus-ui'
import { NOTES_SCHEMA, NOTES_COLUMNS } from '../notes-schema'

type Note = Record<string, unknown>
const READ = '/api/plugins/evo-essentials/readonly-data/notes_all'
const WRITE = '/api/plugins/evo-essentials/data/notes'

// The page must own its own ToastProvider — the host's ToastProvider
// (dashboard/frontend/src/components/Toast.tsx) is a separate context
// that @evoapi/evonexus-ui's useToast cannot see. Without this wrapper
// useToast() crashes with "useToast must be used within <ToastProvider>".
function NotesInner({ slug }: { slug: string }) {
  void slug
  const { success, error: toastError } = useToast()
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
    if (!res.ok) {
      let detail = ''
      try { detail = (await res.json()).error ?? '' } catch { /* ignore */ }
      toastError(detail || `Error saving note (HTTP ${res.status})`)
      return
    }
    success(editing ? 'Note updated' : 'Note created')
    close(); load()
  }

  const del = async (row: Note) => {
    const res = await fetch(`${WRITE}?id=${row.id}`, { method: 'DELETE', credentials: 'include' })
    if (!res.ok) { toastError(`Error deleting note (HTTP ${res.status})`); return }
    success('Note deleted'); load()
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

export default function NotesPage(props: { slug: string }) {
  return (
    <ToastProvider>
      <NotesInner {...props} />
    </ToastProvider>
  )
}
