import { FormGroup, FormBuilder, Validators } from "@angular/forms";

export abstract class QuestionUnique {

  public form: FormGroup;

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
    console.log(value, valid);
  }

}