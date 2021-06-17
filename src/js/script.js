"use strict";

const select = {
  templateOf: {
    book: "#template-book",
  },
  bookList: {
    list: ".books-list",
  },
  booksImage: {
    image: ".book__image",
  },
};

const templates = {
  menuBooks: Handlebars.compile(
    document.querySelector(select.templateOf.book).innerHTML
  ),
};

function render() {
  for (let book of dataSource.books) {
    const generatedHTML = templates.menuBooks(book);
    const element = utils.createDOMFromHTML(generatedHTML);
    const menuContainer = document.querySelector(select.bookList.list);
    menuContainer.appendChild(element);
  }
}
render();

const favoriteBooks = [];

const bookImages = document.querySelectorAll(select.booksImage.image);

function initActions() {
  for (let book of bookImages) {
    book.addEventListener("click", function (e) {
      e.preventDefault();
      if (e.currentTarget.classList.contains("book__image")) {
        e.currentTarget.classList.add("favorite");
        console.log(e.currentTarget);
        const attribute = e.currentTarget.getAttribute("data-id");
        favoriteBooks.push(attribute);
        console.log(favoriteBooks);
      }
    });
  }
}

initActions();
