import { listOfBooks } from "./module.js";
let books = listOfBooks;

let cartStates;

let totalCost = parseFloat(sessionStorage.getItem('total-cost'));

let totalCount = parseInt(sessionStorage.getItem('total-count'));

const cartCount = document.querySelector('header .icons .cart .cart-count');
cartCount.innerText = totalCount > 0 ? String(totalCount) : "";

const bookShelf = document.querySelector('.cart-content');
const cartSummary = document.querySelector('.cart-summary');

document.addEventListener("DOMContentLoaded", function () {
    document.querySelector(".header-form").addEventListener("click", function () {
        window.location.href = "../html/main-page.html";
    })
});


const initiateCartProducts = () => {
    cartStates.forEach(i => {
        const index = parseInt(i);
        const book = books[index];

        let bookCount = +sessionStorage.getItem(i);

        const productCard = document.createElement('div');
        productCard.classList.add('product-card');

        const productImgLink = document.createElement('a');
        productImgLink.href = "";
        productImgLink.classList.add('img-wrapper');

        const productImage = document.createElement('img');
        productImage.classList.add('product-image');
        productImage.src = book.imgLink;
        productImage.alt = book.name;

        productImgLink.appendChild(productImage);

        const productName = document.createElement('div');
        productName.classList.add('product-name');

        const productNameLink = document.createElement('a');
        productNameLink.href = "../html/main-page.html";
        productNameLink.innerText = book.name;

        productName.appendChild(productNameLink);

        const inputCount = document.createElement('div');
        inputCount.classList.add('input-count');

        const buttonCountMinus = document.createElement('button');
        buttonCountMinus.classList.add('btn');
        buttonCountMinus.classList.add('btn-minus');
        buttonCountMinus.innerText = "-";

        const buttonInput = document.createElement('input');
        buttonInput.value = bookCount;
        buttonInput.readOnly = true;
        if (book.newPrice === undefined) {
            buttonInput.id = book.price;
        } else {
            buttonInput.id = book.newPrice;
        }
        buttonInput.classList.add('card-control');

        const buttonCountPlus = document.createElement('button');
        buttonCountPlus.classList.add('btn');
        buttonCountPlus.classList.add('btn-plus');
        buttonCountPlus.innerText = "+";

        inputCount.appendChild(buttonCountMinus);
        inputCount.appendChild(buttonInput);
        inputCount.appendChild(buttonCountPlus);

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

        const iconImageDelete = document.createElement('div');
        iconImageDelete.classList.add('delete-wrapper');

        const btnIconImageDelete = document.createElement('button');
        btnIconImageDelete.id = "delete";
        btnIconImageDelete.classList.add("delete-btn");

        const imageDelete = document.createElement('img');
        imageDelete.classList.add('icon-image-delete');
        imageDelete.src = "../pictures/delete_1214428.png";

        btnIconImageDelete.appendChild(imageDelete);
        iconImageDelete.appendChild(btnIconImageDelete);

        productCard.appendChild(productImgLink);
        productCard.appendChild(productName);

        const wrapperCountPlusPrice = document.createElement('div');
        wrapperCountPlusPrice.classList.add('wrapper-count-price');
        wrapperCountPlusPrice.appendChild(inputCount);
        wrapperCountPlusPrice.appendChild(productPrice);

        productCard.appendChild(wrapperCountPlusPrice);

        productCard.appendChild(iconImageDelete);

        bookShelf.appendChild(productCard);

    }
    );
    addPlusCardBtns();
    addMinusCardBtns();
    addDeleteBtns();
}


