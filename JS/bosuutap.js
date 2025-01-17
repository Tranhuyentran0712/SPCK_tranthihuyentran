fetch("/JS/products.json")
      .then((response) => response.json())
      .then((data) => {
        const collectionGrid = document.getElementById("collection-grid");
        const savedCollection = JSON.parse(localStorage.getItem("collection")) || [];

        if (savedCollection.length === 0) {
          collectionGrid.innerHTML = "<p>Bộ sưu tập của bạn đang trống.</p>";
          return;
        }

        // Lọc sản phẩm dựa trên ID trong localStorage
        const filteredProducts = data.filter((product) =>
          savedCollection.includes(product.product_id.toString())
        );

        // Hiển thị sản phẩm trong bộ sưu tập
        filteredProducts.forEach((product) => {
          const productCard = document.createElement("div");
          productCard.classList.add("collection-item");

          productCard.innerHTML = `
        <img src="${product.product_image}" alt="${product.product_name}" />
        <div class="info">
          <h3>${product.product_name}</h3>
          <p>${product.product_price.toLocaleString()} VNĐ</p>
          <button class="add-to-cart-btn" data-id="${product.product_id}">Add to Cart</button>
          <button class="remove-collection-btn" data-id="${product.product_id}">Remove from Collection</button>
        </div>
      `;

          collectionGrid.appendChild(productCard);
        });

        // Xử lý sự kiện "Remove from Collection"
        document.querySelectorAll(".remove-collection-btn").forEach((button) => {
          button.addEventListener("click", (e) => {
            const productId = e.target.getAttribute("data-id");
            removeFromCollection(productId);
          });
        });

        // Xử lý sự kiện "Add to Cart"
        document.querySelectorAll(".add-to-cart-btn").forEach((button) => {
          button.addEventListener("click", (e) => {
            const productId = e.target.getAttribute("data-id");
            addToCart(productId, data);
          });
        });
      })
      .catch((error) => {
        console.error("Đã có lỗi xảy ra!", error);
      });

    // Hàm xóa sản phẩm khỏi bộ sưu tập
    function removeFromCollection(productId) {
      let collection = JSON.parse(localStorage.getItem("collection")) || [];
      collection = collection.filter((id) => id !== productId);

      localStorage.setItem("collection", JSON.stringify(collection));
      alert("Sản phẩm đã được xóa khỏi bộ sưu tập.");
      location.reload(); // Tải lại trang để cập nhật danh sách
    }

    // Hàm thêm sản phẩm vào giỏ hàng
    function addToCart(productId, products) {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];

      // Tìm sản phẩm trong danh sách
      const product = products.find((item) => item.product_id.toString() === productId);

      if (product) {
        // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
        const isInCart = cart.some((item) => item.product_id === product.product_id);
        if (!isInCart) {
          cart.push(product);
          localStorage.setItem("cart", JSON.stringify(cart));
          alert("Sản phẩm đã được thêm vào giỏ hàng.");
        } else {
          alert("Sản phẩm đã có trong giỏ hàng.");
        }
      } else {
        alert("Không tìm thấy sản phẩm.");
      }
    }