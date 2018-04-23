import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Output, EventEmitter } from "@angular/core";
export abstract class QuestionUnique {

  public form: FormGroup;

  public formSubmitted: boolean = false;

  @Output('saveAnswer')
  public saveAnswer: EventEmitter<any> = new EventEmitter();

  constructor(public fb: FormBuilder) { }

  public buildForm() {
    this.form = this.fb.group({
      'id': ['', Validators.required],
      'answer': ['', Validators.required]
    })
  }

  public patchForm(obj) {
    this.form.patchValue(obj);
  }

  public onSubmittedForm({ value, valid }: { value: any, valid: boolean }) {
    if (valid) {
      this.saveAnswer.emit({ id: value.id, value: value });
    }
  }

}