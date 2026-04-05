import templates from './templates.js';

// templates.photo ({id, src, caption})
// templates.photos (photosArray)
// templates.photoInformation({title, created_at, id, likes, favorites})
// templates.comment({gravatar, name, date, body})
// templates.comments(commentsArray)

let photos;
let comments;

async function fetchPhotos() {
  let response = await fetch('/photos');
  return response.json();
}

function renderPhotos() {
  let slides = document.getElementById('slides');
  slides.innerHTML = templates.photos(photos);
}

function renderPhotoInformation(idx) {
  let photo = photos.find(item => item.id === idx);
  let header = document.getElementById('information');
  header.innerHTML = templates.photoInformation(photo);
}

async function fetchCommentsFor(id) {
  let response = await fetch(`/comments?photo_id=${id}`);
  return response.json();
}

function renderComments() {
  let commentsList = document.querySelector('#comments ul');
  commentsList.innerHTML = templates.comments(comments);
}

async function main() {
  photos = await fetchPhotos();
  let activePhotoId = photos[0].id;
  renderPhotos();
  renderPhotoInformation(activePhotoId);

  comments = await fetchCommentsFor(activePhotoId);
  renderComments();
}

document.addEventListener('DOMContentLoaded', main);