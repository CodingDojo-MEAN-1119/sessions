import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { map, switchMap } from 'rxjs/operators';

import { Book } from 'src/app/models/book';
import { BookService } from '../../services';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css'],
})
export class BookEditComponent implements OnInit {
  book: Book;

  constructor(
    private route: ActivatedRoute,
    private readonly bookService: BookService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.route.paramMap
      .pipe(
        map(params => params.get('id')),
        switchMap(id => this.bookService.getBook(id)),
      )
      .subscribe(book => {
        console.log('book from api', book);
        this.book = book;
      });
  }

  onSubmit(event: Event, form: NgForm) {
    console.log('editing book', { ...form.value, _id: this.book._id });

    this.bookService
      .updateBook({ ...form.value, _id: this.book._id })
      .subscribe(updatedBook => {
        console.log('updated book', updatedBook);

        this.router.navigate(['/books', updatedBook._id]);
      });
  }
}
