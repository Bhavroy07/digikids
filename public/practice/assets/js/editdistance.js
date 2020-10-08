function getvalues()
{
    var obj=document.querySelectorAll('.ans');
    var arr=new Array();
    for(var i=0;i<obj.length;i++)
    {
        var objj=document.getElementById(`ans${i+1}`)
        arr[i]=objj.textContent
    }
    var arr2=["apple","dog","cat","elephant","fish","giraffe"];
    var arr3=new Array();
    for(var i2=0;i2<arr.length;i2++)
    {
    //console.log(LevenshteinDistance(arr[i2].toLowerCase(),arr2[i2]))
    arr3.push((LevenshteinDistance(arr[i2].toLowerCase(),arr2[i2])));
    }
    for(var i3=0;i3<arr3.length;i3++)
    {
       var diff=arr2[i3].length-arr3[i3]
       var accu=(diff/arr2[i3].length)*100
       if(accu<=0)
       {
           var obj2=document.getElementById(`cans${i3+1}`)
           obj2.textContent="0%"
       }
       else{
        var obj2=document.getElementById(`cans${i3+1}`)
        obj2.textContent=`${accu}%`
       }
    }

    var x = document.querySelectorAll(".hidden");
    var y = document.querySelectorAll(".ques");
    for (var i = 0; i < x.length; i++) 
    {
        x[i].style.display = "block";
        y[i].style.height = "500px";
    }
    
    
    

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

return matrix[b.length][a.length]-1;
};