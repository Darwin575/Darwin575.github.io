let selectedServices = [];

const appointmentForm = document.getElementById('appointmentForm');
const appointmentDetails = document.getElementById('appointmentDetails');
const cancelAppointmentButton = document.getElementById('cancelAppointment');

let currentAppointment = null; // Store the current appointment data

const logoutButton = document.getElementById('logoutButton');
logoutButton.addEventListener('click', () => {
  window.location.href = 'login.html'; // Redirect to login.html
});

// Handle checkbox changes
const checkboxes = document.querySelectorAll('input[type="checkbox"]');
checkboxes.forEach((checkbox) => {
  checkbox.addEventListener('change', () => {
    selectedServices = []; // Clear the array before collection
    checkboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        selectedServices.push(checkbox.value);
      }
    });
  });
});

window.addEventListener('load', () => {
  // Retrieve appointment from storage (replace with your storage method)
  const storedAppointment = localStorage.getItem('appointment'); // Example using local storage
  if (storedAppointment) {
    currentAppointment = JSON.parse(storedAppointment);
    displayAppointmentDetails(currentAppointment);
    cancelAppointmentButton.disabled = false;
  }
});

// Function to store appointment in local storage (example)
function storeAppointment(appointment) {
  localStorage.setItem('appointment', JSON.stringify(appointment));
}

// Function to handle form submission and book the appointment
appointmentForm.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent default form submission

  const selectedDate = document.getElementById('date').value;
  const selectedTime = document.getElementById('time').value;

  // Validate date and time
  const today = new Date();
  const selectedDateTime = new Date(selectedDate + ' ' + selectedTime);

  if (selectedDateTime <= today) {
    alert('Please choose a date and time in the future.');
    return; // Stop further processing if invalid
  }

  const twoHoursFromNow = new Date();
  twoHoursFromNow.setHours(twoHoursFromNow.getHours() + 2);

  if (selectedDateTime < twoHoursFromNow) {
    alert('Appointments must be booked at least 2 hours in advance.');
    return; // Stop further processing if invalid
  }

  if (selectedServices.length === 0) {
    alert('Please select at least one service to book an appointment.');
    return;
  }

  // Check for at least one selected service
  

  // Create appointment object
  const appointment = {
    date: selectedDate,
    time: selectedTime,
    services: selectedServices
  };

  // Store appointment in local storage
  storeAppointment(appointment);

  // Display confirmation and details
  alert('Appointment booked successfully!');
  displayAppointmentDetails(appointment);

  // Enable cancel button
  cancelAppointmentButton.disabled = false;
});

// Function to display appointment details
function displayAppointmentDetails(appointment) {
  appointmentDetails.innerHTML = `
    <h3>Appointment Details</h3>
    <p>Date: ${appointment.date}</p>
    <p>Time: ${appointment.time}</p>
    <p>Services: ${appointment.services.join(', ')}</p>
  `;
}

// Function to handle cancel button click
cancelAppointmentButton.addEventListener('click', () => {
  // Remove appointment from local storage
  localStorage.removeItem('appointment');

  // Clear appointment details and disable button
  appointmentDetails.innerHTML = '';
  cancelAppointmentButton.disabled = true;

  alert('Appointment cancelled successfully!');
});
