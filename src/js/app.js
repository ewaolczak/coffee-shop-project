import { select, settings } from './settings.js';
import utils from './functions.js';

const templates = {
  products: Handlebars.compile(
    document.querySelector(select.templateOf.product).innerHTML
  ),
};

const app = {
  async initData() {
    const url = settings.db.url + '/' + settings.db.data;

    this.data = {};
    const rawResponse = await fetch(url);
    const jsonResponse = await rawResponse.json();
    this.data.products = jsonResponse;
  },

  getElement() {
    const thisApp = this;
    const productsList = document.querySelector('.products-list');

    thisApp.dom = {};
    thisApp.dom.product = document.querySelector(select.templateOf.product);

    const products = thisApp.data.products;
    for (const product of products) {
      const productObject = {
        name: product.name,
        description: product.description,
        roasting: product.roasting,
        intensity: product.intensity,
        image: product.image,
      };
      const html = templates.products(productObject);
      const element = utils.createDOMFromHTML(html);
      productsList.appendChild(element);
    }
  },

  async init() {
    const thisApp = this;
    await thisApp.initData();
    thisApp.getElement();
  },
};
app.init();
