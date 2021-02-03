const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/';
//const API = 'http://dukovs.ru/JS2/JSON/';
//https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json


//------------------------------------------------------
let getRequest_callback = (url, cb) => {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            if (xhr.status !== 200) { console.log('Error'); }
            else {
                cb(xhr.responseText);
            }
        }
    }
    xhr.send();
}

let getRequest_promise = (url) => {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status !== 200) reject(xhr.status);
                else resolve(xhr.responseText);
            }
        }
        xhr.send();
    });

}

//----------------------------------------------


class ProductList {
    #goods;
    #allProducts;
    constructor(container = '.products') {
        this.container = container;
        //this._googs = [];
        this.#goods = [];
        this.#allProducts = [];
        //this.#fetchGoods();
        //this.#render();
        this.#getProducts().then((data) => {
            console.log(data);
            this.#goods = [...data];
            this.#render();
        });
    }

    #getProducts() {
        return fetch(`${API}catalogData.json`)
            .then((response) => response.json())
            .catch((error) => { console.log(`Ошибка: ${error}`); });
    }

    /*
        #fetchGoods() {
            //через callback
            getRequest_callback(`${API}catalogData.json`, (data) => {
                console.log(data);
                this.#goods = JSON.parse(data);
                console.log(this.#goods);
                this.#render();
            })
    
    
            //домашнее задание через промисы
            getRequest_promise(`${API}catalogData.json`).then((responseText) => {
                console.log(responseText);
                this.#goods = JSON.parse(responseText);
                this.#goods = this.#goods.concat(JSON.parse(data, (key, value) => {
                if (key === "id_product") value = value + 9999999;
                if (key === "product_name") value = value + '_2';
                if (key === "price") value = value * 2;
                return value;
            }));

                console.log(this.#goods);
                this.#render();
            }).catch((error) => { console.log(`Ошибка. Статус: ${error}`); })
        }
    }
    */
    #render() {
        const block = document.querySelector(this.container);
        for (let product of this.#goods) {
            const productObj = new ProductItem(product);
            this.#allProducts.push(productObj);
            block.insertAdjacentHTML('afterBegin', productObj.render());
            productObj.setEvents();
        }
    }
}



class ProductItem {
    constructor(product) {
        this.id = product.id_product || -1;
        this.title = product.product_name || 'Товар недоступен!';
        this.price = product.price || 'У менеджера';
        this.imageURL = product.imageURL || `https://picsum.photos/200/300?${this.id}`;
    }

    render() {
        return `<div class="product-item">
            <img src="${this.imageURL}" alt="Product image">
                <h3>${this.title}</h3>
                <p>Стоимость: <span class="price">${this.price} </span> рублей</p>
                <button class="by-btn" data-id="${this.id}">Добавить в корзину</button>
                </div>`;
    }

    setEvents() {
        let byBtn = document.getElementsByClassName('by-btn')[0];
        byBtn.addEventListener('click', event => {
            //let goods = products.getGoogsById(+event.target.dataset.id);/*переписать неправильно. не нужно лазить в список товаров*/
            let goods = {
                id: this.id,
                title: this.title,
                price: this.price,
                imageURL: this.imageURL,
            }
            cart.addElement(goods, 1);
        });

    }
}



class Cart {
    constructor() {
        this.cartBox = [];
        this.containerHtml = document.getElementsByClassName('cart-list')[0];
        this.addEvents();
    }
    get sumCart() {        //Геттер для получения суммы всей корзины
        var sumCart = 0;
        this.cartBox.forEach((element) => { sumCart += !element.сostall ? 0 : element.сostall; });
        return sumCart;

    }
    get countGoods() {        //Геттер для получения кол-ва товаров в корзине
        var countGoods = 0;
        this.cartBox.forEach((element) => { countGoods += !element.count ? 0 : element.count; });
        return countGoods;
    }

    addElement(goods, count) {//метод добавляет элемент в корзнину
        let item = this.getElementById(goods.id);
        if (!item) {
            const cartItems = new CartItem(goods, count);
            this.cartBox.push(cartItems);
        }
        else item.addCounts();
        this.render();
    }

    render() {
        var htmlText = '';
        this.cartBox.forEach((element) => {
            htmlText += element.createHtml();
        });

        this.containerHtml.innerHTML = htmlText;

        let cart = document.getElementsByClassName('cart-info')[0];
        cart.innerHTML = `Всего товаров ${this.countGoods} на сумму ${this.sumCart} руб.`;
    }

    addEvents() {
        this.containerHtml.addEventListener('click', event => {
            if (event.target.className === 'cart-item_remove') this.lessItem(+event.target.dataset.id);
            if (event.target.className === 'cart-item_add') this.moreItem(+event.target.dataset.id);
            this.render();
        });
        document.getElementById('cart-btn-clear').addEventListener('click', () => {
            if (confirm('Очистить корзину?')) this.clearCart();
        });
    }

    lessItem(id) {
        var item = this.cartBox.forEach((element, index) => {
            if (element.id === id) {
                if (element.count === 0) this.delElementByIndex(index);
                else element.reduceCounts();
            }
        });

    }
    moreItem(id) {
        var item = this.cartBox.forEach(element => {
            if (element.id === id) element.addCounts();
        });
    }
    getElementById(id) {
        var item;
        this.cartBox.forEach(element => {
            if (element.id === id) item = element;
        });
        return item;
    }
    delElementByIndex(index) {
        this.cartBox.splice(index, 1);
    }

    clearCart() {
        this.cartBox.splice(0, this.cartBox.length);
        this.render();
    }

}



class CartItem {
    constructor(goods, count) {
        this.id = goods.id;
        this.title = goods.title;
        this.price = goods.price
        this.imageURL = goods.imageURL;
        this.count = count;
    }

    get сostall() {

        return (!!this.price ? this.price : 0) * this.count;
    }

    get imageDef() {
        return !!this.imageURL ? this.imageURL : 'http://www.dukovs.ru/img/no_foto.jpg';
    }
    get titleDef() {
        return !!this.title ? this.title : 'Товар недоступен!';
    }

    createHtml() {

        console.log(!!this.imageURL);
        return `<div class="cart-item">
            <div><img class="cart-item-img" src="${this.imageDef}" alt=""></div>
                <div class="cart-item-txt">
                    <span class="cart-item-txt-name">${this.titleDef}</span>
                </div>
                <div class="cart-item-cost">
                    <span class="cart-item-cost-name">${this.сostall} руб</span>
                </div>
                <div class="cart-item-count">
                    <span class="cart-item-count-name">${this.count} шт</span>
                </div>

                <div class="cart-item-btn">
                    <button class="cart-item_remove" data-id="${this.id}">-</button>
                    <button class="cart-item_add" data-id="${this.id}">+</button>
                </div>
            </div>`

    }

    addCounts(counts = 1) {
        this.count += counts;

    }

    reduceCounts(counts = 1) {
        if (this.count > 0)
            this.count -= counts;
    }
}


const products = new ProductList();
const cart = new Cart();
