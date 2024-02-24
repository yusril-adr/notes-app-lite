import Swal from 'sweetalert2'
import Notes from './data/notes-api'
import { hideLoading, showLoading } from './utils/common'

const App = {
  async initNotes() {
    try {
      showLoading()
      const { searchParams } = new URL(window.location.href)
      const keyword = searchParams.get('search')

      const unarchivedNotes = await Notes.getNonArchivedNotes()
      const archivedNotes = await Notes.getArchivedNotes()

      const unarchivedNoteListElem = document.querySelector(
        'note-list#unarchived-notes',
      )
      const archivedNoteListElem = document.querySelector(
        'note-list#archived-notes',
      )
      if (keyword) {
        unarchivedNoteListElem.notes = unarchivedNotes.filter(({ title }) =>
          title.toLowerCase().trim().includes(keyword.toLowerCase().trim()),
        )

        archivedNoteListElem.notes = archivedNotes.filter(({ title }) =>
          title.toLowerCase().trim().includes(keyword.toLowerCase().trim()),
        )
      } else {
        unarchivedNoteListElem.notes = unarchivedNotes
        archivedNoteListElem.notes = archivedNotes
      }
      hideLoading()
    } catch (error) {
      hideLoading()
      Swal.fire('Ups!!', 'Something went wrong', 'error')
    }
  },
}

export default App
