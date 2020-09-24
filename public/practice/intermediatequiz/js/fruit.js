const quizData = [
    {
        question : "What is the name of this fruit ?",
        a : 'Apple',
        b : 'Banana',
        c : 'Watermelon',
        d : 'Grapes',
        image : 'quizimages/banana.jpg',
        correct : 'b'
    },
    {
        question : "What is the name of this fruit ?",
        a : 'Orange',
        b : 'Banana',
        c : 'Grapes',
        d : 'Mango',
        image : 'quizimages/orange.jpg',
        correct : 'a'
    },
    {
        question : "What is the name of this fruit ?",
        a : 'Banana',
        b : 'Grapes',
        c : 'Apple',
        d : 'Watermelon',
        image : 'quizimages/grapes.jpg',
        correct : 'b'
    }
];

const quiz = document.getElementById("quiz");
const answerEls = document.querySelectorAll(".answer");
const question = document.getElementById('question');
const atext = document.getElementById('atext');
const btext = document.getElementById('btext');
const ctext = document.getElementById('ctext');
const dtext = document.getElementById('dtext');
const image = document.getElementById("image");

const btn = document.getElementById('submit');

let currentQ = 0;
let answer = undefined;
let score = 0;

loadQuiz();

function loadQuiz()
{
    deselect();
    const currentQuizData = quizData[currentQ];

    question.innerText = currentQuizData.question;
    image.innerHTML = `<img class="img-thumbnail" src="${currentQuizData.image}" width="200px" height="200px">`;
    atext.innerText = currentQuizData.a;
    btext.innerText = currentQuizData.b;
    ctext.innerText = currentQuizData.c;
    dtext.innerText = currentQuizData.d;
}

function getSelected()
{
    // console.log(answerEls);

    let answer = undefined;

    answerEls.forEach((answerEl) => {
        if(answerEl.checked)
        {
            answer = answerEl.id;
        }
    });
    return answer;
}

function deselect()
{
    answerEls.forEach((answerEl) => {
        answerEl.checked = false;
    });
}

btn.addEventListener('click',()=>{

    const answer = getSelected();
    if(answer)
    {
        if(answer === quizData[currentQ].correct)
        {
            score++;
        }
        currentQ++;

        if(currentQ < quizData.length)
        {
            loadQuiz();
        }
        else
        {
            quiz.innerHTML = `<h2> Your Score : ${score} / ${quizData.length} </h2> 
            <button onclick="location.reload()" >Retry</button>`;
        }
    }
});