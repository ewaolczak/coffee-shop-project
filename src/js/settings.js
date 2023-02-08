export const select = {
  templateOf: {
    product: '#template-product',
  },

  containerOf: {
    pages: '#pages',
  },

  pages: {
    home: '#home',
    main: '#main',
    products: '#products',
    about: '#about',
    contact: '#contact',
    footer: '#footer',
    mainPages: '#products, #contact',
    linkPages: '#home, #products, #contact',
    links: '.nav-links a',
  },
};

export const classNames = {
  pages: {
    active: 'active',
  },
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
