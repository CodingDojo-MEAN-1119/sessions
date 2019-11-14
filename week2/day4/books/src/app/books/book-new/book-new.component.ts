import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { Book } from '../../models/book';
import { NgForm } from '@angular/forms';

import { BookService } from '../../services';

@Component({
  selector: 'app-book-new',
  templateUrl: './book-new.component.html',
  styleUrls: ['./book-new.component.css'],
})
export class BookNewComponent implements OnInit {
  book = new Book();

  @Output()
  createBook = new EventEmitter<Book>();

  constructor(private bookService: BookService, private router: Router) {}

  ngOnInit() {}

  onSubmit(event: Event, form: NgForm) {
    event.preventDefault();

    // this.books.push(this.book);

    this.bookService.createBook(this.book).subscribe(createdBook => {
      console.log(createdBook);
      this.book = new Book();
      form.reset();

      // this.router.navigate(['/']);
      this.router.navigateByUrl('/');
    });
    // this.createBook.emit(this.book);

    // console.log(`running on submit`, this.books);
  }
}
