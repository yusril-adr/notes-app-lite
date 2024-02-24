class NoteList extends HTMLElement {
  static observedAttributes = ['notes'];

  constructor() {
    super();
  
    this._notes = this.getAttribute('notes') || [];
  }

  get notes() {
    return this._notes;
  }

  set notes(newNotes) {
    this._notes = newNotes;
    this.render();
  }
  
  connectedCallback() {
    this.render();
  }

  render() {
   this.innerHTML = '';

   this._notes.forEach((note) => {
    this.innerHTML += `<note-item data-id="${note.id}" title="${note.title}" body="${note.body}" createdAt="${note.createdAt}"></note-item>`;
   });

  }
}


customElements.define('note-list', NoteList);
