
let num1, num2;
let operator;
let result;


function inputNumber(num){

    const header = document.querySelector("header");
    
    if(num === ","){

        disableComma()

    }

    if(num === "," && header.textContent === "0"){

        header.textContent = "0,"

    } else  {

        if(header.textContent === "0"){

            header.textContent = num
    
        } else if (header.textContent.length < 9){
    
            header.textContent = header.textContent + num;  
    
        }

    }

}

function disableComma(){
    
    const comma = document.getElementById("comma")

    comma.classList.add("inactive")    

    comma.setAttribute("disabled", "")

}

function enableComma(){
    
    const comma = document.getElementById("comma")

    comma.classList.remove("inactive")    

    comma.removeAttribute("disabled")

}

function inputOp(op){

    operator = op;
    const header = document.querySelector("header");

    num1 = parseFloat(header.textContent)
    header.textContent = "0"

}

function clear(){

    const header = document.querySelector("header");

    header.textContent = "0"
    enableComma()

}

function del(){

    const header = document.querySelector("header");

    if (header.textContent != "0"){

        if(header.textContent[header.textContent.length - 1] == ","){

            enableComma();

        }

        header.textContent = header.textContent.slice(0,header.textContent.length - 1)

        if(header.textContent.length === 0){

             header.textContent = "0"
            enableComma()
        }

    }

}

function operate(){

    switch (operator) {
        case "+":
            
            break;
    
        default:
            break;
    }
}

function equal(){

    

}

const buttons = document.querySelectorAll("button.num");

buttons.forEach(button => {
    button.addEventListener("click",(event)=> {

        let clickedNum = event.target.textContent

        inputNumber(clickedNum)
        console.log(clickedNum);
    })
})

const clearButton = document.getElementById("clearButton");

clearButton.addEventListener("click",(event)=> {

    clear()

})


const delButton = document.getElementById("delButton");

delButton.addEventListener("click",(event)=> {

    del()

})

const operators = document.querySelectorAll("button.op");

operators.forEach(button => {
    button.addEventListener("click",(event)=> {

        let clickedOp = event.target.textContent

        inputNumber(clickedOp)
    })
})