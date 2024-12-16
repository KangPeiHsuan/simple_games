document.addEventListener('DOMContentLoaded', () => {
    // 獲取 DOM 元素
    const gridDisplay = document.querySelector('.grid');
    const scoreDisplay = document.getElementById('score');

    // 初始化變量
    let squares = []
    let score = 0;

    // 創建遊戲板
    function createBoard(){
        for (let i = 0; i < 16; i++){
            square = document.createElement('div');
            square.innerHTML = 0;
            gridDisplay.appendChild(square);
            squares.push(square);
        }
        generateTwo();
        generateTwo();
    }
    createBoard();

    // 生成數字2
    function generateTwo(){
        let random = Math.floor(Math.random() * squares.length);
        if (squares[random].innerHTML == 0){
            squares[random].innerHTML = 2;
            
            // 每次放置完成後都及時檢查是否輸掉遊戲
            // checkLose();
        }
        else{
            generateTwo();
        }
    }

    // 向右移動
    function moveRight(){
        for (let i = 0; i < 16; i++){
            if (i % 4 == 0){
                // 當 i 是 0 的倍數(即每一行第一個數)時，進入迴圈，取得該行數列
                let totalOne = parseInt(squares[i].innerHTML)
                let totalTwo = parseInt(squares[i + 1].innerHTML)
                let totalThree = parseInt(squares[i + 2].innerHTML)
                let totalFour = parseInt(squares[i + 3].innerHTML)
                let row = [totalOne, totalTwo, totalThree, totalFour]

                // 先過濾出非 0 的數，計算缺少的數量後，將 0 和原本非 0 的數拼接
                let filteredRow = row.filter(x => x != 0)
                let missing = 4 - filteredRow.length
                let zeros = Array(missing).fill(0)
                let newRow = zeros.concat(filteredRow)

                // 將新行寫回到 squares 中
                squares[i].innerHTML = newRow[0]
                squares[i+1].innerHTML = newRow[1]
                squares[i+2].innerHTML = newRow[2]
                squares[i+3].innerHTML = newRow[3]
            }
        }
    }

    // 向左移動
    function moveLeft(){
        for (let i = 0; i<16; i++){
            if( i % 4 == 0 ){

                let totalOne = parseInt(squares[i].innerHTML)
                let totalTwo = parseInt(squares[i+1].innerHTML)
                let totalThree = parseInt(squares[i+2].innerHTML)
                let totalFour = parseInt(squares[i+3].innerHTML)
                let row = [totalOne,totalTwo,totalThree,totalFour]

                let filteredRow = row.filter(x => x != 0)
                let missing = 4 - filteredRow.length
                let zeros = Array(missing).fill(0)
                let newRow = filteredRow.concat(zeros)                

                squares[i].innerHTML = newRow[0]
                squares[i+1].innerHTML = newRow[1]
                squares[i+2].innerHTML = newRow[2]
                squares[i+3].innerHTML = newRow[3]
            }
        }
    }

    function sumRow(){
        // 第 16 個數字不會有右邊的鄰居，所以迴圈到 15 為止
        for (let i=0; i <15; i++){
            // 如果左邊的數和右邊的數相等，則將兩個數相加，並將右邊的數設為 0
            if(squares[i].innerHTML == squares[i+1].innerHTML){
                let combineNum = parseInt(squares[i].innerHTML) + parseInt(squares[i+1].innerHTML)
                squares[i].innerHTML = combineNum
                squares[i+1].innerHTML = 0
                score += combineNum
                scoreDisplay.innerHTML = score
            }
        }
        checkWin();
    }    


    // 向下移動
    function moveDown(){
        for(let i=0; i<4; i++){

            let totalOne = parseInt(squares[i].innerHTML)
            let totalTwo = parseInt(squares[i+4].innerHTML)
            let totalThree = parseInt(squares[i+4*2].innerHTML)
            let totalFour = parseInt(squares[i+4*3].innerHTML)
            let column = [totalOne,totalTwo,totalThree,totalFour]

            let filteredColumn = column.filter(x => x!=0 )
            let missing = 4 - filteredColumn.length
            let zeros = Array(missing).fill(0)
            let newColumn = zeros.concat(filteredColumn)

            squares[i].innerHTML = newColumn[0]
            squares[i+4].innerHTML = newColumn[1]
            squares[i+4*2].innerHTML = newColumn[2]
            squares[i+4*3].innerHTML = newColumn[3]
        }
    }

    // 向上移動
    function moveUp(){
        for(let i=0; i<4; i++){

            let totalOne = parseInt(squares[i].innerHTML)
            let totalTwo = parseInt(squares[i+4].innerHTML)
            let totalThree = parseInt(squares[i+4*2].innerHTML)
            let totalFour = parseInt(squares[i+4*3].innerHTML)
            let column = [totalOne,totalTwo,totalThree,totalFour]

            let filteredColumn = column.filter(x => x!=0 )
            let missing = 4 - filteredColumn.length
            let zeros = Array(missing).fill(0)
            let newColumn = filteredColumn.concat(zeros)

            squares[i].innerHTML = newColumn[0]
            squares[i+4].innerHTML = newColumn[1]
            squares[i+4*2].innerHTML = newColumn[2]
            squares[i+4*3].innerHTML = newColumn[3]
        }
    }

    function sumColumn(){
        // 因為是向下相加的方式，索引值 12~15 沒有下方的鄰居，所以迴圈到索引值 12 為止
        for (let i=0; i <12; i++){
            if(squares[i].innerHTML == squares[i+4].innerHTML){
                let combineNum = parseInt(squares[i].innerHTML) + parseInt(squares[i+4].innerHTML)
                squares[i].innerHTML = combineNum
                squares[i+4].innerHTML = 0
                score += combineNum
                scoreDisplay.innerHTML = score
            }
        }

        checkWin()
    }

    // 設定方向鍵
    function control(event){
        if(event.keyCode === 39){
            keyRight()
        }else if (event.keyCode === 37){
            keyLeft()
        }else if (event.keyCode === 38){
            keyUp()
        }else if (event.keyCode === 40){
            keyDown()
        }
        else{
            console.log("Invalid key")
        }
    }

    // 監聽鍵盤事件，只要按任意鍵，就會觸發 control 函式
    document.addEventListener('keyup',control)

    function keyRight(){
        moveRight()
        sumRow()
        moveRight()
        generateTwo()
    }

    function keyLeft(){
        moveLeft()
        sumRow()
        moveLeft()
        generateTwo()
    }

    function keyDown(){
        moveDown()
        sumColumn()
        moveDown()
        generateTwo()
    }

    function keyUp(){
        moveUp()
        sumColumn()
        moveUp()
        generateTwo()
    }

    // 檢查是否贏得遊戲
    function checkWin(){
        for(let i=0; i < 16; i++){
            if (squares[i].innerHTML == 2048){
                alert('恭喜你贏得遊戲！重新整理頁面可以再次開始遊戲。')
                document.removeEventListener('keyup', control)
            }
        }
    }

    // 檢查是否輸掉遊戲
    function checkLose(){
        let numZeros = 0
        for(let i = 0; i<16; i++){
            if(squares[i].innerHTML == 0){
                numZeros++
            }
        }
        if(numZeros == 0){
            alert('遊戲結束！重新整理頁面可以再次開始遊戲。')
            document.removeEventListener('keyup', control)
        }
    }

});