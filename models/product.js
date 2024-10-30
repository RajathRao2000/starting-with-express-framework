const fs = require("fs");

const products = [];
module.exports = class Product {
  constructor(title) {
    this.title = title;
  }

  save() {
    // products.push(this);
    fs.appendFile("products.txt", `${this.title}|`, (err) => {
      if (err) console.log(err);
      console.log("saves");
    });
  }

  static async fetchAll() {
    await new Promise((res, rej) =>
      fs.readFile("products.txt", (err, data) => {
        if (err) console.log(err);
        let arr = data.toString().split("|");
        for (let i = 0; i < arr.length; i++) {
          if (arr[i]) {
            products.push({ title: arr[i] });
          }
        }
        res();
      })
    );
    return products;
  }
};
