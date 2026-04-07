import templates from './templates.js';

class PhotoGalleryUI {
  #photos;
  #comments;
  #activeIndex = 0;

  constructor() {
    this.#renderPage();
  }
  
  // ---- Asynchronous Helpers ----

  async #renderPage() {
    await this.#fetchPhotos();
    this.#grabElements();
    this.#renderPhotos();
    this.#renderPhotoInformation();
    await this.#fetchComments();
    this.#renderComments();
    this.#setupEventListeners();
  }

  async #fetchPhotos() {
    const response = await fetch('/photos');
    this.#photos = await response.json();
  }

  async #fetchComments() {
    const response = await fetch(`/comments?photo_id=${this.#getActivePhotoId()}`);
    this.#comments = await response.json();
  }

  async #transitionSlide() {
    const figures = this.slides.querySelectorAll('figure');
    const activeFigure = figures[this.#activeIndex];

    figures.forEach(fig => {
      fig.classList.remove('show');
      fig.classList.add('hide');
    });

    activeFigure.classList.remove('hide');
    activeFigure.classList.add('show');

    this.#renderPhotoInformation();
    await this.#fetchComments();
    this.#renderComments();
  }

  // ---- Setup Helpers ----

  #grabElements() {
    this.slides = document.getElementById('slides');
    this.infoHeader = document.getElementById('information');
    this.commentsList = document.querySelector('#comments ul');
    this.commentsForm = document.querySelector('#comments form');
    this.prevAnchor = document.querySelector('.prev');
    this.nextAnchor = document.querySelector('.next');
  }

  #setupEventListeners() {
    this.prevAnchor.addEventListener('click', event => this.#handlePrev(event));
    this.nextAnchor.addEventListener('click', event => this.#handleNext(event));
    this.infoHeader.addEventListener('click', event => this.#addClick(event));
    this.commentsForm.addEventListener('submit', event => this.#addComment(event));
  }

  // ---- Event Handlers ----

  #handlePrev(event) {
    event.preventDefault();
    const photosLength = this.#photos.length;
    this.#activeIndex = (this.#activeIndex - 1 + photosLength) % photosLength;
    this.#transitionSlide();
  }

  #handleNext(event) {
    event.preventDefault();
    const photosLength = this.#photos.length;
    this.#activeIndex = (this.#activeIndex + 1) % photosLength;
    this.#transitionSlide();
  }

  async #addClick(event) {
    event.preventDefault();
    const button = event.target;
    const buttonType = button.getAttribute('data-property');
    if (!buttonType) return;

    const href = button.getAttribute('href');
    const text = button.textContent;

    const response = await fetch(href, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
      body: `photo_id=${this.#getActivePhotoId()}`,
    });

    const json = await response.json();
    button.textContent = text.replace(/\d+/, json.total);
    this.#photos[this.#activeIndex][buttonType] = json.total;
  }

  async #addComment(event) {
    event.preventDefault();
    this.commentsForm.querySelector('[name="photo_id"]').value = this.#getActivePhotoId();
    const data = Object.fromEntries(new FormData(this.commentsForm));
    const response = await fetch('/comments/new', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=UTF-8' },
      body: JSON.stringify(data),
    });

    this.#comments.push(await response.json());
    this.#renderComments();
    this.commentsForm.reset();
  }

  // ---- Rendering Helpers ----

  #renderPhotos() {
    this.slides.innerHTML = templates.photos(this.#photos);
  }

  #renderPhotoInformation() {
    const photo = this.#photos[this.#activeIndex];
    this.infoHeader.innerHTML = templates.photoInformation(photo);
  }

  #renderComments() {
    this.commentsList.innerHTML = templates.comments(this.#comments);
  }

  // --- Other Misc. Helpers ----

  #getActivePhotoId() {
    return this.#photos[this.#activeIndex].id;
  }
}

document.addEventListener('DOMContentLoaded', () => new PhotoGalleryUI());