import { select, settings, classNames } from './settings.js';
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
    thisApp.dom.pages = document.querySelector(
      select.containerOf.pages
    ).children;
    thisApp.dom.mainPages = document.querySelectorAll(select.pages.mainPages);
    thisApp.dom.pageLinks = document.querySelectorAll(select.pages.pageLinks);
    thisApp.dom.links = document.querySelectorAll(select.pages.links);

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

  initPages() {
    const thisApp = this;

    for (let link of thisApp.dom.links) {
      link.addEventListener('click', function (event) {
        event.preventDefault();
        const clickedElement = this;

        /* get page if from href attribute */
        const id = clickedElement.getAttribute('href').replace('#', '');

        /* run thisApp.activatePage with that id */
        thisApp.activePage(id);

        /* change URL hash */
        window.location.hash = '#' + id;
      });
    }
  },

  activePage(pageId) {
    const thisApp = this;
    for (let page of thisApp.dom.pages) {
      page.classList.toggle(classNames.pages.active, page.id == pageId);
    }
  },

  async init() {
    const thisApp = this;
    await thisApp.initData();
    thisApp.getElement();
    thisApp.initPages();
  },
};
app.init();