const initiateCartSummary = () => {
    const textSummary = document.createElement('div');
    textSummary.classList.add('text-summary');

    const mainText = document.createElement('div');
    mainText.classList.add('main-text');
    mainText.innerText = String(totalCount) + " " + pluralizeWord(totalCount) + " на сумму:";

    const costText = document.createElement('div');
    costText.classList.add('cost-text');
    costText.innerText = String(totalCost) + " ₽";

    textSummary.appendChild(mainText);
    textSummary.appendChild(costText);

    const cartBtn = document.createElement('button');
    cartBtn.classList.add('checkout-btn');
    if (sessionStorage.getItem("registered") === "false" || sessionStorage.getItem("registered") == undefined) {
        cartBtn.classList.add('unabled');
        cartBtn.addEventListener('click', () => {
            alert('Сначала зарегистрируйтесь.');
        });
    } else {
        cartBtn.classList.add("enabled");
        cartBtn.addEventListener('click', () => {
            alert('Ваш заказ принят в обработку.');
        });
    }
    cartBtn.id = 'checkout-btn';
    cartBtn.innerText = "Оформить заказ";

    cartSummary.appendChild(textSummary);
    cartSummary.appendChild(cartBtn);


}

const changeSummary = (totalCount, totalSum) => {
    const mainText = document.querySelector('.main-text');
    mainText.innerText = String(totalCount) + " " + pluralizeWord(totalCount) + " на сумму:";

    const costText = document.querySelector('.cost-text');
    costText.innerText = String(totalSum) + " ₽";
}

const pluralizeWord = (number) => {
    if (number % 10 === 1 && number % 100 !== 11) {
        return 'товар';
    } else if (number % 10 >= 2 && number % 10 <= 4 && (number % 100 < 10 || number % 100 >= 20)) {
        return 'товара';
    } else {
        return 'товаров';
    }
}


const handleButtonClick = (btnType) => {
    return (event) => {
        const parent = event.target.closest('.product-card');
        const parentName = parent.querySelector('.product-name').innerText;
        let indexOfCurrentBook;

        books.forEach(book => {
            if (book.name === parentName) {
                indexOfCurrentBook = String(books.indexOf(book));
            }
        })

        const inputValue = +parent.querySelector('input').value;

        switch (btnType) {
            case 'plus':
                parent.querySelector('input').value = inputValue + 1;
                sessionStorage.setItem(indexOfCurrentBook, inputValue + 1);
                totalCount += 1;
                cartCount.innerText = String(totalCount);
                sessionStorage.setItem('total-count', totalCount);
                if (parent.querySelector('.product-price') !== null) {
                    totalCost += +(parent.querySelector('.product-price').innerText.slice(0, -2));
                } else if (parent.querySelector('.product-new-price') !== null) {
                    totalCost += +(parent.querySelector('.product-new-price').childNodes[1].textContent.slice(0, -2));
                }
                break;
            case 'minus':
                if (inputValue > 1) {
                    parent.querySelector('input').value = inputValue - 1;
                    sessionStorage.setItem(indexOfCurrentBook, inputValue - 1);
                    totalCount -= 1;
                    cartCount.innerText = totalCount > 0 ? String(totalCount) : "";
                    sessionStorage.setItem('total-count', totalCount);
                    if (parent.querySelector('.product-price') !== null) {
                        totalCost -= +(parent.querySelector('.product-price').innerText.slice(0, -2));
                    } else if (parent.querySelector('.product-new-price') !== null) {
                        totalCost -= +(parent.querySelector('.product-new-price').childNodes[1].textContent.slice(0, -2));
                    }
                } else if (inputValue === 1) {
                    totalCount -= 1;
                    cartCount.innerText = totalCount > 0 ? String(totalCount) : "";
                    sessionStorage.setItem('total-count', totalCount);
                    clearCartCard(parent, indexOfCurrentBook);
                }
                break;
            case 'delete':
                const count = +parent.querySelector('input').value;
                totalCount -= count;
                cartCount.innerText = totalCount > 0 ? String(totalCount) : "";
                sessionStorage.setItem('total-count', totalCount);
                if (parent.querySelector('.product-price') !== null) {
                    totalCost -= +(parent.querySelector('.product-price').innerText.slice(0, -2)) * count;
                } else if (parent.querySelector('.product-new-price') !== null) {
                    totalCost -= +(parent.querySelector('.product-new-price').childNodes[1].textContent.slice(0, -2)) * count;
                }
                clearCartCard(parent, indexOfCurrentBook);
                break;
            default:
                break;
        }

        totalCost = Math.round(totalCost * 100) / 100;
        if (totalCount === 0) {
            sessionStorage.setItem('total-cost', 0);
        } else {
            sessionStorage.setItem('total-cost', totalCost);
        }
        changeSummary(totalCount, totalCost);
    };
};

