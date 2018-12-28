import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { StudentService, StudentDetail } from '../students-api';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  student: StudentDetail

  constructor(private studentService: StudentService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.studentService.getStudent(params.email).subscribe(data => {
        this.student = data
      })
    });
  }

}
