// fetch("JS/products.json")
//   .then((response) => response.json())
//   .then((data) => {
//     const productListElement = document.getElementById("products");

//     data.forEach((product) => {
//       const categoryDiv = document.createElement("div");
//       categoryDiv.classList.add("category");

//       categoryDiv.innerHTML = `
//       <img scr="${product.product_image}" alt="${product.product_name}">
//       <h3>${product.product_name}</h3>
//       <p>Giá: ${product.product_price.toLocaleString()} VNĐ</p>`;
//       productListElement.appendChild(categoryDiv);
//     });
//   })
//   .catch((error) => {
//     console.error("Đã có lỗi xảy ra!", error);
//   });

fetch("JS/products.json")
  .then((response) => response.json())
  .then((data) => {
    const productListElement = document.getElementById("products");

    data.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.classList.add("product-card");

      productCard.innerHTML = `
        <img src="${product.product_image}" alt="${product.product_name}" />
        <h2>${product.product_name}</h2>
        <p>${product.product_price.toLocaleString()} VNĐ</p>`;

      productListElement.appendChild(productCard);
    });
  })
  .catch((error) => {
    console.error("Đã có lỗi xảy ra!", error);
  });
