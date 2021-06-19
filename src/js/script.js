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

const templates = {
  menuBooks: Handlebars.compile(
    document.querySelector(select.templateOf.book).innerHTML
  ),
};

// const filters = [];
// const filtersForm = document.querySelector(select.filters.filter);
// function render() {
//   for (let book of dataSource.books) {
//     book.ratingBgc = determineRatingBgc(book.rating);
//     book.ratingWidth = book.rating * 10;
//     console.log(book);
//     const generatedHTML = templates.menuBooks(book);
//     const element = utils.createDOMFromHTML(generatedHTML);
//     const menuContainer = document.querySelector(select.bookList.list);
//     menuContainer.appendChild(element);
//   }
// }

// const favoriteBooks = [];

// const bookImages = document.querySelectorAll(select.booksImage.image);

// function initActions() {
//   for (let book of bookImages) {
//     book.addEventListener("dblclick", function (e) {
//       e.preventDefault();
//       if (e.currentTarget.classList.contains("book__image")) {
//         e.currentTarget.classList.add("favorite");
//         console.log(e.currentTarget);
//         const attribute = e.currentTarget.getAttribute("data-id");
//         favoriteBooks.push(attribute);
//         console.log(favoriteBooks);
//       }
//     });
//   }
//   filtersForm.addEventListener("change", function (e) {
//     if (e.target.type == "checkbox" && e.target.tagName == "INPUT") {
//       if (e.target.checked) {
//         favoriteBooks.push(e.target.value);
//       } else {
//         const index = favoriteBooks.indexOf(e.target.value);
//         favoriteBooks.splice(index, 1);
//       }
//     }

//     filterBooks();
//   });
// }

// function filterBooks() {
//   for (let position of dataSource.books) {
//     let shouldBeHidden = false;
//     for (let filtr of favoriteBooks) {
//       if (!position.details[filtr]) {
//         shouldBeHidden = true;
//         break;
//       }
//     }
//     const book = document.querySelector(
//       `.book__image[data-id="${position.id}"]`
//     );

//     if (shouldBeHidden) {
//       book.classList.add("hidden");
//     } else {
//       book.classList.remove("hidden");
//     }
//   }
// }

// function determineRatingBgc(rating) {
//   let background = "";
//   if (rating < 6) {
//     background = "linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%);";
//   } else if (rating > 6 && rating <= 8) {
//     background = "linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%);";
//   } else if (rating > 8 && rating <= 9) {
//     background = "linear-gradient(to bottom, #299a0b 0%, #299a0b 100%);";
//   } else if (rating > 9) {
//     background = "linear-gradient(to bottom, #ff0084 0%,#ff0084 100%);";
//   }
//   return background;
// }

// render();
// initActions();

class BookList {
  constructor() {
    const thisBooks = this;
    thisBooks.initData();
    thisBooks.getElements();
    thisBooks.render();
    thisBooks.initActions();
    thisBooks.determineRatingBgc();
  }

  initData() {
    const thisBooks = this;
    thisBooks.data = dataSource.books;
  }
  getElements() {
    const thisBooks = this;
    thisBooks.filters = [];
    thisBooks.favoriteBooks = [];
    thisBooks.list = document.querySelector(select.bookList.list);
    thisBooks.filtersForm = document.querySelector(select.filters.filter);
    thisBooks.bookImages = document.querySelectorAll(".book__image");
  }

  render() {
    const thisBooks = this;
    for (let book of this.data) {
      book.ratingBgc = thisBooks.determineRatingBgc(book.rating);
      book.ratingWidth = book.rating * 10;
      const generatedHTML = templates.menuBooks(book);
      const element = utils.createDOMFromHTML(generatedHTML);
      thisBooks.list.appendChild(element);
    }
  }
  initActions() {
    const thisBooks = this;
    console.log(thisBooks);
    console.log(thisBooks.list);
    console.log(thisBooks.filtersForm);
    console.log(thisBooks.bookImages);

    thisBooks.list.addEventListener("dblclick", function (e) {
      e.preventDefault();
      const attribute = e.currentTarget.getAttribute("data-id");
      console.log(e.currentTarget);
      if (!e.target.offsetParent.classList.contains("favorite")) {
        e.target.offsetParent.classList.add("favorite");
        thisBooks.favoriteBooks.push(attribute);
      } else {
        e.target.offsetParent.classList.remove("favorite");
        thisBooks.favoriteBooks.pop(attribute);
      }
    });

    thisBooks.filtersForm.addEventListener("change", function (e) {
      if (e.target.type == "checkbox" && e.target.tagName == "INPUT") {
        if (e.target.checked) {
          thisBooks.favoriteBooks.push(e.target.value);
        } else {
          const index = thisBooks.favoriteBooks.indexOf(e.target.value);
          thisBooks.favoriteBooks.splice(index, 1);
        }
      }

      thisBooks.filterBooks();
    });
  }

  filterBooks() {
    const thisBooks = this;
    for (let position of dataSource.books) {
      let shouldBeHidden = false;
      for (let filtr of thisBooks.favoriteBooks) {
        if (!position.details[filtr]) {
          shouldBeHidden = true;
          break;
        }
      }
      const book = document.querySelector(
        `.book__image[data-id="${position.id}"]`
      );

      if (shouldBeHidden) {
        book.classList.add("hidden");
      } else {
        book.classList.remove("hidden");
      }
    }
  }
  determineRatingBgc(rating) {
    let background = "";
    if (rating < 6) {
      background = "linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%);";
    } else if (rating > 6 && rating <= 8) {
      background = "linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%);";
    } else if (rating > 8 && rating <= 9) {
      background = "linear-gradient(to bottom, #299a0b 0%, #299a0b 100%);";
    } else if (rating > 9) {
      background = "linear-gradient(to bottom, #ff0084 0%,#ff0084 100%);";
    }
    return background;
  }
}
new BookList();
