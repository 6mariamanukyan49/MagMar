// ========================================
// CATEGORY TABS
// ========================================

const categoryButtons = document.querySelectorAll(".category-link");
const categoryTabs = document.querySelectorAll(".menu-products .tab-pane");


categoryButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const category = button.dataset.category;


        // Remove active from all buttons

        categoryButtons.forEach(function (btn) {
            btn.classList.remove("active");
        });


        // Add active to clicked button

        button.classList.add("active");


        // Hide all categories

        categoryTabs.forEach(function (tab) {
            tab.classList.remove("show", "active");
        });


        // Show selected category

        const selectedTab = document.getElementById(category);

        if (selectedTab) {

            selectedTab.classList.add("show", "active");

        }

    });

});



// ========================================
// BASKET BUTTONS
// ========================================

const basketButtons = document.querySelectorAll(".basket-btn");


basketButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const product = {

            name: button.dataset.name,

            price: Number(button.dataset.price),

            image: button.dataset.image,

            quantity: 1

        };


        let basket =
            JSON.parse(localStorage.getItem("basket")) || [];


        const existingProduct = basket.find(
            item => item.name === product.name
        );


        if (existingProduct) {

            existingProduct.quantity += 1;

        } else {

            basket.push(product);

        }


        localStorage.setItem(
            "basket",
            JSON.stringify(basket)
        );


        // Button animation

        button.innerHTML = "✓ Added";

        button.classList.add("added");


        setTimeout(function () {

            button.innerHTML = "🛒 Add to Basket";

            button.classList.remove("added");

        }, 1000);


        updateBasketCount();

    });

});



// ========================================
// BASKET COUNT
// ========================================

function updateBasketCount() {

    const basket =
        JSON.parse(localStorage.getItem("basket")) || [];


    const totalQuantity = basket.reduce(
        (total, item) => total + item.quantity,
        0
    );


    const basketLink = document.querySelector(
        'a[href="./basket.html"]'
    );


    if (basketLink) {

        basketLink.innerHTML =
            `Basket 🛒 (${totalQuantity})`;

    }

}


// Initial basket count

updateBasketCount();
