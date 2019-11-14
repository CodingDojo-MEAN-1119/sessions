import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';

import { Book } from 'src/app/models/book';
import { BookService } from '../../services';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css'],
})
export class BookDetailComponent implements OnInit {
  @Input()
  book: Book;

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    // this.route.paramMap.subscribe(params => {
    //   const id = params.get('id');

    //   this.bookService.getBook(id).subscribe(book => {
    //     console.log('book from api', book);

    //     this.book = book;
    //   });
    // });

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
}
