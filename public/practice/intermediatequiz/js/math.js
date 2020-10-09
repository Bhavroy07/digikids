const quizData = [
    {
        question : "Add :",
        a : '5',
        b : '6',
        c : '7',
        d : '8',
        image : 'quizimages/math1.jpg',
        correct : 'd'
    },
    {
        question : "Subtract :",
        a : '4',
        b : '7',
        c : '1',
        d : '2',
        image : 'quizimages/math2.jpg',
        correct : 'c'
    },
    {
        question : "Add :",
        a : '4',
        b : '7',
        c : '6',
        d : '5',
        image : 'quizimages/math3.jpg',
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