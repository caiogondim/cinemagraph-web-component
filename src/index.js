async function supportsVideoOnImg(videoSrc) {
  return new Promise((resolve) => {
    const img = document.createElement('img')
    img.onload = () => resolve(true)
    img.onerror = () => resolve(false)
    img.src = videoSrc
  })
}

function applyStyle(el) {
  el.style.width = '100%'
}

class VhsCinemagraph extends HTMLElement {
  static get observedAttributes() {
    return ['src', 'gif-fallback']
  }

  async connectedCallback() {
    const videoSrc = this.getAttribute('src')
    const shadow = this.attachShadow({ mode: 'open' })
    shadow.innerHTML = `
      <style>
        :host {
          display: inline-block;
          position: relative;
          width: 100%;
        }
      </style>
    `


    if (await supportsVideoOnImg(videoSrc)) {
      const img = document.createElement('img')
      img.onload = () => console.log('load')
      img.onerror = () => console.log('error')
      img.src = this.getAttribute('src')
      applyStyle(img)

      shadow.appendChild(img)
    } else {
      const video = document.createElement('video')
      video.src = this.getAttribute('src')
      video.muted = true
      video.autoplay = true
      video.loop = true
      applyStyle(video)

      shadow.appendChild(video)
    }
  }
}
window.customElements.define('vhs-cinemagraph', VhsCinemagraph)
