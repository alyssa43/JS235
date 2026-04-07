class ScheduleUI {
  constructor() {
    this.scheduleCount = 0;
    this.form = document.querySelector('.exercise4 form');
    this.scheduleContainer = document.getElementById('schedules');
    this.btnAdd = document.getElementById('btnAdd');
    this.#init();
  }

  // ---- Setup Helpers ----
  
  async #init() {
    this.staffMembers = await this.#fetchStaffMembers();
    this.#setupEventListeners();
  }

  #setupEventListeners() {
    this.btnAdd.addEventListener('click', event => this.#addScheduleForm(event));
    this.form.addEventListener('submit', event => this.#handleSubmit(event));
  }

    // ---- Event Handlers ---- 

  #addScheduleForm(event) {
    event.preventDefault();
    this.scheduleCount += 1
    const html = this.#scheduleTemplate();
    this.scheduleContainer.insertAdjacentHTML('beforeend', html);
  }

  async #handleSubmit(event) {
    event.preventDefault();
    const json = JSON.stringify(this.#formInputsToJson(event.target));

    const response = await fetch(event.target.action, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=UTF-8'},
      body: json,
    });

    if (response.status === 201) this.form.reset();
    alert(await response.text());
  }

  // ---- Data Fetching Helpers ---- 

  async #fetchStaffMembers() {
    const response = await fetch('/api/staff_members');
    return response.json();
  }
  
  // ---- Template Helpers ----
  
  #formInputsToJson(form) {
    const json = [];
    for (let i = 0; i < this.scheduleCount; i += 1) {
      json.push({
        staff_id: form[`staff_${i + 1}`].value,
        date: form[`date_${i + 1}`].value,
        time: form[`time_${i + 1}`].value,
      });
    }

    return { schedules: json };
  }

  #scheduleTemplate() {
    const staffOptions = this.staffMembers.map(({ id, name }) =>
      `<option value="${id}">${name}</option>`).join('');

    return `
      <fieldset id="schedule_${this.scheduleCount}">
        <legend>Schedule ${this.scheduleCount}</legend>

        <div>
          <label for="staff_${this.scheduleCount}">Staff Name:</label>
          <select id="staff_${this.scheduleCount}" name="staff_${this.scheduleCount}">${staffOptions}</select>
        </div>

        <div>
          <label for="date_${this.scheduleCount}">Date:</label>
          <input type="text" id="date_${this.scheduleCount}" name="date_${this.scheduleCount}" placeholder="mm-dd-yy">
        </div>

        <div>
          <label for="time_${this.scheduleCount}">Time:</label>
          <input type="text" id="time_${this.scheduleCount}" name="time_${this.scheduleCount}" placeholder="hh:mm">
        </div>

      </fieldset>`;
  }
}

document.addEventListener('DOMContentLoaded', () => new ScheduleUI());