class StudentCreationUI {
  constructor(studentEmail, bookingSequence, onSuccess) {
    this.studentEmail = studentEmail;
    this.bookingSequence = bookingSequence;
    this.onSuccess = onSuccess;
    this.newStudentForm = document.getElementById('newStudentForm');
    this.emailInput = document.getElementById('email');
    this.bookingSequenceInput = document.getElementById('booking_sequence');
    this.#displayPrefilledForm();
    this.#setupEventListeners();
  }

  #setupEventListeners() {
    this.newStudentForm.addEventListener('submit', event => this.#handleSubmit(event));
  }

  async #createStudent() {
    const formData = new FormData(this.newStudentForm);
    const response = await fetch('/api/students', {
      method: 'POST',
      body: formData,
    });

    return response;
  }

  async #handleSubmit(event) {
    event.preventDefault();
    const response = await this.#createStudent();
    const responseText = await response.text();

    if (response.ok) {
      alert(responseText);
      this.newStudentForm.hidden = true;
      this.onSuccess();
    }
  }

  #displayPrefilledForm() {
    this.emailInput.value = this.studentEmail;
    this.bookingSequenceInput.value = this.bookingSequence;
    this.newStudentForm.hidden = false;
  }
}

class StudentBookingUI {
  constructor() {
    this.bookingForm = document.getElementById('newBookingForm');
    this.select = this.bookingForm.querySelector('select');
    this.submitButton = document.getElementById('submitBtn');
    this.#addScheduleOptions();
    this.#setupEventListeners();
  }

  #setupEventListeners() {
    this.bookingForm.addEventListener('submit', event => this.#handleSubmit(event));
  }

  async #handleSubmit(event) {
    event.preventDefault();
    await this.#submitBooking();
  }

  async #submitBooking() {
      const formData = new FormData(this.bookingForm);
      const studentEmail = formData.get('student_email');
      const selectedId = this.select.value;
      const json = JSON.stringify({ id: selectedId, student_email: studentEmail });
  
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: json,
      });

      if (response.ok) {
        alert('Booked');
        this.bookingForm.reset();
        await this.#addScheduleOptions();
      } else if (response.status === 404) {
        const errorText = await response.text();
        alert(errorText);
        const bookingSequence = errorText.match(/\d+/)[0];
        new StudentCreationUI(studentEmail, bookingSequence, () => this.#submitBooking());
      }
  }

  async #addScheduleOptions() {
    this.select.innerHTML = '';
    this.submitButton.hidden = true;
    const staff = await this.#fetchStaff();
    const available = await this.#fetchAvailableSchedules();

    available.forEach(sch => {
      const currentStaff = staff.find(s => s.id === sch.staff_id);
      const option = this.#createScheduleOption(sch, currentStaff);
      this.select.appendChild(option);
    });

    this.submitButton.hidden = false;
  }

  #createScheduleOption(schedule, staff) {
    const option = document.createElement('option');
    option.setAttribute('value', schedule.id);
    option.textContent = `${schedule.id} | ${staff.name} | ${schedule.date} | ${schedule.time}`;
    return option;
  }
  
  async #fetchAvailableSchedules() {
    const schedules = await this.#fetchSchedules();
    return schedules.filter(sch => !sch.student_email);
  }

  async #fetchSchedules() {
    const response = await fetch('/api/schedules');
    return response.json();
  }

  async #fetchStaff() {
    const response = await fetch('/api/staff_members');
    return response.json();
  }
}

document.addEventListener('DOMContentLoaded', () => new StudentBookingUI());