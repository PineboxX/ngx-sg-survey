import { Component, OnInit } from '@angular/core';
import { QuestionUnique } from '../../../abstract/question-unique.abstract';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-survey-question-radio',
  templateUrl: 'radio-question.component.html'
})

export class SurveyQuestionRadioComponent extends QuestionUnique implements OnInit {

  constructor(public fb: FormBuilder) {
    super(fb);
  }

  ngOnInit() {
    this.buildForm();
  }
}