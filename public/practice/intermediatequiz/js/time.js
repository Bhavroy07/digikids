const quizData = [
    {
        question : "What time does the clock show ?",
        a : '4:00',
        b : '5:00',
        c : '6:00',
        d : '5:30',
        image : 'quizimages/time1.png',
        correct : 'b'
    },
    {
        question : "What time does the clock show ?",
        a : '11:00',
        b : '11:30',
        c : '12:00',
        d : '1:00',
        image : 'quizimages/time2.png',
        correct : 'c'
    },
    {
        question : "What time does the clock show ?",
        a : '9:00',
        b : '9:10',
        c : '8:10',
        d : '10:10',
        image : 'quizimages/time3.png',
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