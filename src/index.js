async function supportsVideoOnImg(videoSrc) {
  return new Promise((resolve) => {
    const img = document.createElement('img')
    img.onload = () => resolve(true)
    img.onerror = () => resolve(false)
    img.src = videoSrc
  })
}

class VhsCinemagraph extends HTMLElement {
  static get observedAttributes() {
    return ['src', 'gif-fallback']
  }

  async connectedCallback() {
    const videoSrc = this.getAttribute('src')
    const shadow = this.attachShadow({ mode: 'open' })


    if (await supportsVideoOnImg(videoSrc)) {
      const img = document.createElement('img')
      img.onload = () => console.log('load')
      img.onerror = () => console.log('error')
      img.src = this.getAttribute('src')
      shadow.appendChild(img)
    } else {
      const video = document.createElement('video')
      video.src = this.getAttribute('src')
      video.muted = true
      video.autoplay = true
      video.loop = true

      shadow.appendChild(video)
    }
  }
}
window.customElements.define('vhs-cinemagraph', VhsCinemagraph)
