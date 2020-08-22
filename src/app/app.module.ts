import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule} from '@angular/forms'; 


import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DiagnosisFormComponent } from './components/diagnosis-form/diagnosis-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatStepperModule} from '@angular/material/stepper';
import {MatIconModule} from '@angular/material/icon';
import {MatRadioModule} from '@angular/material/radio';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatChipsModule} from '@angular/material/chips';
import {MatSelectModule} from '@angular/material/select';
import {MatSliderModule} from '@angular/material/slider';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonToggleModule} from '@angular/material/button-toggle'; 
import {MatAutocompleteModule} from '@angular/material/autocomplete'; 
import {MatButtonModule} from '@angular/material/button'; 

import { CdkStepperModule } from '@angular/cdk/stepper';



const matmodules=[MatFormFieldModule,
            MatInputModule,
            MatStepperModule,
            MatIconModule,
            MatRadioModule,
            MatSlideToggleModule,
            MatChipsModule,
            MatSelectModule,
            MatSliderModule,
            MatCheckboxModule,
            MatButtonToggleModule,
            MatAutocompleteModule,
            MatButtonModule]
            


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    DiagnosisFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    matmodules,
    CdkStepperModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
