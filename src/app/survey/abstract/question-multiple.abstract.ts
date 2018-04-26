import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { Output, EventEmitter } from "@angular/core";
import { validatePonderation } from "../validators";
import { uniq, has } from 'lodash';

export abstract class QuestionMultiple {

  public form: FormGroup;

  public formSubmitted: boolean = false;

  public questionId: string;

  public objFrom: Object;

  public optionsId: string[] = [];

  @Output('saveAnswer')
  public saveAnswer: EventEmitter<any> = new EventEmitter();

  constructor(public fb: FormBuilder) { }

  public setQuestionId(questionId) {
    this.questionId = questionId;
  }

  public buildForm(objForm, validators = false) {
    if (validators) {
      this.form = this.fb.group(objForm);
      let a = [];
      for (let controlName of this.optionsId) {
        this.form.get(controlName).valueChanges.subscribe(() => {
          this.validate();
        });
      }
    } else {
      this.form = this.fb.group(objForm);
    }
  }

  public validate() {
    let a = [];
    for (let controlName of this.optionsId) {
      a.push(this.form.get(controlName).value);
    }
    if (uniq(a).length !== a.length) {
      this.form.get('areEqual').setValue(null);
    } else {
      this.form.get('areEqual').setValue(true);
    }
    this.form.get('areEqual').updateValueAndValidity();
  }

  public patchForm(obj) {
    this.form.patchValue(obj);
  }

  public getObjectForm(options: any[], type: 'checkbox' | 'ponderation', defaultValue: any = false) {
    const objForm = {};
    for (const option of options) {
      this.optionsId.push(option.id);
      objForm[`${option['id']}`] = new FormControl(defaultValue);
    }
    this.objFrom = objForm;
    switch (type) {
      case 'ponderation':
        this.objFrom['areEqual'] = new FormControl(null, Validators.required)
        this.buildForm(objForm, true);
      default:
        this.buildForm(objForm);
        break;
    }
  }


  public onSubmittedForm({ value, valid }: { value: any, valid: boolean }) {
    if (valid) {
      if (has(value, 'areEqual')) {
        delete value['areEqual'];
      }
      this.saveAnswer.emit({
        id: this.questionId, value: {
          id: this.questionId,
          answer: value
        }
      });
    }
  }



}