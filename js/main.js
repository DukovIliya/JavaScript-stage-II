const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        catalogUrl: '/catalogData.json',
        products: [],
        imgCatalog: 'https://picsum.photos/200/300',
        searchLine: '',
        filterProducts: [],
        isVisibleCart: true,
        cart: [],

    },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                })
        },
        addProduct(product) {
            let find = this.cart.find(good => product.id_product === good.id_product);
            if (find) {
                find.quantity++;
            }
            else {
                let prod = {};
                Object.assign(prod, product, { quantity: 1 });
                this.cart.push(prod);
            }
        },
        removeProduct(product) {
            let find = this.cart.find(good => product.id_product === good.id_product);
            if (find.quantity > 1) {
                find.quantity--
            }
            else {
                this.cart.splice(this.cart.indexOf(find), 1);
            }
        },

        FilterGoods() {
            const regexp = new RegExp(this.searchLine, 'i');
            this.filterProducts = this.products.filter(good => regexp.test(good.product_name));
        },
    },
    beforeCreate() {

    },
    created() {
        this.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for (let el of data) {
                    el.imageUrl = `${this.imgCatalog}?${el.id_product}`
                    this.products.push(el);
                }
                this.filterProducts = [...this.products];
            });
    },
    beforeMount() {

    },
    mounted() {

    },
    beforeUpdate() {

    },
    updated() {

    },
    beforeDestroy() {

    },
    destroyed() {

    },
});
