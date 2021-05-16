import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AlertService } from 'src/app/services/alert.service';
import { FilmService } from 'src/app/services/film.service';

@Component({
  selector: 'create-film',
  templateUrl: './create-film.component.html',
  styleUrls: ['./create-film.component.css']
})
export class CreateFilmComponent implements OnInit {

  @Input()   displayNewDialog: boolean;
    @Output() displayNewDialogChange = new EventEmitter();
    createForm: FormGroup;
    loading = false;
    submitted = false;
    hide= false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private filmService: FilmService,

        private alertService: AlertService
    ) {

        // redirect to home if already logged in
        // tslint:disable-next-line:no-trailing-whitespace

    }


    ngOnInit() {
        this.createForm = this.formBuilder.group({
            name: ['', [Validators.required]],

            description: ['',[Validators.required,Validators.minLength(6), Validators.maxLength(100)] ],
            rating: ['', [Validators.required, Validators.min(1), Validators.max(5)]],

            ticketPrice: ['', [Validators.required, Validators.min(1)]],
            releaseDate:['',[Validators.required]],
             genre: this.formBuilder.array([new FormControl('', Validators.required)]),
            country: ['', [Validators.required]],
            photo:['',[Validators.required]]
        }

        );


    }
    ngOnDestroy() {
        this.displayNewDialogChange.unsubscribe();
      }

    get name() { return this.createForm.get('name'); }
    get description() { return this.createForm.get('description'); }
    get country() { return this.createForm.get('country'); }
    get ticketPrice() { return this.createForm.get('ticketPrice'); }
    get releaseDate() { return this.createForm.get('releaseDate'); }
    //get genre() { return this.createForm.get('genre'); }
    get genre(): FormArray {
      return this.createForm.get('genre') as FormArray;
    }
    get photo() { return this.createForm.get('photo'); }
    get rating() { return this.createForm.get('rating'); }
    onClose() {

  this.displayNewDialogChange.emit(false);
    }


    // addNameField() {
    //   this.genre.push(new FormControl('', Validators.required));
    // }
    addNewGenre() {
      this.genre.push(new FormControl('', Validators.required));

      // let control = <FormArray>this.createForm.controls.genre;
      // control.push(new FormControl('')
      // )
    }
    removeGenre(index: number) {
      // let control = <FormArray>this.createForm.controls.genre;
      // control.removeAt(index);
      if (this.genre.length !== 1) {
        this.genre.removeAt(index);
      }

    }
    onSubmit() {
        this.submitted = true;
        for(let i = 0; i < this.genre.length; i++) {
          console.log(this.genre.at(i).value);
        }

        // stop here if form is invalid
        if (this.createForm.invalid) {
            return;
        }

        this.loading = true;

        console.log(this.createForm.value)

        this.filmService.create(this.name.value, this.description.value, this.ticketPrice.value,
          this.releaseDate.value,  this.rating.value,this.genre.value, this.photo.value,this.country.value)
            .pipe(first())
            .subscribe(
                film => {
                    this.createForm.reset();

                    this.loading = false;

                    this.alertService.success(`  ${film.name} ! Added`, true);
                    setTimeout(()=>{
                        this.alertService.clear();

                      },3000);

                    // this.router.navigate(['']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                    setTimeout(()=>{
                        this.alertService.clear();

                      },15000);
                });
    }



}
