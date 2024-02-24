class NoteItem extends HTMLElement {
  static observedAttributes = ['title', 'body', 'createdAt'];

  constructor() {
    super();
  
    this._title = this.getAttribute('title') || '';
    this._body = this.getAttribute('body') || '';
    this._createdAt = this.getAttribute('createdAt') || '';
    this.classList.add('uk-card', 'uk-card-default')
  }
  
  connectedCallback() {
    this.render();
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
   `;
  }
}


customElements.define('note-item', NoteItem);
