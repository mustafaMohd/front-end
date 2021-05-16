import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { first } from 'rxjs/operators';
import { Film } from 'src/app/interfaces/film';
import { AlertService } from 'src/app/services/alert.service';
import { FilmService } from 'src/app/services/film.service';

@Component({
  selector: 'edit-film',
  templateUrl: './edit-film.component.html',
  styleUrls: ['./edit-film.component.css']
})
export class EditFilmComponent implements OnChanges,OnDestroy {
  film: Film;
  @Input()
  filmSubject:Subject<Film>;
  
  //@Input() currentUser: Observable<User>;
  @Input()   displayEditDialog: boolean;
  @Output() displayEditDialogChange = new EventEmitter();
  
  
  updateForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
        private router: Router,
        private filmService: FilmService,
        
        private alertService: AlertService
   
  ) { }

  ngOnChanges() {
    
    this.filmSubject.subscribe(data => {
      this.film=data
      // called when the notifyChildren method is
      // called in the parent component
    });
      this.updateForm = this.formBuilder.group({
        name: ['', [Validators.required]],
            
        description: ['',[Validators.required,Validators.minLength(6), Validators.maxLength(40)] ],
        rating: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
        
        ticketPrice: ['', [Validators.required, Validators.min(1)]],
        releaseDate:['',[Validators.required]],
         genre: this.formBuilder.array([new FormControl('', Validators.required),
         new FormControl('', Validators.required),]),
        country: ['', [Validators.required]],
        photo:['',[Validators.required]]
        
            
    }
    );

    this.updateForm.patchValue({
      name: this.film.name,
      description: this.film.description,
      rating: this.film.rating,
      ticketPrice: this.film.ticketPrice,
      releaseDate: this.film.releaseDate,
      genre: this.film.genre,
      country: this.film.country,
      photo: this.film.photo,
    })
  
    
  }

  get name() { return this.updateForm.get('name'); }
  get description() { return this.updateForm.get('description'); }
  get country() { return this.updateForm.get('country'); }
  get ticketPrice() { return this.updateForm.get('ticketPrice'); }
  get releaseDate() { return this.updateForm.get('releaseDate'); }
  //get genre() { return this.createForm.get('genre'); }
  get genre(): FormArray {
    return this.updateForm.get('genre') as FormArray;
  }
  get photo() { return this.updateForm.get('photo'); }
  get rating() { return this.updateForm.get('rating'); }

  onClose() {
 
    this.displayEditDialogChange.emit(false);
      }
  


  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.updateForm.invalid) {
      return;
    }

    this.loading = true;


    this.filmService.update(this.film.id,this.name.value, this.description.value, this.ticketPrice.value,
      this.releaseDate.value,  this.rating.value,this.genre.value, this.photo.value,this.country.value)
      .pipe(first())
      .subscribe(
        film => {
          this.loading = false;
         
          this.alertService.success(` ${film.name} Updated successfully`, true);
         
          setTimeout(() => {
            this.alertService.clear();

          }, 3000);
          // this.router.navigate(['/admin/users']);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
          setTimeout(() => {
            this.alertService.clear();

          }, 15000);
        });
  }



  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.displayEditDialogChange.unsubscribe();
    this.filmSubject.unsubscribe();
  }




}