const addPlusCardBtns = () => {
    const plusBtns = document.querySelectorAll('.btn-plus');
    plusBtns.forEach((plusBtn) => {
        plusBtn.addEventListener('click', handleButtonClick('plus'));
    });
};

const addMinusCardBtns = () => {
    const minusBtns = document.querySelectorAll('.btn-minus');
    minusBtns.forEach((minusBtn) => {
        minusBtn.addEventListener('click', handleButtonClick('minus'));
    });
};

const addDeleteBtns = () => {
    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach((deleteButton) => {
        deleteButton.addEventListener('click', handleButtonClick('delete'));
    });
};


const clearCartCard = (card, indexOfBookToDelete) => {
    card.parentNode.removeChild(card);

    cartStates.splice(cartStates.indexOf(indexOfBookToDelete), 1);
    sessionStorage.removeItem(indexOfBookToDelete);

    if (totalCount === 0) {
        sessionStorage.removeItem('states');
        initiateEmptyCart();
    } else {
        sessionStorage.setItem('states', cartStates.toString());
    }
}


const initiateEmptyCart = () => {

    document.querySelector('.cart-panel').classList.add('hidden');

    const imagePaths = [
        '../pictures-cats/save = follow.jpg',
        '../pictures-cats/9981190e67c51e5499059b66b20807e9.jpg',
        '../pictures-cats/158a44159274f86d8111cbf2e652d253.jpg',
        '../pictures-cats/6c4480a89e9596d59b67a0f916593005.jpg',
    ];
    const randomIndex = Math.floor(Math.random() * imagePaths.length);

    const emptyCartWrapper = document.querySelector('.empty-cart-panel');

    const emptyCartImg = document.createElement('div');
    emptyCartImg.classList.add('empty-cart-img')
    const img = document.createElement('img');
    img.src = imagePaths[randomIndex];
    img.alt = "Картинка кота, чтобы вы не грустили!";
    emptyCartImg.appendChild(img);

    const boldTextWrapper = document.createElement('div');
    boldTextWrapper.classList.add('empty-cart-bold-text');
    boldTextWrapper.innerText = 'В корзине ничего нет';

    const thinTextWrapper = document.createElement('div');
    thinTextWrapper.classList.add('empty-cart-thin-text');

    const catalogLink = document.createElement('a');
    catalogLink.href = '../html/main-page.html';
    catalogLink.innerText = 'каталог';
    catalogLink.classList.add('catalog-link');

    thinTextWrapper.appendChild(document.createTextNode('Воспользуйтесь поиском или перейдите в '));
    thinTextWrapper.appendChild(catalogLink);
    thinTextWrapper.appendChild(document.createTextNode(', чтобы найти интересные товары'));

    emptyCartWrapper.appendChild(emptyCartImg);
    emptyCartWrapper.appendChild(boldTextWrapper);
    emptyCartWrapper.appendChild(thinTextWrapper);
}

const launchCart = () => {
    if (sessionStorage.getItem('states') !== null) {
        cartStates = sessionStorage.getItem('states').split(',');
        if (cartStates[0] === '') {
            cartStates.splice(0, 1);
        }
        initiateCartProducts();
        initiateCartSummary();
    } else {
        initiateEmptyCart();
    }
}

launchCart();