function getvalues()
{
    var obj=document.querySelectorAll('.ans');
    var arr=new Array();
    for(var i=0;i<obj.length;i++)
    {
        var objj=document.getElementById(`ans${i+1}`)
        arr[i]=objj.value;
    }
    //console.log(arr)
    var arr4=new Array();
    var arr2=[["east",""],["8","eight"],["366","three hundred sixty six"],["7","seven"],["26","twenty six"],["lion",""]];
    var arr3=new Array();
    for(var i2=0;i2<arr.length;i2++)
    {
    //console.log(LevenshteinDistance(arr[i2].toLowerCase(),arr2[i2]))
    //arr3.push((LevenshteinDistance(arr[i2].toLowerCase(),arr2[i2])));
    if(arr2[i2].length>1)
    {
    var dis1 = LevenshteinDistance(arr[i2].toLowerCase(),arr2[i2][0])
    var dis2 = LevenshteinDistance(arr[i2].toLowerCase(),arr2[i2][1])
    if(dis1<dis2)
    arr4.push(0)
    else
    arr4.push(1)

    arr3.push(Math.min(dis1,dis2))
    }
    else
    {
    arr3.push(LevenshteinDistance(arr[i2].toLowerCase(),arr2[i2][0]))
    arr4.push(0)
    }
    }
    console.log(arr3)
    console.log(arr2)
    for(var i3=0;i3<arr3.length;i3++)
    {
        var diff=arr2[i3][arr4[i3]].length-arr3[i3]
        var accu=(diff/arr2[i3][arr4[i3]].length)*100
        if(accu<=0)
        {
            var obj2=document.getElementById(`cans${i3+1}`)
            obj2.value="0%"
        }
        else{
            var obj2=document.getElementById(`cans${i3+1}`)
            obj2.value=`${accu}%`
        }
    }
    var ar=document.querySelectorAll('.disp');
			for(var i=0;i<ar.length;i++)
			{
				ar[i].style.display="block";
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

return matrix[b.length][a.length];
};