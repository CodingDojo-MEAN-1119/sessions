import { Component, OnInit } from '@angular/core';

import { Book } from '../../models/book';

import { BookService } from '../../services';
// import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  selectedBook: Book;

  constructor(private bookService: BookService) {}

  ngOnInit() {
    this.bookService.getBooks().subscribe(books => {
      console.log('books?', books, this);
      this.books = books;
    });
  }

  onSelect(book: Book) {
    console.log('selecting book', book);

    //                   (expression)          ? (if true) : (if false)
    this.selectedBook = this.selectedBook === book ? null : book;

    // if (this.selectedBook === book) {
    //   this.selectedBook = null;
    // } else {
    //   this.selectedBook = book;
    // }
  }

  onCreate(book: Book) {
    console.log('creating book', book);

    this.bookService
      .createBook(book)
      .subscribe(createdBook => (this.books = [...this.books, createdBook]));
  }

  onEnter(book: Book) {
    // console.log(`mouse has entered book with title ${book.title}`);
  }

  onDelete(book: Book): void {
    console.log('deleting book', book);
    this.bookService.removeBook(book._id).subscribe(deletedBook => {
      console.log('deleted book', deletedBook);

      this.books = this.books.filter(
        currentBook => currentBook._id !== deletedBook._id,
      );
    });
  }

  onEvent(event: Event) {
    console.log('eventing');
    event.stopPropagation();
  }
}
