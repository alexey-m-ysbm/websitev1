export default class VideoModal {
  constructor(videoElement) {
    this.isOpen = false;
    this.videoElement = videoElement;
    this.containerElement = document.querySelector('.js-video-modal');
    this.containerElementFrame = document.querySelector('.js-video-modal-frame');
    this.openBtnElements = videoElement.querySelectorAll('.js-video-modal-btn');
    this.closeBtnElements = document.querySelectorAll('.js-video-modal-btn-close');
    this.openModalHandler = this.openModalHandler.bind(this);
    this.closeModalHandler = this.closeModalHandler.bind(this);
    this.addListeners();
  }

  addListeners() {
    [...this.openBtnElements].forEach((el) => el.addEventListener('click', this.openModalHandler));
    [...this.closeBtnElements].forEach((el) => el.addEventListener('click', this.closeModalHandler));
  }

  removeListeners() {
    [...this.openBtnElements].forEach((el) => el.removeEventListener('click', this.openModalHandler));
    [...this.closeBtnElements].forEach((el) => el.removeEventListener('click', this.closeModalHandler));
  }

  closeModalHandler(event) {
    this.isOpen = false;
    this.render(event);
  }

  openModalHandler(event) {
    this.isOpen = true;
    this.render(event);
  }

  render(event) {
    if (this.isOpen) {
      const id = event.currentTarget.getAttribute('data-youtube-id');
      const autoplay = '?autoplay=1';
      const relatedNo = '&rel=0';
      const src = `//www.youtube.com/embed/${id}${autoplay}${relatedNo}`;
      this.containerElementFrame.setAttribute('src', src);
    } else {
      this.containerElementFrame.setAttribute('src', '');
    }

    document.body.style.overflow = this.isOpen ? 'hidden' : 'auto';
    this.containerElement.classList.toggle('active', this.isOpen);
    // this.containerElement.childNodes this.openBtnElements.attr('data-youtube-id')
  }
}
