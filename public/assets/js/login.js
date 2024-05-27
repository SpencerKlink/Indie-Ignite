const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
    
});

const passwordInput = document.getElementById("password-login");
const signupInput = document.getElementById("password-signup");
const confirmPass = document.getElementById("password-confirm");
const showPassword = document.querySelector(".password-toggle-icon i");
const showSignUp = document.querySelector(".sign-up-toggle-icon i");

showPassword.addEventListener("click", function () {
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    showPassword.classList.remove("fa-eye");
    showPassword.classList.add("fa-eye-slash");
  } else {
    passwordInput.type = "password";
    showPassword.classList.remove("fa-eye-slash");
    showPassword.classList.add("fa-eye");
  }
});



showSignUp.addEventListener("click", function () {
    if (signupInput.type === "password" && confirmPass.type === "password") {
      signupInput.type = "text";
      confirmPass.type = "text";
      showSignUp.classList.remove("fa-eye");
      showSignUp.classList.add("fa-eye-slash");
    } else {
      signupInput.type = "password";
      confirmPass.type = "password";
      showSignUp.classList.remove("fa-eye-slash");
      showSignUp.classList.add("fa-eye");
    }
  });

const loginFormHandler = async (event) => {

    event.preventDefault();

    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if (email && password) {

        const response = await fetch('api/users/login/', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert('Failed to log in');
        }
    }
};

const signupFormHandler = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    const confirmPass = document.querySelector('#password-confirm').value.trim();
if(password === confirmPass) {
   
    if (username && email && password) {
        const response = await fetch('api/users/signup', {
            method: 'POST',
            body: JSON.stringify({ username, email, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert('Failed to sign up.');
        }
    }
} else {
    alert("passwords do not match");
    return;
}
};

document
    .querySelector('.login-form')
    .addEventListener('submit', loginFormHandler);
document
    .querySelector('.signup-form')
    .addEventListener('submit', signupFormHandler);


