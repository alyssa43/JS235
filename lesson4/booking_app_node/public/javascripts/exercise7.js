// Forms use data-method and data-path attributes to specify
// the HTTP method and API endpoint path for cancellations
async function handleSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const id = formData.get('id');

  const response = await fetch(`/api/${form.dataset.path}/${id}`, {
    method: form.dataset.method,
  });

  const status = response.status;

  if (status === 204) {
    alert('Successfully cancelled');
  } else if (status === 403 || status === 404) {
    const errorText = await response.text();
    alert(errorText);
  }

  form.reset();
}


document.addEventListener('DOMContentLoaded', async () => {
  const forms = document.querySelectorAll('form');
  forms.forEach(form => form.addEventListener('submit', e => handleSubmit(e)));
});