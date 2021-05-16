import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { first } from 'rxjs/operators';
import { Film } from 'src/app/interfaces/film';
import { AlertService } from 'src/app/services/alert.service';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  @Input()
  film: Film;

  commentForm: FormGroup;
  loading = false;
  submitted = false;
  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private commentService: CommentService,

              private alertService: AlertService) { }

  ngOnInit(): void {
    this.commentForm = this.formBuilder.group({

      comment: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(100)] ],


  }
  );

  }
  // tslint:disable-next-line: typedef
  get comment() { return this.commentForm.get('comment'); }

  // tslint:disable-next-line: use-lifecycle-interface
  // tslint:disable-next-line: typedef
  // ngOnChanges() {

  //   this.filmSubject.subscribe(data => {
  //     this.film = data;
  //     // called when the notifyChildren method is
  //     // called in the parent component
  //   }); }


      // tslint:disable-next-line: typedef
      onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.commentForm.invalid) {
            return;
        }

        this.loading = true;

        console.log(this.commentForm.value);

        this.commentService.create(this.film.id, this.comment.value)
            .pipe(first())
            .subscribe(
                film => {
                    this.commentForm.reset();

                    this.loading = false;

                    this.alertService.success(`commented`, true);
                    setTimeout(() => {
                        this.alertService.clear();

                      }, 3000);

                    // this.router.navigate(['']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                    setTimeout(() => {
                        this.alertService.clear();

                      }, 15000);
                });
    }
}


