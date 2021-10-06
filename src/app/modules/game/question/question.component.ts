import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  IAnswerData,
  IQuestionData,
} from 'src/app/services/questions/questions.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit {
  @Input('question') question: IQuestionData | null = null;
  @Output() submit = new EventEmitter<IAnswerData>();

  constructor() {}

  ngOnInit(): void {}
}
