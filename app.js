/**
 * Example store structure
 */
const STORE = {
    // 5 or more questions are required
    questions: [
      { 
        question: 'What color is broccoli?',
        answers: [ 'red', 'orange', 'pink','green' ],
        correctAnswer: 'green' 
      },
      {
        question: 'Which one of these is the power house of a cell?',
        answers: ['Peroxisome', 'Mitochondria', 'Chromatin','Nucleus'],
        correctAnswer: 'Mitochondria'
      },
      {
        question: 'Which one of these is NOT a major food group?',
        answers: [ 'Protein', 'Carbohydrates', 'Chocalate'],
        correctanswer: 'Chocalate'
      },
      {
        question: 'Which one of these is not an ingrediant in cake?',
        answers: [ 'Eggs', 'Beef', 'Flour' ],
        correctAnswer: 'Beef'
      },
      {
        question: 'What is tea made of?',
        answers: [ 'Beans', 'Roots', 'Leaves' ],
        correctAnswer: 'Leaves'
      },
    ],

    quizStarted: false,
    questionNumber: 0,
    score: 0

  };
  
  /**
   * 
   * Technical requirements:
   * 
   * Your app should include a render() function, 
   * that regenerates the view each time the store is updated. 
   * See your course material and access support for more details.
   *
   * NO additional HTML elements should be added to the index.html file.
   *
   * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
   *
   * SEE BELOW FOR THE CATEGORIES OF THE TYPES OF FUNCTIONS YOU WILL BE CREATING 👇
   * 
   */
  
  /********** TEMPLATE GENERATION FUNCTIONS **********/
  
  // These functions return HTML templates
  
  /********** RENDER FUNCTION(S) **********/
  
  // This function conditionally replaces the contents of the <main> tag based on the state of the store
  
  /********** EVENT HANDLER FUNCTIONS **********/
  
  // These functions handle events (submit, click, etc)




  /********** TEMPLATE GENERATION FUNCTIONS **********/

/**
 * Generates HTML for the start screen
 */
function generateStartScreenHtml() {
  return `
    <div class="start-screen">
      <p>This quiz will assess your basic knowledge of HTML, CSS and JavaScript.</p>
      <button type="button" id="start">Start Quiz</button>
    </div>
  `;
}
/**
 * Generates the HTML for the section of the app 
 * that displays the question number and the score
 */
 function generateQuestionNumberAndScoreHtml() {
  return `
    <ul class="question-and-score">
      <li id="question-number">
        Question Number: ${STORE.questionNumber + 1}/${STORE.questions.length}
      </li>
      <li id="score">
        Score: ${STORE.score}/${STORE.questions.length}
      </li>
    </ul>
  `;
}
/**
 * Generates the list of possible answers for
 * one question
 */
function generateAnswersHtml() {
  const answersArray = STORE.questions[STORE.questionNumber].answers
  let answersHtml = '';
  let i = 0;

  answersArray.forEach(answer => {
    answersHtml += `
      <div id="option-container-${i}">
        <input type="radio" name="options" id="option${i + 1}" value= "${answer}" tabindex ="${i + 1}" required> 
        <label for="option${i + 1}"> ${answer}</label>
      </div>
    `;
    i++;
  });
  return answersHtml;
}
/**
 * Generates the HTML to display one question
 */
function generateQuestionHtml() {
  let questionNumber = STORE.questions[STORE.questionNumber];
  return `
    <form id="question-form" class="question-form">
      <fieldset>
        <div class="question">
          <legend> ${questionNumber.question}</legend>
        </div>
        <div class="options">
          <div class="answers">
            ${generateAnswersHtml()}
          </div>
        </div>
        <button type="submit" id="submit-answer-btn" tabindex="5">Submit</button>
        <button type="button" id="next-question-btn" tabindex="6"> Next &gt;></button>
      </fieldset>
    </form >
  `;
}

/**
 * Generates the HTML for the results screen
 */
function generateResultsScreen() {
  return `
    <div class="results">
      <form id="js-restart-quiz">
        <fieldset>
          <div class="row">
            <div class="col-12">
              <legend>Your Score is: ${STORE.score}/${STORE.questions.length}</legend>
            </div>
          </div>
        
          <div class="row">
            <div class="col-12">
              <button type="button" id="restart"> Restart Quiz </button>
            </div>
          </div>
        </fieldset>
    </form>
    </div>
  `;
}


function generateFeedbackHTML(answerStatus) {
  let correctAnswer = STORE.questions[STORE.questionNumber].correctAnswer;
  let html = '';
  if (answerStatus === 'correct') {
    html = `
    <div class="right-answer">That is correct!</div>
    `;
  }
  else if (answerStatus === 'incorrect') {
    html = `
      <div class="wrong-answer">That is incorrect. The correct answer is ${correctAnswer}.</div>
    `;
  }
  return html;
}

/*********************************************
  ------------ RENDER FUNCTION -------------
*/

function render() {
  let html = '';

  /* If quiz has not been started  */

  if (STORE.quizStarted === false) {
    $('main').html(generateStartScreenHtml());
    return;
  }
  else if (STORE.questionNumber >= 0 && STORE.questionNumber < STORE.questions.length) {
    html = generateQuestionNumberAndScoreHtml();
    html += generateQuestionHtml();
    $('main').html(html);
  }
  else {
    $('main').html(generateResultsScreen());
  }
}

/*------------ EVENT HANDLER FUNCTIONS -----------*/

/***************************************************************
  ------ When "Start" button clicked do etc.. & Rerender ------
*/

function onStart() {
  $('main').on('click', '#start', function (event) {
    STORE.quizStarted = true;
    render();
  });
}

/**************************************************************
  ------ When "Next" button clicked do etc.. & Rerender ------
*/

function onNextQuestionClick() {
  $('body').on('click', '#next-question-btn', (event) => {
    render();
  });
}

/*********************************************************************
  ------ When "Submit" button clicked do etc.. & Rerender ------
*/

function onSubmissionClick() {
  $('body').on('submit', '#question-form', function (event) {
    event.preventDefault(); /* prevent default submisison request */
    const questionNumber = STORE.questions[STORE.questionNumber];

    // get value from checked checkbox
    let selectedOption = $('input[name=options]:checked').val();
    /*
     * Creates an id '#option-container' + the index of 
     * the current question in the answers array.
     * 
     * Example: #option-container-0
     */
    let optionContainerId = `#option-container-${questionNumber.answers.findIndex(i => i === selectedOption)}`;

    if (selectedOption === questionNumber.correctAnswer) {
      STORE.score++;
      $(optionContainerId).append(generateFeedbackHTML('correct'));
    }
    else {
      $(optionContainerId).append(generateFeedbackHTML('incorrect'));
    }
    STORE.questionNumber++;
    // hide the submit button
    $('#submit-answer-btn').hide();
    // disable all inputs
    $('input[type=radio]').each(() => {
      $('input[type=radio]').attr('disabled', true);
    });
    // show the next button
    $('#next-question-btn').show();

  });
}

/***************************************************
  ------ When "Restart" button clicked ------
  ------ all STORE values will be reset -----
*/

function onRestartClick() {
  $('body').on('click', '#restart', () => {
    restartQuiz();
    render();
  });
}

function restartQuiz() {
  STORE.quizStarted = false;
  STORE.questionNumber = 0;
  STORE.score = 0;
}

/***********************************************/

function handleQuizApp() {
  render();
  onStart();
  onNextQuestionClick();
  onSubmissionClick();
  onRestartClick();
}

$(handleQuizApp);