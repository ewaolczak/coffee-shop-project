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
    linksToPages: '#home, "products, #contact',
    switchingPages: '#products, #contact',
    links: 'nav-links',
    hidden: 'hidden',
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
