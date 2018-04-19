export interface CheckboxQuestion {
  id: string;
  title: string;
  options: QuestionOptions[]
}

export interface RadioQuestion {
  id: string;
  title: string;
  options: QuestionOptions[]
}

export interface QuestionOptions {
  id: string;
  title: string;
  value: string;
}
