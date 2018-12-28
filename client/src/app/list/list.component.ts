import { Component, OnInit } from '@angular/core';
import { StudentService, StudentItem } from '../students-api';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  students: StudentItem[]
  searchTerm$ = new Subject<string>();

  constructor(private studentService: StudentService) { }

  ngOnInit() {
    this.studentService.searchStudents().subscribe(data => {
      this.students = data
    })

    this.search(this.searchTerm$).subscribe(results => {
      this.students = results
    });
  }

  search(terms: Observable<string>) {
    return terms.debounceTime(400)
      .distinctUntilChanged()
      .switchMap(term => this.searchEntries(term));
  }

  searchEntries(firstName) {
    return this.studentService.searchStudents(firstName)
  }

}
