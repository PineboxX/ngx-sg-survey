import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { Output, EventEmitter } from "@angular/core";
import { validatePonderation } from "../validators";

export abstract class QuestionMultiple {

  public form: FormGroup;

  public formSubmitted: boolean = false;

  public questionId: string;

  public objFrom: Object;

  public optionsTitle: string[] = [];

  @Output('saveAnswer')
  public saveAnswer: EventEmitter<any> = new EventEmitter();

  constructor(public fb: FormBuilder) { }

  public setQuestionId(questionId) {
    this.questionId = questionId;
  }

  public buildForm(objForm, validators = false) {
    if (validators) {
      this.form = new FormGroup(objForm, {
        validators: [validatePonderation(this.optionsTitle)]
      });
    } else {
      console.log('construyendo el form');
      this.form = new FormGroup(objForm);
    }

  }

  public patchForm(obj) {
    this.form.patchValue(obj);
  }

  public getObjectForm(options: any[], defaultValue: any = false) {
    const objForm = {};
    for (const option of options) {
      this.optionsTitle.push(option.title);
      objForm[`${option['id']}`] = new FormControl(defaultValue);
    }
    this.objFrom = objForm;
    this.buildForm(objForm);
  }


  public onSubmittedForm({ value, valid }: { value: any, valid: boolean }) {
    if (valid) {
      this.saveAnswer.emit({ id: this.questionId, answer: value });
    }
  }



}