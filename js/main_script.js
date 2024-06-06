import { listOfBooks } from "./module.js";
let books = listOfBooks;

let searchResult = '';

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("search").addEventListener("click", function () {
        const searchInput = document.querySelector("header .head-info .search input").value;
        searchResult = searchInput;
        launchBooks();
    })
});

let categories = [];
let origins = [];
let coverTypes = [];
let availabilities = [];

let cartStates;
if (sessionStorage.getItem('states') === null) {
    cartStates = new Array();
} else {
    cartStates = sessionStorage.getItem('states').split(',');
}

let checkedCheckboxes = [];

const bookShelf = document.querySelector('.shop-content');

const clearShelf = () => {
    bookShelf.innerHTML = '';
}

const addBookPropertiesToSet = (book, filters) => {
    ['category', 'origin', 'coverType', 'availability'].forEach(prop => {
        if (book[prop] !== undefined) {
            book[prop].forEach(item => filters.add(item));
        }
    });
};

//проверяет содержатся ли все значения из arr1 в arr2
const isContains = (arr1, arr2) => {
    if (arr2 !== undefined) {
        for (let item of arr1) {
            if (!arr2.includes(item)) {
                return false;
            }
        }
        return true;
    } else {
        return false;
    }
}


const launchBooks = () => {
    clearShelf();
    let filters = new Set();
    books
        .filter(book => searchResult.length === 0 || book.name.toLowerCase().indexOf(searchResult.toLowerCase()) !== -1)
        .filter(book => categories.length === 0 || isContains(categories, book.category))
        .filter(book => origins.length === 0 || isContains(origins, book.origin))
        .filter(book => coverTypes.length === 0 || isContains(coverTypes, book.coverType))
        .filter(book => availabilities.length === 0 || isContains(availabilities, book.availability))
        .forEach(book => {
            addBookPropertiesToSet(book, filters);

            const productCard = document.createElement('div');
            productCard.classList.add('product-card');
            productCard.id = book.id

            const productImgLink = document.createElement('a');
            productImgLink.href = "";

            const productImage = document.createElement('img');
            productImage.classList.add('product-image');
            productImage.src = book.imgLink;
            productImage.alt = book.name;

            productImgLink.appendChild(productImage);

            const productName = document.createElement('div');
            productName.classList.add('product-name');

            const productNameLink = document.createElement('a');
            productNameLink.href = "";
            productNameLink.innerText = book.name;

            productName.appendChild(productNameLink);

            const productPrice = document.createElement('div');
            if (book.newPrice === undefined) {
                productPrice.classList.add('product-price');
                productPrice.innerText = book.price + " ₽";
            } else {
                productPrice.classList.add('product-new-price');

                const productPriceSpan = document.createElement('span');
                productPriceSpan.innerText = book.price + " ₽";
                productPrice.appendChild(productPriceSpan);

                const remainingText = document.createTextNode(book.newPrice + " ₽");
                productPrice.appendChild(remainingText);

            }

            const buyButton = document.createElement('button');
            buyButton.classList.add('add-to-cart-btn');

            if (!cartStates.includes(String(+book.id - 1))) {
                buyButton.innerText = "Купить";
            } else {
                buyButton.innerText = "Оформить";
                buyButton.classList.add('pressed');
            }

            productCard.appendChild(productImgLink);
            productCard.appendChild(productName);
            productCard.appendChild(productPrice);
            productCard.appendChild(buyButton);

            bookShelf.appendChild(productCard);
        });
    initializeCartBtns();
    launchFilters(Array.from(filters));
};

const createFilter = (name, filterItems) => {
    return {
        name,
        filterItems
    }
}

let filters = [
    createFilter("Выберите категорию:", ["Художественная литература", "Комиксы", "Манга", "Филология", "Детские книги", "Книги для подростков", "Медицина и здоровье", "Красота", "Наука", "Религия и философия", "Психология", "Экономика", "Искусство"]),
    createFilter("Происхождение книги:", ["Русская литература", "Зарубежная литература"]),
    createFilter("Тип переплета:", ["Мягкий", "Твёрдый"]),
    createFilter("Доступность:", ["В онлайн-магазине", "В магазинах моего города"])
];

const filtersWrapper = document.querySelector('.shop-filters');

const clearFilters = () => {
    const filterItems = document.querySelectorAll('.filter-item');
    filterItems.forEach(item => {
        filtersWrapper.removeChild(item);
    });
}

const clearAllFilters = () => {
    checkedCheckboxes = [];
    categories = [];
    origins = [];
    coverTypes = [];
    availabilities = [];
    launchBooks();
}

