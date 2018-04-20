import { Component, OnInit, Input } from '@angular/core';
import { QuestionUnique } from '../../../abstract/question-unique.abstract';
import { FormBuilder } from '@angular/forms';
import { SurveyQuestion } from '../../../models/questions.model';

@Component({
  selector: 'app-survey-question-radio',
  templateUrl: 'radio-question.component.html'
})

export class SurveyQuestionRadioComponent extends QuestionUnique implements OnInit {

  @Input('question')
  public question: SurveyQuestion;

  constructor(public fb: FormBuilder) {
    super(fb);
  }

  ngOnInit() {
    this.buildForm();
    this.patchForm({ id: this.question.id })
  }
}