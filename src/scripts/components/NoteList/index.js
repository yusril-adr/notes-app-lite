import anime from 'animejs/lib/anime.es'

class NoteList extends HTMLElement {
  static observedAttributes = ['notes']

  constructor() {
    super()

    this._notes = this.getAttribute('notes') || []
  }

  get notes() {
    return this._notes
  }

  set notes(newNotes) {
    this._notes = newNotes
    this.render()
  }

  connectedCallback() {
    this.render()
  }

  render() {
    this.innerHTML = ''

    if (this._notes.length === 0) {
      this.innerHTML =
        '<span class="empty-list">This list is currently empty right now.</span>'
    } else {
      this._notes.forEach((note) => {
        this.innerHTML += `
          <note-item
            data-id="${note.id}"
            title="${note.title}"
            body="${note.body}"
            createdAt="${note.createdAt}"
            ${note.archived ? 'archived' : ''}
          ></note-item>
        `
      })

      anime({
        targets: this.querySelectorAll('note-item'),
        keyframes: [
          { rotate: '3deg' },
          { rotate: 0 },
          { rotate: '-3deg' },
          { rotate: 0 },
        ],
        loop: true,
        easing: 'cubicBezier(0.360, 0.145, 0.560, 0.765)',
      })
    }
  }

  attributeChangedCallback(name, oldVale, newValue) {
    this[`_${name}`] = newValue
    this.render()
  }
}

customElements.define('note-list', NoteList)
