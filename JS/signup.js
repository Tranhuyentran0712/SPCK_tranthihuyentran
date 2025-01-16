const form = document.getElementById("form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  let newUser = {
    Name: form.name.value,
    Email: form.email.value,
    Password: form.password.value,
  };
  const get_user = JSON.parse(localStorage.getItem(form.email.value));
  if (get_user) {
    if (get_user.Email === newUser.Email) {
      alert("Email đã tồn tại!");
    }
  } else {
    localStorage.setItem(form.email.value, JSON.stringify(newUser));
    alert("Đăng ký thành công!");
    window.location.href = "";
  }
});
