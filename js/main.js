
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
