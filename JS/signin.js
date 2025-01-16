const form = document.getElementById(form);
form.addEventListener("submit", (event) => {
  event.preventDefault();
  let user = {
    Email: form.email.value,
    Password: form.password.value,
  };
  const get_user = JSON.parse(localStorage.getItem(user.Email));
  if (get_user) {
    if (get_user.Email === user.Email && get_user.Password === user.Password) {
      alert("Đăng nhập thành công!");
      window.location.href = "../index.html";
    } else {
      alert("Email hoặc Mật khẩu sai!");
    }
  } else {
    alert("Email hoặc Mật khẩu sai");
  }
});