const launchFilters = (relevantFilters) => {
    clearFilters();
    let count = 1;

    filters.forEach(filter => {

        const filterItem = document.createElement('div');
        filterItem.classList.add('filter-item');

        const filterName = document.createElement('div');
        filterName.classList.add('filter-item-name');
        filterName.innerText = filter.name;

        const wrapper = document.createElement('div');
        wrapper.classList.add('filter-wrapper');

        for (let i = 0; i < filter.filterItems.length; i++) {
            if (relevantFilters.indexOf(filter.filterItems[i]) !== -1) {
                const checkboxItem = document.createElement('div');
                checkboxItem.classList.add('checkbox_item');

                const checkbox = document.createElement('div');
                checkbox.classList.add('checkbox');

                const checkboxInput = document.createElement('input');
                checkboxInput.classList.add('checkbox_input');
                checkboxInput.type = "checkbox";
                checkboxInput.id = "checkbox_" + count;

                const checkboxLabel = document.createElement('label');
                checkboxLabel.classList.add('checkbox_label');
                checkboxLabel.setAttribute('for', "checkbox_" + count);

                const checkboxText = document.createElement('div');
                checkboxText.classList.add('checkbox_text');
                checkboxText.innerText = filter.filterItems[i];


                if (checkedCheckboxes.includes(checkboxText.innerText)) {
                    checkboxInput.checked = true;
                }

                checkbox.appendChild(checkboxInput);
                checkbox.appendChild(checkboxLabel);

                checkboxItem.appendChild(checkbox);
                checkboxItem.appendChild(checkboxText);

                wrapper.appendChild(checkboxItem);
                count++;
            }
        }

        filterItem.appendChild(filterName);
        filterItem.appendChild(wrapper);

        filtersWrapper.appendChild(filterItem);
    });

    initializeFilters();
}


const initializeFilters = () => {
    document.querySelectorAll('.checkbox_input').forEach(checkbox => {
        checkbox.addEventListener('change', function () {
            const isChecked = checkbox.checked;
            const checkboxName = checkbox.parentNode.nextSibling.innerText;
            const filterName = checkbox.parentNode.parentNode.parentNode.previousSibling.innerText.slice(0, -1);

            if (isChecked) {
                checkedCheckboxes.push(checkboxName);
                switch (filterName) {
                    case 'Выберите категорию':
                        categories.push(checkboxName);
                        break;
                    case 'Происхождение книги':
                        origins.push(checkboxName);
                        break;
                    case 'Тип переплета':
                        coverTypes.push(checkboxName);
                        break;
                    case 'Доступность':
                        availabilities.push(checkboxName);
                        break;
                    default:
                        break;
                }
            } else {
                checkedCheckboxes.splice(checkedCheckboxes.indexOf(checkboxName), 1);
                switch (filterName) {
                    case 'Выберите категорию':
                        categories.splice(categories.indexOf(checkboxName), 1);
                        break;
                    case 'Происхождение книги':
                        origins.splice(origins.indexOf(checkboxName), 1);
                        break;
                    case 'Тип переплета':
                        coverTypes.splice(coverTypes.indexOf(checkboxName), 1);
                        break;
                    case 'Доступность':
                        availabilities.splice(availabilities.indexOf(checkboxName), 1);
                        break;
                    default:
                        break;
                }
            }
            launchBooks();
        });
    });
}

const applyClearFiltersBtn = () => {
    document.addEventListener("DOMContentLoaded", function () {
        document.querySelector(".remove-filters-btn").addEventListener("click", function () {
            clearAllFilters();
        })
    })
}


let totalCost;
if (sessionStorage.getItem('total-cost') === null) {
    totalCost = 0;
    sessionStorage.setItem('total-cost', totalCost);
} else {
    totalCost = parseFloat(sessionStorage.getItem('total-cost'));
}

const cartCount = document.querySelector('header .icons .cart .cart-count');

let totalCount;
if (sessionStorage.getItem('total-count') === null) {
    totalCount = 0;
} else {
    totalCount = parseInt(sessionStorage.getItem('total-count'));
}
cartCount.innerText = totalCount > 0 ? String(totalCount) : "";


const plusCartCount = (index) => {
    sessionStorage.setItem(index, "1");
}

const initializeCartBtns = () => {
    const buyButtons = document.querySelectorAll('.add-to-cart-btn');
    initializePressedCartBtns();

    buyButtons.forEach((buyButton) => {
        buyButton.addEventListener('click', () => {
            if (!buyButton.classList.contains('pressed')) {
                let index = +buyButton.parentNode.id - 1;
                let book = books[index];

                if (book.newPrice === undefined) {
                    totalCost += book.price;
                } else {
                    totalCost += book.newPrice;
                }
                totalCost = Math.round(totalCost * 100) / 100;
                sessionStorage.setItem('total-cost', totalCost);

                totalCount += 1;
                sessionStorage.setItem('total-count', totalCount);

                if (totalCount > 0) {
                    cartCount.innerText = String(totalCount);
                }

                plusCartCount(index);

                cartStates.push(String(index));
                sessionStorage.setItem('states', cartStates.toString());

                buyButton.classList.add('pressed');
                buyButton.innerText = "Оформить";

                buyButton.addEventListener('click', () => {
                    window.location.href = '../html/cart-page.html';
                })
            }
        })
    });
}

const initializePressedCartBtns = () => {
    const cartButtons = document.querySelectorAll('.pressed');
    cartButtons.forEach((cartButton) => {
        cartButton.addEventListener('click', () => {
            window.location.href = '../html/cart-page.html';
        })
    });
}


launchBooks();
applyClearFiltersBtn();
initializeCartBtns();
initializePressedCartBtns();