class createBook {
    constructor(id, name, category, origin, coverType, availability, imgLink, price, newPrice) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.origin = origin;
        this.coverType = coverType;
        this.availability = availability;
        this.imgLink = imgLink;
        this.price = price;
        this.newPrice = newPrice;
    }
}   

export let listOfBooks = [
    new createBook(1, "Зловещий ресторан", ["Художественная литература", "Комиксы", "Книги для подростков"], ["Зарубежная литература"], ["Мягкий"], ["В магазинах моего города", "В онлайн-магазине"],
        "https://content.img-gorod.ru/nomenclature/30/172/3017246-4.jpg?width=304&height=438&fit=bounds", 931.99, 731.99),
    new createBook(2, "Хрупкое равновесие. Книга 1", ["Художественная литература", "Наука"], ["Зарубежная литература"], ["Мягкий"], ["В онлайн-магазине"],
        "https://content.img-gorod.ru/nomenclature/27/805/2780568.jpg?width=620&height=1000&fit=bounds", 566.99),
    new createBook(3, "Мода и сериалы: от Друзей и Твин Пикс до Эйфории и Убивая Еву", ["Красота"], ["Русская литература"], ["Твёрдый"], undefined,
        "https://content.img-gorod.ru/nomenclature/29/472/2947284-3.jpg?width=620&height=1000&fit=bounds", 799.99),
    new createBook(4, "Дворец потерянных душ. Наследник Сентерии (#2)", ["Художественная литература", "Манга", "Книги для подростков"], ["Зарубежная литература"], ["Мягкий"], ["В онлайн-магазине", "В магазинах моего города"],
        "https://books.google.ru/books/publisher/content?id=zJsGEQAAQBAJ&hl=ru&pg=PP1&img=1&zoom=3&bul=1&sig=ACfU3U3DnjZlaaQHS4Vdwj1nX0Vu8cx96A&w=1280", 729.99, 599.99),
    new createBook(5, "Дюна: Дюна. Мессия Дюны. Дети Дюны", ["Художественная литература", "Наука", "Книги для подростков"], ["Зарубежная литература"], ["Твёрдый", "Мягкий"], ["В онлайн-магазине", "В магазинах моего города"],
        "https://books.google.ru/books/publisher/content?id=jbA1DwAAQBAJ&hl=ru&pg=PP1&img=1&zoom=3&bul=1&sig=ACfU3U3aWbgnHZBSxNOu6kv5FPSA3-iC_g&w=1280", 1699.99),
    new createBook(6, "Мастер и Маргарита", ["Художественная литература", "Филология", "Религия и философия", "Искусство"], ["Русская литература"], ["Мягкий", "Твёрдый"], ["В онлайн-магазине", "В магазинах моего города"],
        "https://content.img-gorod.ru/nomenclature/29/805/2980525-3.jpg?width=304&height=438&fit=bounds", 455.99),
    new createBook(7, "Гарри Поттер и философский камень", ["Художественная литература", "Детские книги", "Книги для подростков"], ["Зарубежная литература"], ["Твёрдый"], ["В онлайн-магазине", "В магазинах моего города"],
        "https://content.img-gorod.ru/nomenclature/24/059/2405917-2.jpg?width=304&height=438&fit=bounds", 1059.99, 891.99),
    new createBook(8, "Интерстеллар : наука за кадром", ["Наука"], ["Зарубежная литература"], ["Твёрдый"], ["В онлайн-магазине"],
        "https://content.img-gorod.ru/nomenclature/24/805/2480595-1.jpg?width=304&height=438&fit=bounds", 3232.99),
    new createBook(9, "Сияние", ["Художественная литература", "Книги для подростков", "Психология"], ["Зарубежная литература"], ["Твёрдый"], ["В онлайн-магазине"],
        "https://content.img-gorod.ru/nomenclature/24/217/2421774-2.jpg?width=620&height=1000&fit=bounds", 599.99),
    new createBook(10, "Slayer. Титаны американского трэш-метала", ["Художественная литература", "Книги для подростков"], ["Зарубежная литература"], ["Мягкий"], ["В онлайн-магазине", "В магазинах моего города"],
        "https://content.img-gorod.ru/nomenclature/30/266/3026638-4.jpg?width=304&height=438&fit=bounds", 949.99),
    new createBook(11, "Курт Кобейн. Личные дневники лидера Nirvana", ["Художественная литература", "Книги для подростков"], ["Зарубежная литература"], ["Мягкий"], ["В онлайн-магазине", "В магазинах моего города"],
        "https://content.img-gorod.ru/nomenclature/30/182/3018268-2.jpg?width=620&height=1000&fit=bounds", 1999.99),
    new createBook(12, "Chanel. История модного дома", ["Художественная литература", "Красота", "Искусство"], ["Зарубежная литература"], ["Мягкий"], ["В магазинах моего города"],
        "https://litres.ru/pub/c/cover/68825841.jpg", 1099.99),
    new createBook(13, "Мир охоты и крови", ["Художественная литература", "Комиксы", "Психология"], ["Зарубежная литература"], ["Мягкий"], ["В магазинах моего города"],
        "https://litres.ru/pub/c/cover/70432669.jpg", 499.99),
    new createBook(14, "Моя мятежница", ["Художественная литература", "Книги для подростков", "Психология"], ["Зарубежная литература"], ["Твёрдый"], ["В магазинах моего города", "В онлайн-магазине"],
        "https://content.img-gorod.ru/nomenclature/30/316/3031656-3.jpg?width=620&height=1000&fit=bounds", 799.99, 556.99),
    new createBook(15, "1984. Скотный двор", ["Художественная литература", "Филология", "Наука", "Экономика", "Психология"], ["Зарубежная литература"], ["Мягкий"], ["В магазинах моего города", "В онлайн-магазине"],
        "https://content.img-gorod.ru/nomenclature/28/559/2855976-2.jpg?width=620&height=1000&fit=bounds", 279.99, 229.99),
    new createBook(16, "Зоопарк в твоей голове. 25 психологических синдромов, которые мешают нам жить", ["Художественная литература", "Психология"], ["Русская литература"], ["Мягкий"], ["В онлайн-магазине"],
        "https://content.img-gorod.ru/nomenclature/29/510/2951076.jpg?width=304&height=438&fit=bounds", 699.99, 499.99),
];