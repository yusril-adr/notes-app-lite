import './components/Appbar/index.js'
import './components/NoteList/index.js'
import './components/NoteItem/index.js'
import './components/NewNoteForm/index.js'

import notes from './data/notes.js';
import App from './app.js';

window.addEventListener('DOMContentLoaded', () => {
  App.initNotes(notes);
});