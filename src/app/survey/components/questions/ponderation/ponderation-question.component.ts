import { Component, OnInit, Input } from '@angular/core';
import { SurveyQuestion } from '../../../models/questions.model';
import { QuestionMultiple } from '../../../abstract/question-multiple.abstract';
import { FormBuilder } from '@angular/forms';
import { orderBy, toArray } from 'lodash';
import { validatePonderation } from '../../../validators';

@Component({
  selector: 'app-survey-question-ponderation',
  templateUrl: 'ponderation-question.component.html'
})

export class SurveyQuestionPonderationComponent extends QuestionMultiple implements OnInit {

  @Input('question')
  public question: SurveyQuestion = {
    id: '1',
    title: 'Este es el titulo de la pregunta',
    type: 'checkbox',
    options: [
      {
        id: '2',
        title: 'Calidad',
        value: 'Calidad'
      },
      {
        id: '3',
        title: 'Precio',
        value: 'Precio'
      },
      {
        id: '4',
        title: 'Calidad',
        value: 'Calidad'
      }
    ],
    graph: 'pie'
  };

  constructor(public fb: FormBuilder) {
    super(fb);
  }

  ngOnInit() {
    this.setQuestionId(this.question.id);
    this.getObjectForm(this.question.options, 0);
    this.orderOptions();
    this.form.setValidators[validatePonderation(this.getOptionsTitle())]
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
}