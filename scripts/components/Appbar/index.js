import App from '../../app.js';
import notesData from '../../data/notes.js';

class AppBar extends HTMLElement {
  static observedAttributes = ['title'];

  constructor() {
    super();
  
    this._title = this.getAttribute('title');
  }
  
  connectedCallback() {
    this.render();
  }

  render() {
   this.innerHTML = `
    <nav class="uk-navbar-container">
      <div class="uk-container">
        <div class="uk-navbar navbar-padding">
          <h1 class="uk-margin-remove text-size-normal text-light">${this._title}</h1>

          <div class="uk-navbar-right">
            <button class="padding-x-1/2 uk-hidden@m" aria-label="Search.." uk-toggle="target: #modal-search"
              uk-icon="icon: search"></button>
            <form class="uk-visible@m" id="search-form_navbar">
              <div class="form-group">
                <div class="uk-inline">
                  <span class="uk-form-icon" uk-icon="icon: search"></span>
                  <input class="uk-input" name="search" type="text" placeholder="Search..." aria-label="Search..." />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </nav>

    <div id="modal-search" uk-modal>
      <div class="uk-modal-dialog uk-modal-body uk-padding-remove">
        <form id="search-form__modal">
          <div class="form-group d-flex w-full">
            <div class="uk-inline w-full">
              <span class="uk-form-icon" uk-icon="icon: search"></span>
              <input class="uk-input" name="search" type="text" placeholder="Search..." aria-label="Search..." />
            </div>
          </div>
        </form>
      </div>
    </div>
   `;

   this._modalEl = this.querySelector('#modal-search');
   this._initValue();
   this._initEvent();
  }

  _initValue() {
    const searchParams = (new URL(window.location.href)).searchParams;
    const keyword = searchParams.get('search');

    if (keyword) {
      this.querySelectorAll('form input').forEach((inputEl) => {
        inputEl.value = keyword;
      });
    }
  }

  _initEvent() {
    window.addEventListener('hashchange', () => {
      this._initValue();
    });

    this.querySelectorAll('form').forEach((formEl) => {
      formEl.addEventListener('submit', (event) => {
        event.preventDefault();
      });
    });

    this.querySelectorAll('form input').forEach((inputEl) => {
      inputEl.addEventListener('keyup', (event) => {
        let newUrl = window.location.href.split('?')[0];
        newUrl += `?search=${event.target.value}`;
        window.history.pushState({ path: newUrl },'', newUrl );
        App.initNotes(notesData);
      });
    });
  }

  disconnectedCallback() {
    window.removeEventListener('hashchange');
    this.querySelectorAll('form').forEach((formEl) => {
      formEl.removeEventListener('submit');
    });

    this.querySelectorAll('form input').forEach((inputEl) => {
      inputEl.removeEventListener('keyup');
    });
  }

  attributeChangedCallback(name, oldVale, newValue) {
    this[`_${name}`] = newValue;
    this.render();
  }
}


customElements.define('app-bar', AppBar);
