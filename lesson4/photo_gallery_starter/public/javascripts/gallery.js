import templates from './templates.js';

class PhotoGallery {
  #photos;
  #comments;
  #activeIndex = 0; // added

  constructor() {
    this.slides = document.getElementById('slides');
    this.infoHeader = document.getElementById('information');
    this.commentsList = document.querySelector('#comments ul');
    this.prevAnchor = document.querySelector('.prev');
    this.nextAnchor = document.querySelector('.next');

    this.#setupEventListeners();
  }

  #setupEventListeners() {
    this.prevAnchor.addEventListener('click', event => this.#handlePrev(event));
    this.nextAnchor.addEventListener('click', event => this.#handleNext(event));
  }

  async init() {
    await this.#fetchPhotos();
    this.#renderPhotos();
    this.#renderPhotoInformation();
    await this.#fetchComments();
    this.#renderComments();
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

  #getActivePhotoId() {
    return this.#photos[this.#activeIndex].id;
  }

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
}

document.addEventListener('DOMContentLoaded', () => new PhotoGallery().init());