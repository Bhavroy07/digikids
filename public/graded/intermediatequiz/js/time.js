const quizData = [
    {
        question : "What time does the clock show ?",
        a : '4:00',
        b : '5:00',
        c : '6:00',
        d : '5:30',
        image : 'quizimages/time1.png',
        correct : 'b',
        ans : '5:00'
    },
    {
        question : "What time does the clock show ?",
        a : '11:00',
        b : '11:30',
        c : '12:00',
        d : '1:00',
        image : 'quizimages/time2.png',
        correct : 'c',
        ans:'12:00'
    },
    {
        question : "What time does the clock show ?",
        a : '9:00',
        b : '9:10',
        c : '8:10',
        d : '10:10',
        image : 'quizimages/time3.png',
        correct : 'b',
        ans:'9:10'
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