class Order { /*Создает заказ, который ссылается на бургер и ингредиеты*/
    constructor() {
        this.orderId = cash.getNextNum();
        this.gambugerLink = null;
        this.ingregientLink = null;
        this.#createBurger();
        this.#createInredients();
    }
    #createBurger() {
        this.gambugerLink = new Gambuger(this.orderId);
    }
    #createInredients() {
        this.inredients = new Inredients(this.gambugerLink, this.orderId);
    }
}


class Gambuger {
    constructor(orderId) {
        this.myId = orderId;
        this.size = {};
        this.filling = {};
        this.addive = [];
        this.renderBurger(`burger_${this.myId}`);
    }

    renderBurger(container) {
        let body = document.getElementsByTagName('body')[0];
        body.insertAdjacentHTML('beforeEnd', `<div class="burger" id="${container}"><h4>Экземпляр №${this.myId}</h4></div>`);

        let block = document.getElementById(container);
        block.insertAdjacentHTML('beforeEnd', `<div class= "burgerInfo_${this.myId}" ></div > `);

    }

    renderInfo() {
        document.querySelector(`.burgerInfo_${this.myId}`).innerHTML =
            `<p>Размер: <b>${this.size.name || ''}</b></p >
            <p>Начинка: <b>${this.filling.name || ''}</b></p>
            <p>Добавки: <b>${this.addiveListName}</b></p>
            <p>Сумма калорий: <b>${this.sumCalories}</b></p>
            <p>Стоимость: <b>${this.costAll}</b></p>`;
    }

    addIngregient(id) {
        let ingrlist = inredientsList.getParamsById(id);
        switch (ingrlist.type) {
            case 'size': this.size = ingrlist; break;
            case 'filling': this.filling = ingrlist; break;
            case 'flavoring': let num = this.addive.indexOf(ingrlist);
                num === -1 ? this.addive.push(ingrlist) : this.addive.splice(num); break;
        }

        this.renderInfo();
    }
    get sumCalories() {
        var sumCalories = (this.size.calorie || 0) + (this.filling.calorie || 0);
        this.addive.forEach((element) => { sumCalories += element.calorie; })
        return sumCalories;
    }

    get costAll() {
        var costAll = (this.size.cost || 0) + (this.filling.cost || 0);
        this.addive.forEach((element) => { costAll += element.cost; })
        return costAll;
    }

    get addiveListName() {
        return this.addive.map((element) => { return element.name });
    }
}




class Inredients {
    constructor(gambugerLink, orderId) {
        this.myId = orderId;
        this.myGamburgerObj = gambugerLink;
        this.render(`burgerInfo_${this.myId}`);
    }

    render(container) {
        let burgerContainer = document.getElementsByClassName(container)[0];
        burgerContainer.insertAdjacentHTML('beforeBegin', `<div class="ingredients" id = "ingradients_${this.myId}" ></div>`);

        var ingredientsContainer = document.getElementById(`ingradients_${this.myId}`);
        inredientsList.inredients.forEach(element => {
            ingredientsContainer.insertAdjacentHTML('beforeend', `<button title="${element.cost} \u20bd  ${element.calorie} ккал" id = "id-${element.id}"> ${element.name}</button> `);
        });
        this.setEvents(ingredientsContainer);
    }

    setEvents(container) {
        container.addEventListener('click', event => {
            let id = +event.target.id.slice(3);
            this.myGamburgerObj.addIngregient(id);
        });
    }

}


inredientsList = {/*Хранит список ингредиентов*/
    inredients: [
        { id: 1, name: 'Большой', cost: 100, calorie: 40, type: 'size' },
        { id: 2, name: 'Маленький', cost: 50, calorie: 20, type: 'size' },
        { id: 3, name: 'С сыром', cost: 10, calorie: 20, type: 'filling' },
        { id: 4, name: 'С салатом', cost: 20, calorie: 5, type: 'filling' },
        { id: 5, name: 'С картофелем', cost: 15, calorie: 10, type: 'filling' },
        { id: 6, name: 'Посыпать приправой', cost: 15, calorie: 0, type: 'flavoring' },
        { id: 7, name: 'Полить майонезом', cost: 20, calorie: 5, type: 'flavoring' },
    ],

    getParamsById(id) {
        var returnElement = null;
        this.inredients.forEach(element => {
            if (element.id === id) returnElement = element;
        });
        return returnElement;
    },
}


cash = {
    generator: 0,
    getNextNum() { return ++this.generator }, /*Генерит инкрементный номер заказа - бургера*/

    run() {
        document.getElementById("createBurger").addEventListener('click', () => { new Order(); });
    },
};

cash.run();

