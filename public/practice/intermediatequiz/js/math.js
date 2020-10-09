const quizData = [
    {
        question : "Add :",
        a : '5 (Five)',
        b : '6 (Six)',
        c : '7 (Seven)',
        d : '8 (Eight)',
        image : 'quizimages/math1.jpg',
        correct : 'd',
        ans : '8 (Eight)'
    },
    {
        question : "Subtract :",
        a : '4 (Four)',
        b : '7 (Seven)',
        c : '1 (One)',
        d : '2 (Two)',
        image : 'quizimages/math2.jpg',
        correct : 'c',
        ans : '1 (One)'
    },
    {
        question : "Add :",
        a : '4 (Four)',
        b : '7 (Seven)',
        c : '6 (Six)',
        d : '5 (Five)',
        image : 'quizimages/math3.jpg',
        correct : 'b',
        ans : '7 (Seven)'
    }
];

const quiz = document.getElementById("quiz");
const result = document.getElementById("res");
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
let string = "";

loadQuiz();

function loadQuiz()
{
    deselect();
    const currentQuizData = quizData[currentQ];

    question.innerText = `Q${currentQ+1} ${currentQuizData.question}`;
    image.innerHTML = `<img class="img-thumbnail" src="${currentQuizData.image}" width="250px" height="250px">`;
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
        string+=answer;
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
            quiz.style.display='none';
            result.innerHTML=`
            <div class="container">
                <h1> <span class="badge badge-dark">Your Score :${score} / ${quizData.length}</span></h1>
                <hr>
                <div class="ques">
                    <h2> Q1. ${quizData[0].question}</h2>
                </div>
                <div class="row">
                    <div class="col-md-4">
                        <img class="img-thumbnail" src="${quizData[0].image}">
                    </div>
                    <div class="col-md-8 text-left">
                        <p>Correct Answer </p>
                        <span class="badge badge-success" style="font-size:25px">${quizData[0].ans}</span>
                        <p>Your Answer </p>
                        <span class="badge badge-info" style="font-size:25px">${quizData[0][string[0]]}</span>
                    </div>
                </div>
                <hr>

                <div class="ques">
                    <h2> Q2. ${quizData[1].question}</h2>
                </div>
                <div class="row">
                    <div class="col-md-4">
                        <img class="img-thumbnail" src="${quizData[1].image}">
                    </div>
                    <div class="col-md-8 text-left">
                        <p>Correct Answer </p>
                        <span class="badge badge-success" style="font-size:25px">${quizData[1].ans}</span>
                        <p>Your Answer </p>
                        <span class="badge badge-info" style="font-size:25px">${quizData[1][string[1]]}</span>
                    </div>
                </div>
                <hr>

                <div class="ques">
                    <h2> Q3. ${quizData[2].question}</h2>
                </div>
                <div class="row">
                    <div class="col-md-4">
                        <img class="img-thumbnail" src="${quizData[2].image}">
                    </div>
                    <div class="col-md-8 text-left">
                        <p>Correct Answer </p>
                        <span class="badge badge-success" style="font-size:25px">${quizData[2].ans}</span>
                        <p>Your Answer </p>
                        <span class="badge badge-info" style="font-size:25px">${quizData[2][string[2]]}</span>
                    </div>
                </div>
                <hr>
                <div>
                <button class="btn btn-danger" onclick="location.reload()" >Retry</button>
                </div>

            </div>
            `;
        }
    }
});