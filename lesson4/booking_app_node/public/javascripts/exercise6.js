class BookingsListUI {
  constructor() {
    this.bookingsList = document.querySelector('#bookings ul');
    this.#loadBookedList();
  }

  async #loadBookedList() {
    const bookedSchedules = await this.#fetchBookedSchedules();

    for (const sch of bookedSchedules) {
      const staffName = await this.#getStaffNameById(sch.staff_id);
      const li = this.#addListItem(sch);
      const nestedUl = this.#addNestedListItem(li, sch, staffName);

      li.addEventListener('click', () => nestedUl.hidden = !nestedUl.hidden);
    }
  }

  #addListItem(schedule) {
    const li = document.createElement('li');
    li.textContent = schedule.date;
    this.bookingsList.appendChild(li);
    return li;
  }

  #addNestedListItem(listItem, schedule, staffName) {
    const nestedUl = document.createElement('ul');
    const nestedLi = document.createElement('li');

    nestedUl.hidden = true;
    nestedLi.textContent = `${staffName} | ${schedule.student_email} | ${schedule.time}`;
    nestedUl.appendChild(nestedLi);
    listItem.appendChild(nestedUl);
    return nestedUl;
  }

  async #fetchBookedSchedules() {
    const schedules = await this.#fetchSchedules();
    return schedules.filter(sch => sch.student_email);
  }

  async #fetchSchedules() {
    const response = await fetch('/api/schedules');
    return response.json();
  }
  
  async #getStaffNameById(staffId) {
    const allStaff = await this.#fetchStaff();
    return allStaff.find(staff => staff.id === staffId).name;
  }

  async #fetchStaff() {
    const response = await fetch('/api/staff_members');
    return response.json();
  }
}

document.addEventListener('DOMContentLoaded', () => new BookingsListUI());