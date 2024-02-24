class LoadingElement extends HTMLElement {
  static observedAttributes = ['show']

  constructor() {
    super()

    this._show = this.hasAttribute('show')
  }

  show() {
    this._show = true
    this.render()
  }

  hide() {
    this._show = false
    this.render()
  }

  connectedCallback() {
    this.render()
  }

  render() {
    if (this._show) {
      this.innerHTML = `
        <div>
          <div class="loading">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      `
    } else {
      this.innerHTML = ''
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'show') {
      this[`_${name}`] = newValue === ''
    }
    this.render()
  }
}

customElements.define('loading-element', LoadingElement)
