export interface SurveyQuestion {
  id: string;
  title: string;
  type: 'checkbox' | 'radio';
  options: QuestionOptions[]
}

export interface QuestionOptions {
  id: string;
  title: string;
  value: string;
}
