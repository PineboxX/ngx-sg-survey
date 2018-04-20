import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import {
  MatButtonModule,
  MatCheckboxModule,
  MatIconModule,
  MatInputModule,
  MatFormFieldModule,
  MatRadioModule,
} from '@angular/material';
import { CommonModule } from '@angular/common';
import { OnsenModule } from 'ngx-onsenui';

export const MATERIAL_MODULES = [
  MatButtonModule,
  MatCheckboxModule,
  MatIconModule,
  MatInputModule,
  MatFormFieldModule,
  MatRadioModule
];

@NgModule({
  imports: [
    CommonModule,
    MATERIAL_MODULES,
    OnsenModule
  ],
  exports: [MATERIAL_MODULES],
  declarations: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
