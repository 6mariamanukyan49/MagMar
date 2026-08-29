document.addEventListener("DOMContentLoaded", function () {

    const basketContainer =
        document.getElementById("basketContainer");


    function getBasket() {

        return JSON.parse(
            localStorage.getItem("basket")
        ) || [];

    }


    function saveBasket(basket) {

        localStorage.setItem(
            "basket",
            JSON.stringify(basket)
        );

    }


    function renderBasket() {

        const basket = getBasket();


        // Եթե զամբյուղը դատարկ է
        if (basket.length === 0) {

            basketContainer.innerHTML = `

                <div class="empty-basket">

                    <div class="empty-icon">
                        🛒
                    </div>

                    <h2>
                        Your basket is empty
                    </h2>

                    <p>
                        Add some beautiful handmade products.
                    </p>

                    <a
                        href="./menu.html"
                        class="basket-back-btn">

                        ← Continue Shopping

                    </a>

                </div>

            `;

            return;

        }


        let total = 0;


        let productsHTML = "";


        basket.forEach(function (product, index) {

            const productTotal =
                product.price * product.quantity;

            total += productTotal;


            productsHTML += `

                <div class="basket-item">

                    <div class="basket-product">

                        <img
                            src="${product.image}"
                            alt="${product.name}">

                        <div>

                            <h3>
                                ${product.name}
                            </h3>

                            <p>
                                $${product.price}
                            </p>

                        </div>

                    </div>


                    <div class="basket-controls">

                        <button
                            class="quantity-btn"
                            onclick="decreaseQuantity(${index})">

                            −

                        </button>


                        <span class="quantity">
                            ${product.quantity}
                        </span>


                        <button
                            class="quantity-btn"
                            onclick="increaseQuantity(${index})">

                            +

                        </button>

                    </div>


                    <div class="basket-price">

                        $${productTotal}

                    </div>


                    <button
                        class="delete-btn"
                        onclick="removeProduct(${index})">

                        🗑️

                    </button>

                </div>

            `;

        });


        basketContainer.innerHTML = `

            <div class="basket-list">

                ${productsHTML}

            </div>


            <div class="basket-summary">

                <div class="summary-row">

                    <span>
                        Total
                    </span>

                    <strong>
                        $${total}
                    </strong>

                </div>


                <div class="summary-buttons">

                    <a
                        href="./menu.html"
                        class="continue-btn">

                        ← Continue Shopping

                    </a>


                    <a
                        href="./orders.html"
                        class="checkout-btn">

                        Checkout →

                    </a>

                </div>

            </div>

        `;

    }


    // Ավելացնել քանակը
    window.increaseQuantity = function (index) {

        const basket = getBasket();

        basket[index].quantity += 1;

        saveBasket(basket);

        renderBasket();

    };


    // Պակասեցնել քանակը
    window.decreaseQuantity = function (index) {

        const basket = getBasket();

        if (basket[index].quantity > 1) {

            basket[index].quantity -= 1;

        } else {

            basket.splice(index, 1);

        }

        saveBasket(basket);

        renderBasket();

    };


    // Ջնջել ապրանքը
    window.removeProduct = function (index) {

        const basket = getBasket();

        basket.splice(index, 1);

        saveBasket(basket);

        renderBasket();

    };


    renderBasket();

});
