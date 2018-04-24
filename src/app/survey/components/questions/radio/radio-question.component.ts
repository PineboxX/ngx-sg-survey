import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { QuestionUnique } from '../../../abstract/question-unique.abstract';
import { FormBuilder } from '@angular/forms';
import { SurveyQuestion } from '../../../models/questions.model';
import { orderBy, toArray } from 'lodash';
@Component({
  selector: 'app-survey-question-radio',
  templateUrl: 'radio-question.component.html'
})

export class SurveyQuestionRadioComponent extends QuestionUnique implements OnInit, OnChanges {

  @Input('question')
  public question: SurveyQuestion;

  constructor(public fb: FormBuilder) {
    super(fb);
  }

  ngOnInit() {
    this.buildForm();
    this.patchForm({ id: this.question.id });
    this.orderOptions();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.question.firstChange === false) {
      this.patchForm({ id: this.question.id });
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