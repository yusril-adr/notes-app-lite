import anime from 'animejs'
// Uikit
import UIkit from 'uikit'
import Icons from 'uikit/dist/js/uikit-icons'
import 'uikit/dist/css/uikit.css'

// Styles
import '../styles/index.css'

// Components
import './components/Appbar/index'
import './components/LoadingElement/index'
import './components/NoteList/index'
import './components/NoteItem/index'
import './components/NewNoteForm/index'

import App from './app'

window.addEventListener('DOMContentLoaded', async () => {
  UIkit.use(Icons)

  await App.initNotes()

  anime({
    targets: 'body',
    opacity: [0, 1],
    easing: 'easeInOutQuad',
    duration: 500,
  })
})
