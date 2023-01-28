export const select = {
  templateOf: {
    product: '#template-product',
  },
};

export const settings = {
  db: {
    url:
      '//' +
      window.location.hostname +
      (window.location.hostname == 'localhost' ? ':3131' : ''),
    data: 'data',
  },
};

export const templates = {
  product: Handlebars.compile(
    document.querySelector(select.templateOf.product).innerHTML
  ),
};
