const { rejects } = require('assert');
const { json } = require('express');
const express = require('express');
const fs = require('fs');
const app = express();


/**
 * Активируем мидлвары
 */
app.use(express.json()); // Даем знать приложению, что работаем с json'ом
app.use('/', express.static('./public')); // запросы в корень нашего сайт отдают содержимое public

/**
 * API Каталога
 */
app.get('/api/products', (req, res) => {
  fs.readFile('./server/db/products.json', 'utf-8', (err, data) => {
    if (err) {
      res.send(JSON.stringify({ result: 0, text: err }));
    } else {
      res.send(data);
    }
  });
});

/**
 * API Корзины
 */
app.get('/api/cart', (req, res) => {
  fs.readFile('./server/db/userCart.json', 'utf-8', (err, data) => {
    if (err) {
      res.sendStatus(404, JSON.stringify({ result: 0, text: err }));
    } else {
      res.send(data);
      writelog({ product_name: 'Корзина' }, { kind: 'Чтение' },)
    }
  });
});

// Добавление нового товара в корзине
app.post('/api/cart', (req, res) => {
  fs.readFile('./server/db/userCart.json', 'utf-8', (err, data) => {
    if (err) {
      res.sendStatus(404, JSON.stringify({ result: 0, text: err }));
    } else {
      // парсим текущую корзину
      const cart = JSON.parse(data);
      // добавляем новый товар
      cart.contents.push(req.body);
      console.log(req.body);
      // пишем обратно
      fs.writeFile('./server/db/userCart.json', JSON.stringify(cart), (err) => {
        if (err) {
          res.send('{"result": 0}');
        } else {
          res.send('{"result": 1}');
          writelog(req.body, { kind: 'Добавление' },)
        }
      })
    }
  });
});

// Изменяем количество товара
app.put('/api/cart/:id', (req, res) => {
  fs.readFile('./server/db/userCart.json', 'utf-8', (err, data) => {
    if (err) {
      res.sendStatus(404, JSON.stringify({ result: 0, text: err }));
    } else {
      // парсим текущую корзину
      const cart = JSON.parse(data);
      // ищем товар по id
      const find = cart.contents.find(el => el.id_product === +req.params.id);
      // изменяем количество
      find.quantity += req.body.quantity;
      console.log(req.body);
      // пишем обратно
      fs.writeFile('./server/db/userCart.json', JSON.stringify(cart), (err) => {
        if (err) {
          res.send('{"result": 0}');
        } else {
          res.send('{"result": 1}');
          writelog(find, { kind: 'Изменение' },)
        }
      })
    }
  });
});

//Домашняя работа. Удаляем товар из корзины
app.delete('/api/cart/:id', (req, res) => {
  fs.readFile('./server/db/userCart.json', 'utf-8', (err, data) => {
    if (err) {
      res.sendStatus(404, JSON.stringify({ result: 0, text: err }));
    } else {
      const cart = JSON.parse(data);
      const find = cart.contents.find(el => el.id_product === +req.params.id);
      cart.contents.splice(cart.contents.indexOf(find), 1);
      fs.writeFile('./server/db/userCart.json', JSON.stringify(cart), (err) => {
        if (err) {
          res.send('{"result": 0}');
        } else {
          res.send('{"result": 1}');
          writelog(find, { kind: 'Удаление' },)
        }
      });

    }
  });
});
//Домашняя работа. Функция логирования корзины
function writelog(prod, kind, file = './server/db/stats.json') {
  var newlog = {
    date: getCurDate(),
    time: `${getCurTime()}:${getCurTimeMs()}`,
    name: prod.product_name,
    action: kind.kind,
  };
  let promise = new Promise((resolve, rejects) => {
    fs.readFile(file, 'utf-8', (err, data) => {
      if (!err) {
        let alllog = [];
        if (data != '') alllog = JSON.parse(data);
        alllog.push(newlog);
        resolve(alllog);
      }
      else {
        rejects(err);
      }
    });
  });
  promise.then((data) => {
    fs.writeFile(file, JSON.stringify(data, '', 4), (err) => { console.log(err); })
  }).catch((error) => { console.log(error); });
};


/**
 * Запуск сервера
 * @type {string|number}
 */
// const port = process.env.PORT || 3000;
const port = 3000; // чтобы не смущало process.env.PORT (если не стартует на 3000, то меняем на другой 8080 или 8888)
app.listen(port, () => {
  console.log(`Listening ${port} port`);
});


/*--Дополнительные функции для работы с датой-----*/
function add0IfLess10(number) {
  return (number < 10) ? '0' + number : number;
}

function getCurTime() { //возвращает текущее время в hh:mm:ss
  let dt = new Date();
  let h = dt.getHours();
  let m = dt.getMinutes();
  let s = dt.getSeconds();
  h = add0IfLess10(h);
  m = add0IfLess10(m);
  s = add0IfLess10(s);
  return `${h}:${m}:${s}`;
}

function getCurTimeMs() {
  let now = new Date();
  return `${now.getMilliseconds()}`;
}

function getCurDate() { //возвращает текущую дату в dd.mm.yyyy
  let dt = new Date();
  let d = dt.getDate();
  let m = dt.getMonth() + 1;
  let y = dt.getFullYear();
  d = add0IfLess10(d);
  m = add0IfLess10(m);
  return `${d}.${m}.${y}`;
}

