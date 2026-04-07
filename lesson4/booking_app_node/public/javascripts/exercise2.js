class TimeoutError extends Error {
  constructor(message = 'Operation timed out') {
    super(message);
    this.name = 'TimeoutError';
  }
}

function withTimeout(promise, delay) {
  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => reject(new TimeoutError()), delay); 
  });

  return Promise.race([promise, timeoutPromise]);
}

function tallySchedules(schedules) {
  const tally = {};

  schedules.forEach(schedule => {
    const key = `staff ${schedule['staff_id']}`;
    tally[key] = (tally[key] || 0) + 1;
  });

  return tally;
}

async function fetchSchedules() {
  try {
    const response = await withTimeout(fetch('/api/schedules'), 3000);
    const schedules = await response.json();

    if (schedules.length > 0) {
      const tally = tallySchedules(schedules);
      alert(Object.entries(tally).map(([id, count]) => `${id}: ${count}`).join('\n'));
    } else {
      alert('There are currently no schedules available for booking');
    }
  } catch (error) {
    if (error instanceof TimeoutError) {
      alert('It is taking longer than usual, please try again later.');
    } else {
      console.error(error.message);
    }
  } finally {
    alert('The request has completed.');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const fetchScheduleAnchor = document.querySelector('.exercise2 a');

  fetchScheduleAnchor.addEventListener('click', event => {
    console.log('fetch anchor triggered');
    fetchSchedules();
  });
});