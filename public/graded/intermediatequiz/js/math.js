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
            result.style.display='block';
            
            var remark = document.getElementById('remark');

            if(score==quizData.length)
            {
                remark.textContent="Well Done!";
                remark.style.color="Green";
            }
            else if(score==quizData.length-1)
            {
                remark.textContent="Good Job!\n But can do better.";
                remark.style.color="rgba(0,200,0,0.7)";
            }
            else if(score==quizData.length-2)
            {
                remark.textContent="Improvement needed.";
                remark.style.color="rgba(150,150,0,0.7)";
            }
            else
            {
                remark.textContent="Practice more!\n There is always a scope for improvement :)";
                remark.style.color="Red";
            }

            for(var i=0;i<quizData.length;i++)
            {
                if(quizData[i].ans===quizData[i][string[i]])
                {
                    var t = document.getElementById('wrong'+i);
                    console.log(t);
                    
                    t.style.display='none';   
                }
                else
                {
                    var t = document.getElementById('correct'+i);
                    t.style.display='none'; 
                    console.log(t);
                }
            }
        }
    }
});