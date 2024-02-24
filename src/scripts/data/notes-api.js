const BASE_URL = 'https://notes-api.dicoding.dev/v2'

const Notes = {
  async createNote({ title, body }) {
    const responnse = await fetch(`${BASE_URL}/notes`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ title, body }),
    })

    const resJSON = await responnse.json()

    if (resJSON.status !== 'success') {
      throw new Error(resJSON.message)
    }

    return resJSON.data
  },

  async getNonArchivedNotes() {
    const responnse = await fetch(`${BASE_URL}/notes`)

    const resJSON = await responnse.json()

    if (resJSON.status !== 'success') {
      throw new Error(resJSON.message)
    }

    return resJSON.data
  },

  async getArchivedNotes() {
    const responnse = await fetch(`${BASE_URL}/notes/archived`)

    const resJSON = await responnse.json()

    if (resJSON.status !== 'success') {
      throw new Error(resJSON.message)
    }

    return resJSON.data
  },

  async getNoteById(noteId) {
    const responnse = await fetch(`${BASE_URL}/notes/${noteId}`)

    const resJSON = await responnse.json()

    if (resJSON.status !== 'success') {
      throw new Error(resJSON.message)
    }

    return resJSON.data
  },

  async archiveNoteById(noteId) {
    const responnse = await fetch(`${BASE_URL}/notes/${noteId}/archive`, {
      method: 'POST',
    })

    const resJSON = await responnse.json()

    if (resJSON.status !== 'success') {
      throw new Error(resJSON.message)
    }

    return resJSON.data
  },

  async unarchiveNoteById(noteId) {
    const responnse = await fetch(`${BASE_URL}/notes/${noteId}/unarchive`, {
      method: 'POST',
    })

    const resJSON = await responnse.json()

    if (resJSON.status !== 'success') {
      throw new Error(resJSON.message)
    }

    return resJSON.data
  },

  async deleteNoteById(noteId) {
    const responnse = await fetch(`${BASE_URL}/notes/${noteId}`, {
      method: 'DELETE',
    })

    const resJSON = await responnse.json()

    if (resJSON.status !== 'success') {
      throw new Error(resJSON.message)
    }

    return resJSON.data
  },
}

export default Notes
