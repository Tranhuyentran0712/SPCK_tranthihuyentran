const cartItemsElement = document.getElementById("cart-items");
const totalPriceElement = document.getElementById("total-price");
const checkoutButton = document.getElementById("checkout-btn");

// Lấy dữ liệu giỏ hàng từ localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Hàm hiển thị các sản phẩm trong giỏ hàng
function renderCart() {
  cartItemsElement.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    cartItemsElement.innerHTML = "<p>Giỏ hàng của bạn đang trống.</p>";
    totalPriceElement.textContent = "0 VNĐ";
    return;
  }

  // Duyệt qua từng sản phẩm trong giỏ hàng
  cart.forEach((item) => {
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");

    cartItem.innerHTML = `
      <img src="${item.product_image}" alt="${item.product_name}" />
      <div class="cart-item-details">
        <h3>${item.product_name}</h3>
        <p>${item.product_price.toLocaleString()} VNĐ</p>
      </div>
      <button class="remove-btn" data-id="${item.product_id}">Xóa</button>
    `;

    // Tính tổng giá
    total += item.product_price;

    // Thêm sản phẩm vào danh sách giỏ hàng
    cartItemsElement.appendChild(cartItem);
  });

  // Hiển thị tổng giá
  totalPriceElement.textContent = `${total.toLocaleString()} VNĐ`;

  // Gắn sự kiện "Xóa" cho mỗi sản phẩm
  document.querySelectorAll(".remove-btn").forEach((button) => {
    button.addEventListener("click", (e) => {
      const productId = e.target.getAttribute("data-id");
      removeFromCart(productId);
    });
  });
}

// Hàm xóa sản phẩm khỏi giỏ hàng
function removeFromCart(productId) {
  // Lọc bỏ sản phẩm có ID tương ứng
  cart = cart.filter((item) => item.product_id.toString() !== productId);

  // Lưu lại danh sách giỏ hàng mới vào localStorage
  localStorage.setItem("cart", JSON.stringify(cart));

  // Hiển thị lại giỏ hàng
  renderCart();
}

// Xử lý nút "Hoàn tất đơn hàng"
checkoutButton.addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Giỏ hàng của bạn đang trống!");
    return;
  }

  alert("Đơn hàng của bạn đã được đặt thành công!");
  localStorage.removeItem("cart"); // Xóa giỏ hàng khỏi localStorage
  renderCart(); // Làm mới giao diện giỏ hàng
});

// Hiển thị giỏ hàng lần đầu
renderCart();
