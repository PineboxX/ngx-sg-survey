import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { QuestionMultiple } from '../../../abstract/question-multiple.abstract';
import { FormBuilder } from '@angular/forms';
import { SurveyQuestion } from '../../../models/questions.model';
import { orderBy, toArray } from 'lodash';
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
    console.warn('On Init', this.question);
    this.setQuestionId(this.question.id);
    this.getObjectForm(this.convertToArray(this.question.options), 'checkbox');
    this.orderOptions();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.question.firstChange === false) {
      console.log('Changes', changes.question);
      this.setQuestionId(this.question.id);
      this.getObjectForm(this.convertToArray(this.question.options), 'checkbox');
      this.orderOptions();
    }
  }

  public orderOptions() {
    orderBy(this.question.options, ['order'], ['asc'])
  }

  public convertToArray(obj) {
    return toArray(obj);
  }
}