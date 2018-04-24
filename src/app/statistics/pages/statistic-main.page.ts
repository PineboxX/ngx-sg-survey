import { Component, OnInit, ViewChild } from '@angular/core';
import { StatisticService } from '../services/statistics.service';
import { SurveyQuestion } from '../../survey/models/questions.model';
import { SurveyService } from '../../survey/services/survey.service';
import { toArray, orderBy } from 'lodash';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'page-statistics-main',
  templateUrl: 'statistic-main.page.html'
})

export class StatisticMainPage implements OnInit {

  public currentData: any;
  public currentDataLabel: any;

  public answers: any[];

  public questions: SurveyQuestion[];

  public questionIndex: any;

  public generalStatistics$: Observable<any>

  @ViewChild("alertDialog") public alertDialog;

  constructor(
    private statisticService: StatisticService,
    private surveyService: SurveyService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.getQuestions();
    this.getTotalUsers();
    this.activatedRoute
      .params.subscribe((paramsMap) => {
        if (paramsMap['id']) {
          this.questionIndex = paramsMap['id'];
        } else {
          this.questionIndex = 0;
        }
      });
  }


  private getQuestions() {
    this.alertDialog.nativeElement.show();
    this.surveyService.getActiveQuestion().subscribe((questions) => {
      if (questions) {
        this.questions = questions;
        this.getAnswers();
        setTimeout(() => {
          this.alertDialog.nativeElement.hide();
        }, 1000)
      }
    })
  }

  private getAnswers() {
    this.statisticService.getSurveyAnswers().subscribe((answers: any) => {
      if (answers) {
        this.answers = answers;
        this.currentData = this.getDataset();
        this.currentDataLabel = this.getDataLabels();
      }
    })
  }

  public getDataset(): number[] {
    let dataset = [];
    let dataLabels = [];
    let currentQuestion = this.questions[this.questionIndex]
    currentQuestion.options = orderBy(toArray(this.questions[this.questionIndex].options), ['order'], ['asc']);
    for (let option of currentQuestion.options) {
      dataset.push(this.getAnswerByQuestionId(currentQuestion.id, option.id));
      dataLabels.push(option.title);
    }
    return dataset;
  }

  public getDataLabels(): string[] {
    let dataLabels = [];
    let currentQuestion = this.questions[this.questionIndex]
    currentQuestion.options = orderBy(toArray(this.questions[this.questionIndex].options), ['order'], ['asc']);
    for (let option of currentQuestion.options) {
      dataLabels.push(`${option.title}`);
    }
    return dataLabels;
  }

  private getAnswerByQuestionId(questionId, optionId) {
    let filterItems = this.answers.filter((item: any) => {
      return item.answers[questionId]['value']['answer'] == optionId
    });
    return filterItems.length;
  }

  public totalVotes() {
    let sum = 0;
    for (let item of this.getDataset()) {
      sum += item;
    }
    return sum;
  }

  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  public getTotalUsers() {
    this.generalStatistics$ = this.statisticService.getStatistics();
  }

  public canShowButton(type: 'next' | 'previous') {
    switch (type) {
      case 'previous':
        return this.questionIndex - 1 !== -1;
      case 'next':
        return this.questionIndex + 1 < this.questions.length;
    }
  }

  public next() {
    console.log('next', this.questionIndex);
    this.questionIndex = parseInt(this.questionIndex);
    this.questionIndex += 1;
    this.goTo();
  }

  public previous() {
    console.log('previous', this.questionIndex);
    this.questionIndex = parseInt(this.questionIndex);
    this.questionIndex -= 1;
    this.goTo();
  }


  public goTo() {
    if (this.questionIndex % 2 === 0) {
      this.router.navigate(['/stats/graphV1', this.questionIndex])
    }
    else {
      this.router.navigate(['/stats//graphV2', this.questionIndex])
    }
  }

  public goToHome() {
    this.router.navigate(['/'])
  }
}