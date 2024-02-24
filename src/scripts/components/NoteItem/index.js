import dayjs from 'dayjs'
import Swal from 'sweetalert2'
import { hideLoading, showLoading } from '../../utils/common'
import Notes from '../../data/notes-api'
import App from '../../app'

class NoteItem extends HTMLElement {
  static observedAttributes = [
    'data-id',
    'title',
    'body',
    'createdAt',
    'archived',
  ]

  constructor() {
    super()

    this._id = this.getAttribute('data-id') || ''
    this._title = this.getAttribute('title') || ''
    this._body = this.getAttribute('body') || ''
    this._createdAt = this.getAttribute('createdAt') || ''
    this._archived = this.hasAttribute('archived')
    this.classList.add('uk-card', 'uk-card-default')
  }

  connectedCallback() {
    this.render()
  }

  render() {
    this.innerHTML = `
      <div class="uk-card-header">
        <div class="uk-grid-small uk-flex-middle" uk-grid>
          <div class="uk-width-expand">
            <h3 class="uk-card-title uk-margin-remove-bottom notes-item__title">${this._title}</h3>
            <p class="uk-text-meta uk-margin-remove-top"><time datetime="${this._createdAt}">${dayjs(this._createdAt).format('MMMM DD, YYYY')}</time>
            </p>
          </div>
        </div>
      </div>
      <div class="uk-card-body">
        <p class="notes-item__body">${this._body}</p>
      </div>
      <div class="uk-card-footer ">
        <div class="d-grid grid-template-col-2 gap-1/2rem">
          <button
            class="${this._archived ? 'uk-button-secondary' : 'uk-button-primary'}"
            id="toggle-archive"
            title="${this._archived ? 'Unarchive' : 'archive'}"
            uk-tooltip="${this._archived ? 'Unarchive' : 'archive'}"
          ><span uk-icon="${this._archived ? 'cloud-download' : 'cloud-upload'}"></span></button>
          <button class="uk-button-danger" id="delete-note" title="Delete" uk-tooltip="Delete"><span uk-icon="trash"></span></button>
        </div>
      </div>
   `

    this._initButtonEvents()
  }

  _initButtonEvents() {
    const archivedBtn = this.querySelector('button#toggle-archive')
    archivedBtn.addEventListener(
      'click',
      this._toggleArchiveHandler(this._id, this._archived),
    )

    const deleteBtn = this.querySelector('button#delete-note')
    deleteBtn.addEventListener('click', this._deleteNoteHandler(this._id))
  }

  _toggleArchiveHandler(noteId, isArchived) {
    return async () => {
      try {
        showLoading()

        if (isArchived) {
          await Notes.unarchiveNoteById(noteId)
        } else {
          await Notes.archiveNoteById(noteId)
        }

        await App.initNotes()

        hideLoading()
      } catch (error) {
        hideLoading()
        Swal.fire('Ups!!', 'Something went wrong', 'error')
      }
    }
  }

  _deleteNoteHandler(noteId) {
    return async () => {
      try {
        showLoading()

        await Notes.deleteNoteById(noteId)

        await App.initNotes()

        hideLoading()
      } catch (error) {
        hideLoading()
        Swal.fire('Ups!!', 'Something went wrong', 'error')
      }
    }
  }

  attributeChangedCallback(name, oldVale, newValue) {
    if (name === 'archived') {
      this[`_${name}`] = newValue === ''
    } else {
      this[`_${name}`] = newValue
    }
    this.render()
  }

  disconnectedCallback() {
    const archivedBtn = this.querySelector('button#toggle-archive')
    const deleteBtn = this.querySelector('button#delete-note')
    archivedBtn.removeEventListener(
      'click',
      this._toggleArchiveHandler(this._id, this._archived),
    )
    deleteBtn.removeEventListener('click', this._deleteNoteHandler(this._id))
  }
}

customElements.define('note-item', NoteItem)
