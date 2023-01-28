import { select, settings } from './settings.js';

const app = {
  initData() {
    const url = settings.db.url + '/' + settings.db.data;
    this.data = {};
    fetch(url)
      .then((rawResponse) => {
        return rawResponse.json();
      })
      .then((parsedResponse) => {
        this.data.products = parsedResponse;
      });
  },

  getElement() {
    const thisApp = this;

    thisApp.dom = {},
    thisApp.dom.product = document.querySelector(select.templateOf.product);
  },

  init() {
    const thisApp = this;
    thisApp.initData();
    thisApp.getElement();

  },
};

app.init();
