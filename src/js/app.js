import { select, settings, classList } from './settings.js';
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

  initActivePage(pageId) {
    const thisApp = this;

    for (let link of thisApp.dom.links) {
      link.classList.add(classList.hidden);
    }

    for (let link of thisApp.dom.links) {
      let pageAttributes = link.getAttribute('id');
      if (pageAttributes == pageId) {
        link.classList.remove(classList.hidden);
      }
    }
  },

  initPageListener() {
    const thisApp = this;

    for (let pageLink of thisApp.dom.pageLinks) {
      pageLink.addEventListener('click', function (e) {
        e.preventDefault();
        const clickedElement = e.target.getAttribute('href').substring(1);
        thisApp.initActivePage(clickedElement);
      });
    }

    for (let pageLink of thisApp.dom.pageLinks) {
      pageLink.classList.add(classList.hidden);
    }
  },

  // initPage() {
  //   const thisApp = this;
  //   const idFromHash = window.location.has.replace('#', '');

  //   let pageMatchingHash = thisApp.dom.mainPages[0].id;

  //   for (let mainPage of thisApp.dom.mainPages) {
  //     if (mainPage.id === idFromHash) {
  //       pageMatchingHash = mainPage.id;
  //       break;
  //     }
  //   }

  //   thisApp.activatePage(pageMatchingHash);

  //   for (let link of thisApp.dom.linksToPages) {
  //     link.addEventListener('click', function (e) {
  //       e.prevenetDefault();
  //       const clickedElement = this;

  //       /* get page if from href attribute */
  //       const id = clickedElement.getAttribute('href').replace('#', '');

  //       /* run thisApp.activatePage with that id */
  //       thisApp.activatePage(id);

  //       /* change URL hash */
  //       window.location.hash = '#' + id;
  //     });
  //   }
  // },

  // activatePage(pageId) {
  //   const thisApp = this;

  //   /* add class "active" to matching pages, remove from non-matching */
  //   for (let mainPage of thisApp.dom.mainPages) {
  //     mainPage.classList.toggle(classNames.pages.active, mainPage.id == pageId);
  //   }
  // },

  async init() {
    const thisApp = this;
    await thisApp.initData();
    thisApp.getElement();
    // thisApp.initPage();
    this.initPageListener();
  },
};
app.init();
