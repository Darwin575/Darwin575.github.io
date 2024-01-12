let accounts = JSON.parse(localStorage.getItem('accounts')) || []; // Retrieve accounts from local storage

// Function to validate and create a new account
function createAccount(event) {
  event.preventDefault(); // Prevent default form submission

  const username = document.getElementById('createUsername').value;
  const password = document.getElementById('createPassword').value;

  // Check for empty fields
  if (!username || !password) {
    alert('Please enter both username and password!');
    return;
  }

  // Check for duplicate username
  if (accounts.some(account => account[0] === username)) {
    alert('Username already exists!');
    return;
  }

  // Add the new account to the array
  accounts.push([username, password]);
  localStorage.setItem('accounts', JSON.stringify(accounts)); // Store updated array in local storage

  alert('Account created successfully!');

  // Switch back to login form
  document.getElementById('loginForm').classList.remove('hidden');
  document.getElementById('createAccountForm').classList.add('hidden');
}

// Function to check login credentials
function checkLogin(event) {
  event.preventDefault(); // Prevent default form submission

  accounts = JSON.parse(localStorage.getItem('accounts')) || []; // Retrieve accounts from local storage

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const matchingAccount = accounts.find(account => account[0] === username && account[1] === password);

  if (matchingAccount) {
    window.location.href = 'hello.html'; // Ensure this file exists and is accessible
  } else {
    alert('Invalid username or password');
  }
}

// Event listeners for form submission
const loginForm = document.getElementById('loginForm');
const createAccountForm = document.getElementById('createAccountForm');

loginForm.addEventListener('submit', checkLogin);
createAccountForm.addEventListener('submit', createAccount);
