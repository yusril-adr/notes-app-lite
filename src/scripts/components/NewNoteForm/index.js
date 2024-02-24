import UIkit from 'uikit'
import Swal from 'sweetalert2'
import App from '../../app'
import Notes from '../../data/notes-api'
import { hideLoading, showLoading } from '../../utils/common'

class NewNoteForm extends HTMLElement {
  connectedCallback() {
    this.render()
  }

  render() {
    this.innerHTML = `
      <button class="uk-button uk-button-primary" uk-toggle="target: #modal-add-form">
        <span uk-icon="plus" class="uk-margin-right"></span>Add Note
      </button>

      <div id="modal-add-form" uk-modal>
        <div class="uk-modal-dialog uk-modal-body">
          <h2 class="uk-modal-title">New Note</h2>
          <form id="new-note-form">
            <div class="form-group d-flex flex-column">
              <label for="note_title" class="uk-text-default">Title</label>
              <input type="text" name="title" id="note_title" class="uk-input" aria-describedby="title-validation" required>
              <span class="uk-text-danger" id="title-validation" aria-live="polite"></span>
            </div>

            <div class="form-group d-flex flex-column">
              <label for="note_body" class="uk-text-default">Body</label>
              <textarea name="body" id="note_body" rows="5" aria-describedby="body-validation" required></textarea>
              <span class="uk-text-danger" id="body-validation" aria-live="polite"></span>
            </div>

            <div class="uk-text-right uk-margin-top">
              <button class="uk-button uk-button-default uk-modal-close" type="button">Cancel</button>
              <button class="uk-button uk-button-primary" type="submit">Save</button>
            </div>
          </form>
        </div>
      </div>
    `

    this._initEvent()
  }

  _initEvent() {
    this.querySelectorAll('form').forEach((formEl) => {
      formEl.addEventListener('submit', this._submitHandler)
    })

    this.querySelectorAll('form input').forEach((inputEl) => {
      inputEl.addEventListener('invalid', this._validationHandler)
      inputEl.addEventListener('change', this._validationHandler)
      inputEl.addEventListener('blur', this._validationBlurHandler)
    })

    this.querySelectorAll('form textarea').forEach((inputEl) => {
      inputEl.addEventListener('invalid', this._validationHandler)
      inputEl.addEventListener('change', this._validationHandler)
      inputEl.addEventListener('blur', this._validationBlurHandler)
    })
  }

  async _submitHandler(event) {
    event.preventDefault()
    try {
      showLoading()

      await Notes.createNote({
        title: event.target.title.value,
        body: event.target.body.value,
      })

      await App.initNotes()

      await UIkit.modal('#modal-add-form').hide()

      hideLoading()
    } catch (error) {
      hideLoading()
      Swal.fire('Ups!', 'Something went wrong!!', 'error')
    }
  }

  _validationHandler(event) {
    event.target.setCustomValidity('')

    if (event.target.validity.valueMissing) {
      event.target.setCustomValidity(
        `Please fill the '${event.target.name}' field`,
      )
    }
  }

  _validationBlurHandler(event) {
    const isValid = event.target.validity.valid
    const errorMessage = event.target.validationMessage

    const connectedValidationId = event.target.getAttribute('aria-describedby')
    const connectedValidationEl = connectedValidationId
      ? document.getElementById(connectedValidationId)
      : null

    if (connectedValidationEl && errorMessage && !isValid) {
      connectedValidationEl.innerText = errorMessage
    } else {
      connectedValidationEl.innerText = ''
    }
  }

  disconnectedCallback() {
    this.querySelectorAll('form').forEach((formEl) => {
      formEl.removeEventListener('submit')
    })

    this.querySelectorAll('form input').forEach((inputEl) => {
      inputEl.removeEventListener('invalid')
    })
  }
}

customElements.define('new-note-form', NewNoteForm)
