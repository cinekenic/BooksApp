"use strict";

const select = {
  templateOf: {
    book: "#template-book",
  },
  bookList: {
    list: ".books-list",
  },
};

const templates = {
  menuBooks: Handlebars.compile(
    document.querySelector(select.templateOf.book).innerHTML
  ),
};

function render() {
  for (let book of dataSource.books) {
    console.log(book);
    console.log(book.name);
    const generatedHTML = templates.menuBooks(book);
    const element = utils.createDOMFromHTML(generatedHTML);
    const menuContainer = document.querySelector(select.bookList.list);
    menuContainer.appendChild(element);
  }
}
render();
