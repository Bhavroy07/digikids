//var ed = require('edit-distance')
function getvalues()
{
    var obj=document.querySelectorAll('.ans');
    var arr=new Array();
    for(var i=0;i<obj.length;i++)
    {
        arr[i]=obj[i].textContent
    }
    var arr2=["apple","dog","cat","elephant"];
    for(var i2=0;i2<arr.length;i2++)
    {
        console.log(LevenshteinDistance(arr[i2],arr2[i2])+" ")
    }
}

LevenshteinDistance =  function(a1, b1){
    a=a1.toLowerCase()
    b=b1.toLowerCase()
    a=a.trim();
    b=b.trim();
    if(a.length == 0) return b.length; 
    if(b.length == 0) return a.length; 

    var matrix = [];

    // increment along the first column of each row
    var i;
    for(i = 0; i < b.length; i++){
        matrix[i] = [i];
    }

    // increment each column in the first row
    var j;
    for(j = 0; j < a.length; j++){
        matrix[0][j] = j;
    }

    // Fill in the rest of the matrix
    for(i = 1; i < b.length; i++){
        for(j = 1; j < a.length; j++){
            if(b.charAt(i-1) == a.charAt(j-1)){
                matrix[i][j] = matrix[i-1][j-1];
            } else {
            matrix[i][j] = Math.min(matrix[i-1][j-1] + 1, // substitution
                                    Math.min(matrix[i][j-1] + 1, // insertion
                                            matrix[i-1][j] + 1)); // deletion
        }
    }
}

return matrix[b.length-1][a.length-1];
};