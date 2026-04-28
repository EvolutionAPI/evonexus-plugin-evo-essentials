import { useState, useEffect, useCallback } from 'react'
import { Card, CardHeader, CardBody, Button, Modal, SchemaForm, SchemaTable, useToast } from '@evoapi/evonexus-ui'
import { NOTES_SCHEMA, NOTES_COLUMNS } from '../notes-schema'

type Note = Record<string, unknown>
const BASE = '/api/plugins/evo-essentials/data/notes'

export default function NotesPage({ slug }: { slug: string }) {
  void slug
  const { success, error: toastError } = useToast()
  const [notes, setNotes] = useState<Note[]>([])
  const [editing, setEditing] = useState<Note | null>(null)
  const [open, setOpen] = useState(false)
  const load = useCallback(() => fetch(BASE).then(r => r.json()).then(d => setNotes(d.rows ?? [])), [])
  useEffect(() => { load() }, [load])
  const close = useCallback(() => { setOpen(false); setEditing(null) }, [])

  const save = async (v: Note) => {
    const body = editing ? { ...v, id: editing.id } : v
    const res = await fetch(BASE, { method: editing ? 'PUT' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
    if (!res.ok) { toastError('Error saving note'); return }
    success(editing ? 'Updated' : 'Created')
    close(); load()
  }

  const del = async (row: Note) => {
    await fetch(`${BASE}?id=${row.id}`, { method: 'DELETE' })
    success('Deleted'); load()
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
