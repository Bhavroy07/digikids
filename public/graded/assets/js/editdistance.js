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
        arr[i]=objj.textContent;
    }
    var arr2=["apple","dog","cat","elephant","fish","giraffe"];
    var arr3=new Array();
    for(var i2=0;i2<arr.length;i2++)
    {
        arr3.push((LevenshteinDistance(arr[i2].toLowerCase(),arr2[i2])));
    }
    var accuracy=0,total=0;
    var score=document.querySelectorAll('.score');
    for(var i3=0;i3<arr3.length;i3++)
    {
        var diff=Math.abs(arr2[i3].length-arr3[i3]);
        var percent=(diff/arr2[i3].length)*100
        score[i3].value=`${percent.toFixed(2)}%`;
        total+=arr2[i3].length;
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

    var options = {'title':'Overall Performance', 'width':525, 'height':450};
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
