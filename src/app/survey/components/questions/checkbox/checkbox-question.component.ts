import { Component, OnInit, Input } from '@angular/core';
import { QuestionMultiple } from '../../../abstract/question-multiple.abstract';
import { FormBuilder } from '@angular/forms';
import { SurveyQuestion } from '../../../models/questions.model';
import { orderBy } from 'lodash';
@Component({
  selector: 'app-survey-question-checkbox',
  templateUrl: 'checkbox-question.component.html'
})

export class SurveyQuestionCheckboxComponent extends QuestionMultiple implements OnInit {

  @Input('question')
  public question: SurveyQuestion;

  constructor(public fb: FormBuilder) {
    super(fb);
  }

  ngOnInit() {
    this.setQuestionId(this.question.id);
    this.getObjectForm(this.question.options);
    this.orderOptions();
  }

  public orderOptions() {
    orderBy(this.question.options, ['order'], ['asc'])
  }
}