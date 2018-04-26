import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { SurveyQuestion } from '../../../models/questions.model';
import { QuestionMultiple } from '../../../abstract/question-multiple.abstract';
import { FormBuilder, FormControl } from '@angular/forms';
import { orderBy, toArray } from 'lodash';
import { validatePonderation } from '../../../validators';

@Component({
  selector: 'app-survey-question-ponderation',
  templateUrl: 'ponderation-question.component.html'
})

export class SurveyQuestionPonderationComponent extends QuestionMultiple implements OnInit {

  @Input('question')
  public question: SurveyQuestion;

  constructor(public fb: FormBuilder) {
    super(fb);
  }

  ngOnInit() {
    this.setQuestionId(this.question.id);
    this.getObjectForm(this.convertToArray(this.question.options), 'ponderation', 0);
    this.orderOptions();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.question.firstChange === false) {
      this.setQuestionId(this.question.id);
      this.getObjectForm(this.convertToArray(this.question.options), 'ponderation', 0);
      this.orderOptions();
      //this.form.reset();
    }
  }

  public orderOptions() {
    orderBy(this.question.options, ['order'], ['asc'])
  }

  public convertToArray(obj) {
    return toArray(obj);
  }

  public getOptionsTitle() {
    let optionsTitles = []
    for (let option of this.question.options) {
      optionsTitles.push(option.title);
    }
    return optionsTitles;
  }

  public add(formControl: FormControl) {
    if (formControl.value < 5) {
      formControl.setValue(formControl.value + 1);
    }
    formControl.updateValueAndValidity();
  }

  public remove(formControl: FormControl) {
    if (formControl.value > 0) {
      formControl.setValue(formControl.value - 1);
    }
    formControl.updateValueAndValidity();
  }
}