let users = JSON.parse(localStorage.getItem("users")) || [];
let continueBtn = document.getElementById("btn-continue");
console.log(continueBtn);
let loginForm = document.getElementById("login-form");
let error = document.querySelector(".error-message");
let signupForm = document.querySelector(".signup-form");
let errorSignup = document.querySelector(".error-signup");

// Thêm phần tử user mới vào trong mảng user trong local storage

signupForm.onsubmit = function (e) {
  e.preventDefault();
  let signupEmail = signupForm.email.value;
  let signupPasswword = signupForm.password.value;
  let birthdate = signupForm.birthdate.value;
  let emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  let passRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  let errorMessage = "";

  if (!emailRegex.test(signupEmail) || !passRegex.test(signupPasswword)) {
    if (!emailRegex.test(signupEmail)) {
      errorMessage = errorMessage + "Email không hợp lệ<br/>";
    }
    if (!passRegex.test(signupPasswword)) {
      errorMessage = errorMessage + "Password không hợp lệ<br/>";
    }
    if (errorMessage) {
      errorSignup.innerHTML = errorMessage;
      errorSignup.style.display = "block";
    } else {
      errorMessage.innerHTML = "";
      errorSignup.style.display = "none";
    }
  } else if (usersLogin.find((user) => user.email == signupEmail)) {
    console.log("checkemail");
    errorMessage = errorMessage + "Email đã tồn tại";
    errorSignup.innerHTML = errorMessage;
    errorSignup.style.display = "block";
  } else {
    let newUser = {
      id: Math.floor(Math.random() * 1000000),
      email: signupEmail,
      password: signupPasswword,
      birthdate: birthdate,
      isLogin: false,
    };
    users.push(newUser);
    console.log("45", users);
    localStorage.setItem("users", JSON.stringify(users));
    signupEmail.value = "";
    signupPasswword.value = "";
    window.location.href = "./home.html";
  }
};

// lấy thông tin đăng từ local Storage để login

let usersLogin = JSON.parse(localStorage.getItem("users"));
loginForm.onsubmit = function (e) {
  e.preventDefault();
  let loginEmail = loginForm.email.value;
  let loginPassword = loginForm.password.value;
  let foundUser = usersLogin.find(function (user) {
    return user.email === loginEmail && user.password === loginPassword;
  });
  if (foundUser) {
    foundUser.isLogin = true;
    localStorage.setItem("loginUser", JSON.stringify(foundUser));
    window.location.href = "./mainpage.html";
  } else {
    alert("tài khoản ko hợp lệ");
  }
};
