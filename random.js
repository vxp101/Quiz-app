/* eslint-disable quotes */
/* eslint-disable strict */

const store = {

  questions: [

    {
      question: "What makes a plant green? ",
      answers: [
        'Chlorophyll',
        'Mitochondria',
        'Anthocyanins',
        'Flavanoids',
      ],
      correctAnswer: 'Chlorophyll'
    },
    {
      question: 'How does a Rose get the color red?',
      answers: [
        'Anthocyanins',
        'Hydrochloric Acid',
        'Hydrogen Oxide',
        'Sulfuric Acid'

      ],
      correctAnswer: 'Anthocyanins'
    },
    {
      question: 'What chemical breaks down food in the body?',
      answers: [
        'Hydrochloric Acid',
        'free radicals',
        'Cyanide',
        'Magnesium Oxide'
      ],
      correctAnswer: 'Hydrochloric Acid'
    },
    {
      question: 'Euclid\'s Elements is a mathematical treatise explaining :',
      answers: [
        'Flat Surfaces',
        'Curved Surfaces',
        'Complex plane',
        'Trigonometry'
      ],
      correctAnswer: 'Flat Surfaces'
    },
    {
      question: 'One of these is not like the other:',
      answers: [
        'Nautilus Shell',
        'Fibonacci Spiral',
        'Madelbrot Set',
        'Cartesian Plane'
      ],
      correctAnswer: 'Cartesian Plane'
    },
    {
      question: "According to Darwin's theory, natural selection and mutation are (respectively):",
      answers: [
        'random, random',
        'random, nonrandom',
        'nonrandom, random',
        'None of the above'
      ],
      correctAnswer: 'nonrandom, random'
    }




  ],
  
  
  quizStarted: false,
  questionNumber: 0,
  incorrect: 0,
  score: 0,
  showingQuestion: true,

};

function renderQuestionTemplate() {
  return ` <form class="flex-column flex-center"><p class="question"><span class="num">Question ${store.questionNumber + 1} of ${store.questions.length}</span> ${store.questions[store.questionNumber].question}</p><div>
  <input type="radio" id="answer1" name="answer" value="${store.questions[store.questionNumber].answers[0]}" class="answer1" required>
  <label class="btn" for="answer1" class="answer2">${store.questions[store.questionNumber].answers[0]}</label>


<br>
<input type="radio" id="answer2" name="answer" value="${store.questions[store.questionNumber].answers[1]}" class="answer2" required>
<label class="btn" for="answer2" class="answer2">${store.questions[store.questionNumber].answers[1]}</label>


<br>
<input type="radio" id="answer3" name="answer" value="${store.questions[store.questionNumber].answers[2]}" class="answer3" required>
<label class="btn" for="answer3" class="answer3">${store.questions[store.questionNumber].answers[2]}</label>


<br>
<input type="radio" id="answer4" name="answer" value="${store.questions[store.questionNumber].answers[3]}" class="answer4"  required>
<label class="btn" for="answer4" class="answer4">${store.questions[store.questionNumber].answers[3]}</label>
<br></div>
<button class='next' type='submit'>Next</button>

<br>

<p><span class="correct">Correct Answers: ${store.score} </span><br><span class="incorrect">Incorrect Answers: ${store.incorrect}</span></p></form>


`;



}

function retakeQuiz() {
  $('.geoplants').on('click', '.retake', function (e) {
    e.preventDefault();
    store.questionNumber = 0;
    store.incorrect = 0;
    store.score = 0;
    $('form').html(renderQuestionTemplate);
  });
}
function start() {

  $('.geoplants').on('click', '.start', function (e) {
    
    e.preventDefault();
    store.quizStarted = true;
    $('form').html(renderQuestionTemplate);


  });

}

function handler() {
  $('main').on('submit', 'form', function (e) {
    
    e.preventDefault();
    let template = '';


    if (store.questionNumber + 1 === store.questions.length) {
      store.quizStarted = false;

      

      if ($('input[name="answer"]:checked').val() === store.questions[store.questionNumber].correctAnswer) {

        store.score += 1;
        store.response = 'Good job. You are one step closer to saving the universe!';
      }
      else {
        store.incorrect += 1;
        store.response = `The correct answer is ${store.questions[store.questionNumber].correctAnswer}! Come on bud. The universe needs you!`;
        /*
        template = `<button class='next' type='submit'>Next</button><p>${store.response}</p><p><span class="correct">Correct answer: ${store.score}</span> <br><span class="incorrect">Incorrect answers: ${store.incorrect}</span></p>`;
        */
      }
      template = `<p>${store.response}</p><p><span class="correct">Correct answer: ${store.score} </span><br><span class="incorrect">Incorrect answers: ${store.incorrect}</span></p><p>You are done with this interview for the position of Junior Universe Saviour with ${store.score} correct and ${store.incorrect} incorrect. We will reach out to you in case you are a fit for saving the Universe. Thank you!</p><button type="submit" class="retake">Retake Quiz</button>`;

      $('form').html(template);
    }


    else if (store.showingQuestion === true) {
      let answer = $('input[name="answer"]:checked').val();
      


      if (answer === store.questions[store.questionNumber].correctAnswer) {
        store.score += 1;
        store.response = 'Good job. You are one step closer to saving the universe!';
        template = `<button class='next' type='submit'>Next</button><p>${store.response}</p><p><span class="correct">Correct answer: ${store.score} </span><br><span class="incorrect">Incorrect answers: ${store.incorrect}</span></p>`;

      } else {
        store.incorrect += 1;
        store.response = `The correct answer is ${store.questions[store.questionNumber].correctAnswer}! Come on bud. The universe needs you!`;
        template = `<button class='next' type='submit'>Next</button><p>${store.response}</p><p><span class="correct">Correct answer: ${store.score} </span><br><span class="incorrect">Incorrect answers: ${store.incorrect}</span></p>`;

      }
      store.showingQuestion = false;
    } else {
      
      store.questionNumber += 1;
      template = renderQuestionTemplate();
      store.showingQuestion = true;
    }
    $('form').html(template);

  });
}

function render() {

  start();
  handler();
  retakeQuiz();

  if (!store.quizStarted) {
    $('main').html(`<form class="flex-column flex-center"><p>The Universe we call home is in serious trouble. Without intervention it will suffer instant heat death. The kitty overlord that oversees the happenings of the Universe is looking for talented Junior Universe Saviours. The absolute requirements include masterful proficiency in plant biology and geometry. This quiz will serve as the beginning step for your application. Good luck!</p><button class="start" type="button">Start Quiz</button></form>`);

    return "Quiz started";
  }



}

$(render);






