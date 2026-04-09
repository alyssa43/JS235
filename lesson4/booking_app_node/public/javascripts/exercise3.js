document.addEventListener('DOMContentLoaded', () => {
  const addStaffForm = document.querySelector('.exercise3 form');

  addStaffForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(addStaffForm);
    const json = JSON.stringify(Object.fromEntries(formData));

    const response = await fetch('/api/staff_members', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=UTF-8'},
      body: json,
    });
  
    switch (response.status) {
      case 201: {
        const data = await response.json();
        alert(`Successfully created staff with id: ${data.id}`);
        addStaffForm.reset();
        break;
      }
      case 400: {
        alert(await response.text());
        break;
      }
    }
  });
});