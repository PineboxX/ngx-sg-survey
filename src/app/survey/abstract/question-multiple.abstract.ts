import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { Output, EventEmitter } from "@angular/core";

export abstract class QuestionMultiple {

  public form: FormGroup;

  public formSubmitted: boolean = false;

  public questionId: string;

  public objFrom: Object;

  @Output('saveAnswer')
  public saveAnswer: EventEmitter<any> = new EventEmitter();

  constructor(public fb: FormBuilder) { }

  public setQuestionId(questionId) {
    this.questionId = questionId;
  }

  public buildForm(objForm) {
    this.form = new FormGroup(objForm);
  }

  public patchForm(obj) {
    this.form.patchValue(obj);
  }

  public getObjectForm(options: any[]) {
    const objForm = {};
    for (const option of options) {
      objForm[`${option['id']}`] = new FormControl(false);
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