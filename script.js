let cart = [];

function addToCart(name, price) {
    cart.push({ name, price });
    updateCart();
    alert("Đã thêm sản phẩm vào giỏ hàng!");
}

function updateCart() {
    const cartList = document.getElementById("cart-list");
    const cartCount = document.getElementById("cart-count");
    const totalPrice = document.getElementById("total-price");

    if (!cartList || !cartCount || !totalPrice) return;

    cartList.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;

        cartList.innerHTML += `
            <div class="cart-item">
                <span>${item.name}</span>
                <strong>${item.price.toLocaleString()}đ</strong>
                <button onclick="removeItem(${index})">Xóa</button>
            </div>
        `;
    });

    cartCount.innerText = cart.length;
    totalPrice.innerText = total.toLocaleString() + "đ";
}

function removeItem(index) {
    cart.splice(index, 1);
    updateCart();
}

function toggleCart() {
    const cartSection = document.getElementById("cart-section");
    if (!cartSection) return;

    if (cartSection.style.display === "block") {
        cartSection.style.display = "none";
    } else {
        cartSection.style.display = "block";
        cartSection.scrollIntoView({ behavior: "smooth" });
    }
}

function checkout() {
    if (cart.length === 0) {
        alert("Giỏ hàng đang trống!");
    } else {
        alert("Cảm ơn bạn đã đặt hàng!");
        cart = [];
        updateCart();
    }
}

function filterProducts() {
    const brandFilter = document.getElementById("brand-filter");
    const categoryFilter = document.getElementById("category-filter");

    if (!brandFilter || !categoryFilter) return;

    const brandValue = brandFilter.value;
    const categoryValue = categoryFilter.value;

    const products = document.querySelectorAll(".product-card");

    products.forEach(product => {
        const productBrand = product.getAttribute("data-brand");
        const productCategory = product.getAttribute("data-category");

        const matchBrand = brandValue === "all" || brandValue === productBrand;
        const matchCategory = categoryValue === "all" || categoryValue === productCategory;

        if (matchBrand && matchCategory) {
            product.style.display = "block";
        } else {
            product.style.display = "none";
        }
    });
}