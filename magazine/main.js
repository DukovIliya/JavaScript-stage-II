class ProductList {
    #goods;
    #allProducts;
    constructor(container = '.products') {
        this.container = container;
        //this._googs = [];
        this.#goods = [];
        this.#allProducts = [];
        this.#fetchGoods();
        this.#render();
    }

    #fetchGoods() {
        this.#goods = [
            { id: 1, title: 'Notebook', price: 20000, imageURL: 'https://picsum.photos/200/300?1' },
            { id: 2, title: 'Mouse', price: 1500, imageURL: 'https://picsum.photos/200/300?2' },
            { id: 3, title: 'Keyboard', price: 5000, imageURL: 'https://picsum.photos/200/300?3' },
            { id: 4, title: 'Gamepad', price: 4500, },
            { id: 5, price: 34500, imageURL: 'https://picsum.photos/200/300?5' },
            { id: 6, title: 'Headphones', imageURL: 'https://picsum.photos/200/300?6' },
        ];
    }

    #render() {
        const block = document.querySelector(this.container);
        for (let product of this.#goods) {
            const productObj = new ProductItem(product);
            console.log(productObj);
            this.#allProducts.push(productObj);
            block.insertAdjacentHTML('afterBegin', productObj.render());
        }
    }

    getSumPrice() {
        let costall = 0;
        this.#allProducts.forEach(element => {
            if (!isNaN(element.price)) costall += element.price;
        });
        return costall;
    }


}

class ProductItem {

    constructor(product) {
        this.id = product.id;
        this.title = product.title;
        this.price = product.price;
        this.imageURL = product.imageURL;
    }

    render() {
        return `<div class="product-item">
                    <img src="${this.#getImage(this.imageURL)}"  alt="Product image">
                    <h3>${this.#getTitle(this.title)}</h3>
                    <p>Стоимость: <span class="price">${this.#getPrice(this.price)} </span> рублей</p>
                    <button class="by-btn">Добавить в корзину</button>
                </div>`;
    }

    #getTitle(title = 'Товар недоступен!') { return title; }
    #getPrice(price = 'У менеджера') { return price; }
    #getImage(img = 'http://www.dukovs.ru/img/no_foto.jpg') { return img; };

}

const Products = new ProductList();


//Класс корзины
class Cart {
    constructor() {

    }
    get sumCart() {
        //Геттер для получения суммы всей корзины
    }
    get quantGoogs() {
        //Геттер для получения кол-ва товаров в корзине
    }
    elementById(id) {
        //Геттер для получения элемента корзины по Id    
    }

    addElement(googs) {
        //метод добавляет элемент в кознину
    }
    clearCart() {
        //метод очистки корзины
    }

    removeElementById(id) {
        //Метод удаления элемента из корзины по id
    }
}

class CartItem {
    constructor() {

    }
}








/* HW - 1
const products = [
    { id: 1, title: 'Notebook', price: 20000, imageURL: 'https://picsum.photos/200/300?1' },
    { id: 2, title: 'Mouse', price: 1500, imageURL: 'https://picsum.photos/200/300?2' },
    { id: 3, title: 'Keyboard', price: 5000, imageURL: 'https://picsum.photos/200/300?3' },
    { id: 4, title: 'Gamepad', price: 4500, },
    { id: 5, price: 34500, imageURL: 'https://picsum.photos/200/300?5' },
    { id: 6, title: 'Headphones', imageURL: 'https://picsum.photos/200/300?6' },
];

const renderProduct = (title = 'Товар недоступен!', price = 9e9, image = 'http://www.dukovs.ru/img/no_foto.jpg') => {
    return `<div class="product-item">
                <img src="${image}"  alt="Product image">
                <h3>${title}</h3>
                <p>Стоимость: <span class="price">${price} </span> рублей</p>
                <button class="by-btn">Добавить в корзину</button>
              </div>`;
};

const renderProducts = (list) => {
    const productList = list.map(function (product) {
        return renderProduct(product.title, product.price, product.imageURL);
    }).join('');
    //console.log(productList);
    document.querySelector('.products').insertAdjacentHTML('afterBegin', productList);
};


renderProducts(products);
*/