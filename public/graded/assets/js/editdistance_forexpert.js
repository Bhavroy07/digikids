var questions=["In which direction does the sunrise?",
"How many planets are in our solar system?",
"How many days are in a leap year?",
"How many colors are there in a rainbow?",
"How many letters are there in the English alphabet?",
"Which animal is called King of Jungle?",
"How many sides are there in a triangle?",
"Which month of the year has the least number of days?",
"We smell with our?",
"Which day comes after Friday?",
"How many months do we have in a year?",
"Which festival is also known as “Festival of Lights”?",
"What do you call a type of shape that has five sides?",
"Which is the largest continent in the world ?",
"In which festival we play with colours?",
"Which planet is closest to the sun?",
"which is the largest state of India?",
["The largest river in India?"]];

var answers=[["East",""],["8","Eight"],["366","Three hundred sixty six"],["7","Seven"],["26","Twenty six"],["Lion",""],
["3","Three"],["February",""],["Nose",""],["Saturday",""],["12","Twelve"],["Diwali","Deepavali"],["Pentagon",""],
["Asia",""],["Holi",""],["Mercury",""],["Rajasthan",""],["Ganga",""]];

var arr2=[];
var quesArr=[];
while(quesArr.length<6)
{
    var random=Math.floor(Math.random()*questions.length);
    var flg=0;
    for(var i=0;i<arr2.length;i++)
    {
        if(questions[random]===quesArr[i])
        {
            flg=1;
            break;
        }
    }
    if(flg==0)
    {
        quesArr.push(questions[random]);
        arr2.push(answers[random]);
    }
}
var ques = document.querySelectorAll(".ques");
for(var i=0; i<6; i++)
{
    ques[i].textContent=quesArr[i];
}



function draw()
{
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart);
}

function drawChart()
{
    var obj=document.querySelectorAll('.ans');
    var arr=new Array();
    for(var i=0;i<obj.length;i++)
    {
        var objj=document.getElementById(`ans${i+1}`)
        arr[i]=objj.value;
    }
    var arr4=new Array();
    var arr3=new Array();
    for(var i2=0;i2<arr.length;i2++)
    {
        if(arr2[i2].length>1)
        {
            var dis1 = LevenshteinDistance(arr[i2].toLowerCase(),arr2[i2][0].toLowerCase());
            var dis2 = LevenshteinDistance(arr[i2].toLowerCase(),arr2[i2][1].toLowerCase());
            if(dis1<dis2)
                arr4.push(0)
            else
                arr4.push(1)

            arr3.push(Math.min(dis1,dis2))
        }
        else
        {
            arr3.push(LevenshteinDistance(arr[i2].toLowerCase(),arr2[i2][0].toLowerCase()));
            arr4.push(0);
        }
    }
    var accuracy=0,total=0;
    var score=document.querySelectorAll('.score');
    for(var i3=0;i3<arr3.length;i3++)
    {
        var diff=(arr2[i3][arr4[i3]].length-arr3[i3]);
        if(diff<0)
            diff=0;
        var percent=0;
        if(arr2[i3][arr4[i3]].length>0) percent=(diff/arr2[i3][arr4[i3]].length)*100;
        
        score[i3].value=`${percent.toFixed(2)}%`;
        total+=arr2[i3][arr4[i3]].length;
        accuracy+=diff;
    }
    var remark=document.querySelector('#remark');
    if(accuracy/total > 0.8)
    {
        remark.textContent="Well Done!";
        remark.style.color="Green";
    }
    else if(accuracy/total > 0.6)
    {
        remark.textContent="Good Job!\n But can do better.";
        remark.style.color="rgba(0,200,0,0.7)";
    }
    else if(accuracy/total > 0.4)
    {
        remark.textContent="Improvement needed.";
        remark.style.color="rgba(150,150,0,0.7)";
    }
    else if(accuracy/total > 0.2)
    {
        remark.textContent="Can do better.";
        remark.style.color="rgba(200,0,0,0.7)";
    }
    else
    {
        remark.textContent="Practice more!\n There is always a scope for improvement :)";
        remark.style.color="Red";
    }
    

    document.querySelector(".container").style.display='none';

    var data = google.visualization.arrayToDataTable([
        ['A','B'],
        ['Accuracy', accuracy],
        ['Inaccuracy', total-accuracy]
        ]);

    var options = {'title':'Overall Performance', 'width':535, 'height':450};
    var pie=document.getElementById('piechart');
    document.getElementById('chart').style.display="block";
    var chart = new google.visualization.PieChart(pie);
    chart.draw(data, options);
}

LevenshteinDistance =  function(a1, b1){
    a=a1//.toLowerCase()
    b=b1//.toLowerCase()
    if(a.length == 0) return b.length; 
    if(b.length == 0) return a.length; 

    var matrix = [];

    var i;
    for(i = 0; i <= b.length; i++){
        matrix[i] = [i];
    }

    
    var j;
    for(j = 0; j <= a.length; j++){
        matrix[0][j] = j;
    }

    for(i = 1; i <= b.length; i++){
        for(j = 1; j <= a.length; j++){
            if(b.charAt(i-1) == a.charAt(j-1)){
                matrix[i][j] = matrix[i-1][j-1];
            } else {
            matrix[i][j] = Math.min(matrix[i-1][j-1] + 1, // substitution
                                    Math.min(matrix[i][j-1] + 1, // insertion
                                            matrix[i-1][j] + 1)); // deletion
        }
    }
}

return matrix[b.length][a.length];
};