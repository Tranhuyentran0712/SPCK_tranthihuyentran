// Lấy phần tử header
const header = document.querySelector("header");

// Theo dõi sự kiện scroll
window.addEventListener("scroll", () => {
  // Kiểm tra nếu cuộn xuống đủ khoảng cách (ví dụ: 50px)
  if (window.scrollY > 50) {
    header.classList.add("faded");
  } else {
    header.classList.remove("faded");
  }
});
fetch("https://fakestoreapi.com/carts")
  .then((res) => res.json())
  .then((json) => console.log(json));
