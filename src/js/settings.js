export const select = {
  templateOf: {
    product: '#template-product',
  },
  pages: {
    home: '#home',
    main: '#main',
    products: '#products',
    about: '#about',
    contact: '#contact',
    footer: '#footer',
    linksToPages: '.nav-links a',
    mainPages: '#products, #contact',
    links: 'nav-links',
  },
};

export const classNames = {
  pages: {
    active: 'active'
  }
};

export const settings = {
  db: {
    url:
      '//' +
      window.location.hostname +
      (window.location.hostname == 'localhost' ? ':3131' : ''),
    data: 'products',
  },
};

export const templates = {
  product: Handlebars.compile(
    document.querySelector(select.templateOf.product).innerHTML
  ),
};
