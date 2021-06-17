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
  filters: {
    filter: ".filters form",
  },
};

const filters = [];
const filtersForm = document.querySelector(select.filters.filter);

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
  filtersForm.addEventListener("change", function (e) {
    console.log(e.currentTarget);

    if (e.target.type == "checkbox" && e.target.tagName == "INPUT") {
      console.log(e.target.value);

      if (e.target.checked) {
        favoriteBooks.push(e.target.value);
      } else {
        console.log(e.target);
        console.log(e.target.value);
        const index = favoriteBooks.indexOf(e.target.value);
        favoriteBooks.splice(index, 1);
      }
    }

    console.log(favoriteBooks);
  });
}
initActions();

console.log(filtersForm);
