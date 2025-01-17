fetch("/JS/products.json")
  .then((response) => response.json())
  .then((data) => {
    const productListElement = document.getElementById("products");

    data.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.classList.add("product-card");

      productCard.innerHTML = `
        <img src="${product.product_image}" alt="${product.product_name}" />
        <h2>${product.product_name}</h2>
        <p>${product.product_price.toLocaleString()} VNĐ</p>
        <button class="buy-btn" data-id="${
          product.product_id
        }">Add to Card</button>
        <button class="add-to-collection-btn" data-id="${
          product.product_id
        }">Add to Collection</button>
      `;

      productListElement.appendChild(productCard);
    });

    // Xử lý thêm sản phẩm vào bộ sưu tập
    const collectionButtons = document.querySelectorAll(
      ".add-to-collection-btn"
    );
    collectionButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const productId = button.getAttribute("data-id");
        addToCollection(productId);
      });
    });

    // Xử lý thêm sản phẩm vào giỏ hàng
    const buyButtons = document.querySelectorAll(".buy-btn");
    buyButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const productId = button.getAttribute("data-id");
        addToCartAndRedirect(productId, data);
      });
    });
  })
  .catch((error) => {
    console.error("Đã có lỗi xảy ra!", error);
  });

// Hàm thêm ID sản phẩm vào bộ sưu tập
function addToCollection(productId) {
  let collection = JSON.parse(localStorage.getItem("collection")) || [];

  if (!collection.includes(productId)) {
    collection.push(productId); // Thêm ID sản phẩm vào danh sách
    localStorage.setItem("collection", JSON.stringify(collection)); // Lưu lại vào localStorage
    alert("Sản phẩm đã được thêm vào bộ sưu tập.");
  } else {
    alert("Sản phẩm này đã có trong bộ sưu tập.");
  }
  // console.log("Collection:", collection);
}

// Hàm thêm sản phẩm vào giỏ hàng
function addToCartAndRedirect(productId, products) {
  // Lấy danh sách giỏ hàng từ localStorage
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Tìm sản phẩm theo ID
  const product = products.find(
    (item) => item.product_id.toString() === productId
  );

  if (product) {
    // Kiểm tra sản phẩm đã có trong giỏ hàng chưa
    const isInCart = cart.some(
      (item) => item.product_id === product.product_id
    );
    if (!isInCart) {
      cart.push(product); // Thêm sản phẩm vào giỏ hàng
      localStorage.setItem("cart", JSON.stringify(cart)); // Lưu lại giỏ hàng
      alert("Sản phẩm đã được thêm vào giỏ hàng.");
    } else {
      alert("Sản phẩm đã tồn tại trong giỏ hàng.");
    }
  }
}
