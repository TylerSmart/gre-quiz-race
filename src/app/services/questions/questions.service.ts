import { Injectable } from '@angular/core';

export interface IAnswerData {
  answer: string;
  correct: boolean;
}

export interface IQuestionData {
  question: string;
  answers: IAnswerData[];
  category: string;
  explanation: string;
  review?: true;
}

const QUESTIONS: IQuestionData[] = [
  {
    question: 'Sample question 1',
    answers: [
      { answer: 'Right answer', correct: true },
      { answer: 'Wrong answer 1', correct: false },
      { answer: 'Wrong answer 2', correct: false },
      { answer: 'Wrong answer 3', correct: false },
      { answer: 'Wrong answer 4', correct: false },
    ],
    category: 'Category 1',
    explanation: 'This is an explanation.',
  },
  {
    question: 'Sample question 2',
    answers: [
      { answer: 'Right answer', correct: true },
      { answer: 'Wrong answer 1', correct: false },
      { answer: 'Wrong answer 2', correct: false },
      { answer: 'Wrong answer 3', correct: false },
      { answer: 'Wrong answer 4', correct: false },
    ],
    category: 'Category 1',
    explanation: 'This is an explanation.',
  },
  {
    question: 'Sample question 3',
    answers: [
      { answer: 'Right answer', correct: true },
      { answer: 'Wrong answer 1', correct: false },
      { answer: 'Wrong answer 2', correct: false },
      { answer: 'Wrong answer 3', correct: false },
      { answer: 'Wrong answer 4', correct: false },
    ],
    category: 'Category 1',
    explanation: 'This is an explanation.',
  },
  {
    question: 'Sample question 4',
    answers: [
      { answer: 'Right answer', correct: true },
      { answer: 'Wrong answer 1', correct: false },
      { answer: 'Wrong answer 2', correct: false },
      { answer: 'Wrong answer 3', correct: false },
      { answer: 'Wrong answer 4', correct: false },
    ],
    category: 'Category 1',
    explanation: 'This is an explanation.',
  },
  {
    question: 'Sample question 5',
    answers: [
      { answer: 'Right answer', correct: true },
      { answer: 'Wrong answer 1', correct: false },
      { answer: 'Wrong answer 2', correct: false },
      { answer: 'Wrong answer 3', correct: false },
      { answer: 'Wrong answer 4', correct: false },
    ],
    category: 'Category 1',
    explanation: 'This is an explanation.',
  },
  {
    question: 'Sample question 6',
    answers: [
      { answer: 'Right answer', correct: true },
      { answer: 'Wrong answer 1', correct: false },
      { answer: 'Wrong answer 2', correct: false },
      { answer: 'Wrong answer 3', correct: false },
      { answer: 'Wrong answer 4', correct: false },
    ],
    category: 'Category 1',
    explanation: 'This is an explanation.',
  },
  {
    question: 'Sample question 7',
    answers: [
      { answer: 'Right answer', correct: true },
      { answer: 'Wrong answer 1', correct: false },
      { answer: 'Wrong answer 2', correct: false },
      { answer: 'Wrong answer 3', correct: false },
      { answer: 'Wrong answer 4', correct: false },
    ],
    category: 'Category 1',
    explanation: 'This is an explanation.',
  },
  {
    question: 'Sample question 8',
    answers: [
      { answer: 'Right answer', correct: true },
      { answer: 'Wrong answer 1', correct: false },
      { answer: 'Wrong answer 2', correct: false },
      { answer: 'Wrong answer 3', correct: false },
      { answer: 'Wrong answer 4', correct: false },
    ],
    category: 'Category 1',
    explanation: 'This is an explanation.',
  },
  {
    question: 'Sample question 9',
    answers: [
      { answer: 'Right answer', correct: true },
      { answer: 'Wrong answer 1', correct: false },
      { answer: 'Wrong answer 2', correct: false },
      { answer: 'Wrong answer 3', correct: false },
      { answer: 'Wrong answer 4', correct: false },
    ],
    category: 'Category 1',
    explanation: 'This is an explanation.',
  },
  {
    question: 'Sample question 10',
    answers: [
      { answer: 'Right answer', correct: true },
      { answer: 'Wrong answer 1', correct: false },
      { answer: 'Wrong answer 2', correct: false },
      { answer: 'Wrong answer 3', correct: false },
      { answer: 'Wrong answer 4', correct: false },
    ],
    category: 'Category 1',
    explanation: 'This is an explanation.',
  },
];

@Injectable({
  providedIn: 'root',
})
export class QuestionsService {
  constructor() {}

  async getQuestions(count: number = 10): Promise<IQuestionData[]> {
    // const questions = JSON.parse(JSON.stringify(QUESTIONS));

    const questions = await fetch('https://mfpd1xxqx7.execute-api.us-east-2.amazonaws.com/QA/Search', {
      headers: {
        mode: 'no-cors',
      }
    }).then(res => res.json()).then(res => {
			return res.records.map((questionData: any) => {
				return new Object({
					question: questionData.question,
					answers: questionData.answers.map((answerData: any, answerIndex: number) => {
						return new Object({
							answer: answerData.answer,
							correct: answerIndex == 0,
						})
					}),
					category: questionData.category,
					explanation: questionData.explain,
				})
			})
		})

    if (questions.length < count) throw 'Could not gather enough questions.';

    return new Array(10)
      .fill(undefined)
      .map(
        (_) =>
          questions.splice(
            (Math.random() * 10) % questions.length,
            1
          )[0] as IQuestionData
      );
  }
}
