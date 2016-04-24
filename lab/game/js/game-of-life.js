document.addEventListener('DOMContentLoaded', function(){
    var matrixLen = 20;
    var initialArr = [];
    var target = document.querySelector("#cellCanvas");
    var startBtn = document.querySelector("#start");
    var stopBtn = document.querySelector("#stop");
    var randomBtn = document.querySelector("#random");
    var resetBtn = document.querySelector("#reset");

    initialRandomCell(initialArr);
    printArr(initialArr);
    var timer = setTimeout(updateCanvas, 1000);

    target.addEventListener('click', function(e){
        e.stopPropagation();
        var cellSpan = e.target;
        var x = cellSpan.dataset.cellx;
        var y = cellSpan.dataset.celly;
        cellSpan.classList.toggle('alive');
        initialArr[x][y] = (initialArr[x][y] + 1)%2;
    });

    startBtn.addEventListener('click', function(){
        timer = setTimeout(updateCanvas, 1000);
    });

    stopBtn.addEventListener('click', function(){
        clearTimeout(timer);
    });

    resetBtn.addEventListener('click', function(){
        clearTimeout(timer);
        initialCell(initialArr);
        printArr(initialArr);
    });

    randomBtn.addEventListener('click', function(){
        clearTimeout(timer);
        initialRandomCell(initialArr);
        printArr(initialArr);
    });

    function updateCanvas(){
        generateNextCanvas(initialArr);
        printArr(initialArr);
        timer = setTimeout(updateCanvas, 1000);
    }

    function deepCopyArray(obj){
        var retArr = [], len = obj.length;
        for(var i=0; i<len; i++){
            if(obj[i] instanceof Array){
                retArr[i] = deepCopyArray(obj[i]);
            }else{
                retArr[i] = obj[i];
            }
        }
        return retArr;
    }

    function printArr(cellArr){
        var html = "";
        for(var i=0; i<matrixLen; i++){
            for(var j=0; j<matrixLen; j++){
                if(cellArr[i][j]){
                    html += '<span class="cell alive" data-cellx="'+ i +'" data-celly="'+ j +'"></span>';
                }else{
                    html += '<span class="cell" data-cellx="'+ i +'" data-celly="'+ j +'"></span>';
                }
            }
        }
        target.innerHTML = html;
    }

    function initialCell(cellArr){
        for(var i=0; i<matrixLen; i++){
            cellArr[i] = [];
            for(var j=0; j<matrixLen; j++){
                cellArr[i][j] = 0;
            }
        }
    }

    function initialRandomCell(cellArr){
        for(var i=0; i<matrixLen; i++){
            cellArr[i] = [];
            for(var j=0; j<matrixLen; j++){
                if(i==7 && (j>6&&j<12))cellArr[i][j]=1;
                else if((i==8&&j==7) || (i==8&&j==11))cellArr[i][j]=1;
                else if(i==9 && (j>6&&j<12))cellArr[i][j]=1;
                else cellArr[i][j]=0;
            }
        }
    }

    function generateNextCanvas(cellArr){
        var tempArr = deepCopyArray(cellArr);
        for(var i=0; i<matrixLen; i++){
            for(var j=0; j<matrixLen; j++){
                var value = tempArr[i][j];
                var aliveCount = getArroudAliveCount(tempArr, i, j);
                cellArr[i][j] = getCellNextStatus(value, aliveCount);
            }
        }
    }

    function getCellNextStatus(value, count){
        var result = 0;
        if(value === 0){
            if(count === 3)result = 1;
        }else if(value === 1){
            if(count ===2 || count === 3)result = 1;
        }
        return result;
    }

    function getArroudAliveCount(arr, x, y){
        var count = 0;
        for(var i=x-1; i<=x+1; i++){
            for(var j=y-1; j<=y+1; j++){
                if(i===x && j===y)continue;
                try{
                    if(arr[i][j] === 1)count++;
                }catch(e){

                }
            }
        }
        return count;
    }
});