
let myLibrary = [];

const getBook = (library, title, author) => {
    return library.find(book => book.title === title && book.author === author)
}

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.markRead = function() {
        this.read = !this.read
    }
};

const getBookFromInput = () => {
    let title = document.getElementById('title').value;
    let author = document.getElementById('author').value;
    let pages = document.getElementById('pages').value;
    let read = document.getElementById('read').checked;
    return new Book(title, author, pages, read);
};

let booksGrid = document.querySelector('.books_display');
let bookForm = document.querySelector(".submit_book_screen");
let overlay = document.querySelector(".overlay");

const resetGrid = () => {
    booksGrid.innerHTML = '';
};

const closeModals = () => {
    bookForm.style.transform = "translate(-50%, -50%) scale(0)";
    overlay.style.display = "none"
}

const createBookCard = (book) => {
    const col = document.createElement('div');
    const bookCard = document.createElement('div');
    const bookTitle = document.createElement('h2');
    const bookAuthor = document.createElement('p');
    const bookPages = document.createElement('p');
    const buttonGroup = document.createElement('div');
    const bookRead = document.createElement('button');
    const bookRemove = document.createElement('button');

    col.classList.add('col-md-4');
    bookCard.classList.add('book_card');
    bookTitle.classList.add('big_text', 'title', 'bold');
    bookAuthor.classList.add('medium_text', 'author');
    bookPages.classList.add('medium_text', 'pages');
    buttonGroup.classList.add('call_to_actions');
    bookRead.classList.add('book_btn', 'medium_text');
    bookRemove.classList.add('book_btn', 'remove_book', 'medium_text');
    bookRead.onclick = toggleRead;
    bookRemove.onclick = removeBook;

    bookTitle.textContent = book.title;
    bookAuthor.textContent = book.author;
    bookPages.textContent = book.pages;
    bookRemove.textContent = 'Remove'

    if(book.read) {
        bookRead.textContent = 'Read';
        bookRead.classList.add('read');
    } else {
        bookRead.textContent = 'Not read';
        bookRead.classList.add('not_read');
    };

    col.appendChild(bookCard);
    bookCard.appendChild(bookTitle);
    bookCard.appendChild(bookAuthor);
    bookCard.appendChild(bookPages);
    bookCard.appendChild(buttonGroup);
    buttonGroup.appendChild(bookRead);
    buttonGroup.appendChild(bookRemove);
    booksGrid.appendChild(col);
};

const displayBooks = arr => {
    arr.forEach(book => createBookCard(book));
};

const toggleRead = (e) => {
    let bookTitle = e.target.parentNode.parentNode.firstChild.innerHTML;
	let bookAuthor = e.target.parentNode.parentNode.children[1].innerHTML;
    let readButton = e.target;
    let selectedBook = getBook(myLibrary, bookTitle, bookAuthor);
    let indexOfBook = myLibrary.indexOf(selectedBook);
    myLibrary[indexOfBook].markRead();
    if(myLibrary[indexOfBook].read) {
        readButton.innerHTML = "Read";
        readButton.classList.add('read');
        readButton.classList.remove('not_read');
    } else {
        readButton.innerHTML = "Not read";
        readButton.classList.remove('read');
        readButton.classList.add('not_read');
    }
};

const removeBook = (e) => {
    let bookTitle = e.target.parentNode.parentNode.firstChild.innerHTML;
	let bookAuthor = e.target.parentNode.parentNode.children[1].innerHTML;
    let selectedBook = getBook(myLibrary, bookTitle, bookAuthor);
    let indexOfBook = myLibrary.indexOf(selectedBook);
    myLibrary.splice(indexOfBook, 1);
    resetGrid();
    displayBooks(myLibrary)
}

const resetInput = () => {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('pages').value = '';
}

displayBooks(myLibrary);


const addToLibrary = (e) => {
    resetGrid();
    e.preventDefault();
    const newBook = getBookFromInput();
	if(!getBook(myLibrary, newBook.title, newBook.author)) {
		myLibrary.push(newBook);
		displayBooks(myLibrary);
		closeModals();
		resetInput();
		document.querySelector('body').style.overflowY = 'scroll';
	} else {
		displayBooks(myLibrary);
		resetInput();
		alert('The book you have entered already exists.')
	}
    
};

const displayForm = () => {
    if(bookForm.style.transform = "scale(0)") {
        bookForm.style.transform = "translate(-50%, -50%) scale(1)";
        overlay.style.display = "block"
		document.querySelector('body').style.overflowY = 'hidden';
    };
};

const hideForm = () => {
    if(overlay.style.display = "block") {
        bookForm.style.transform = "translate(-50%, -50%) scale(0)";
        overlay.style.display = "none"
		document.querySelector('body').style.overflowX = 'scroll';
    }
};

document.getElementById('addBookForm').onsubmit = addToLibrary;
document.getElementById('go_to_form').onclick = displayForm;
overlay.onclick = hideForm;

