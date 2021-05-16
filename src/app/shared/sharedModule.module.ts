import { NgModule } from '@angular/core';

import {MatSidenavModule} from '@angular/material/sidenav';
import { MatButtonModule} from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSelectModule} from '@angular/material/select';
import { MatDividerModule} from '@angular/material/divider';
import {MatMenuModule} from '@angular/material/menu';


import {MatPaginatorModule} from '@angular/material/paginator';
import { MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule} from '@angular/material/core';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatChipsModule} from '@angular/material/chips';
import { MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import { MatListModule} from '@angular/material/list';
import {MatProgressBarModule} from '@angular/material/progress-bar';


import {MatInputModule} from '@angular/material/input';

import {MatToolbarModule} from '@angular/material/toolbar';

  // import {ButtonModule,AccordionModule} from 'primeng';
import {AccordionModule} from 'primeng/accordion';     // accordion and accordion tab
import {ButtonModule} from 'primeng/button';     // accordion and accordion tab
import {InputTextModule} from 'primeng/inputtext';
import {TableModule} from 'primeng/table';
import {PaginatorModule} from 'primeng/paginator';
import {DialogModule} from 'primeng/dialog';
import {DataViewModule} from 'primeng/dataview';
import {PanelModule} from 'primeng/panel';
 // import {MenuItem} from 'primeng/api';                 //api
import {RatingModule} from 'primeng/rating';
import {DropdownModule} from 'primeng/dropdown';
import {RippleModule} from 'primeng/ripple';

import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

  // import { SearchAndPaginationModule } from '../seachAndPagination/SearchAndPagination.module';


@NgModule({
      imports: [
        DialogModule, PaginatorModule, TableModule, ButtonModule, AccordionModule, InputTextModule,
        MatToolbarModule, MatMenuModule,
        MatButtonModule, MatIconModule, MatInputModule,
        MatSidenavModule, MatGridListModule,
        MatSelectModule, MatDividerModule, MatChipsModule,
         MatFormFieldModule, MatCardModule, MatListModule, MatProgressBarModule,
         FlexLayoutModule, MatChipsModule,
         FormsModule, ReactiveFormsModule, MatPaginatorModule,
         DataViewModule, PanelModule, RatingModule, DropdownModule, RippleModule,
         MatSortModule, MatTableModule, MatDatepickerModule, MatNativeDateModule, MatExpansionModule

        ],
      exports: [
        DialogModule, PaginatorModule, TableModule, ButtonModule, AccordionModule, InputTextModule,
        MatToolbarModule, MatMenuModule,
        MatButtonModule, MatInputModule, MatIconModule,
         MatSidenavModule, MatGridListModule, MatChipsModule,
         MatSelectModule, MatDividerModule, MatChipsModule,
         MatFormFieldModule, MatCardModule, MatListModule,
         MatProgressBarModule, FlexLayoutModule, FormsModule,
         ReactiveFormsModule, MatPaginatorModule, DataViewModule, PanelModule, RatingModule, DropdownModule, RippleModule,
         MatSortModule, MatTableModule, MatDatepickerModule, MatNativeDateModule  , MatExpansionModule
      ],
      declarations: []
  })
export class SharedModule {

}
