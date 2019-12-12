/**
 * 
 * Mixin para detectar si un elemento se encuentra dentro del viewport
 * 
 * Inicialización:
 * Se invoca el método => detectFirstViewportAparition()
 * 
 * Detectar viewport aparition
 * Se escucha el evento => 'viewport-entering'
 * 
 */
export const isInViewportMixin = (superClass) => class extends superClass {
  
  constructor() {
    super();
    this._IsInViewportHandlerBind = this._IsInViewportHandler.bind(this);
  }

  detectFirstViewportAparition(elem) {
    this._viewportTarget = elem;
    window.addEventListener('scroll', this._IsInViewportHandlerBind);
  }

  _IsInViewportHandler() {
    if(this._vanillaIsInViewport(this._viewportTarget)) {
      this.dispatchEvent(new CustomEvent('viewport-entering', {
        bubbles: true,
        composed: true,
        detail: this
      }));
      window.removeEventListener('scroll', this._IsInViewportHandlerBind);
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('scroll', this._IsInViewportHandlerBind);    
  }

  // Inspired in https://vanillajstoolkit.com/helpers/isinviewport/
  _vanillaIsInViewport(elem) {
    var distance = elem.getBoundingClientRect();
    return (
      distance.top < (window.innerHeight || document.documentElement.clientHeight) &&
      distance.bottom > 0
    );
  }

}


