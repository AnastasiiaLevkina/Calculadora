
let num1 = 0
let num2 = 0
let operator = "";
let result;
let num1saved = false
let hasResult = false

function inputNumber(num){

    const header = document.querySelector("header");

    if(num1saved){
        header.textContent = "0"
        num1saved = false
    }
    
    if(num === ","){

        disableComma()

    }

    if(num === "," && header.textContent === "0"){

        header.textContent = "0,"

    } else  {

        if(header.textContent === "0" || hasResult){

            header.textContent = num
            hasResult = false
    
        }else if(header.textContent === "-0"){

            if(num == ","){

                header.textContent = "-0,"

            }else{

                header.textContent = "-" + num

            }

        } else if (header.textContent.length < 9){
    
            header.textContent = header.textContent + num;  
    
        }

    }

    if(num != ","){
        const disabledButtons = document.querySelectorAll("button.inactive")
        disabledButtons.forEach(button => {

            button.classList.remove("inactive")
            button.removeAttribute("disabled")

        })
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

    const header = document.querySelector("header");

    if(header.textContent == "0" && op.textContent == "-"){

        op.classList.add("active-plus")
        header.textContent = "-0"

    }else if(op.textContent == "-" && operator.length == 0){

        activateOp(op)
        operator = op.textContent;
        num1 = parseFloat(header.textContent.replace(",", "."))
        num1saved = true
        enableComma()

    }else if(op.textContent != "-"){

        desactivateOp()
        activateOp(op)
        operator = op.textContent;
        num1 = parseFloat(header.textContent.replace(",", "."))
        num1saved = true
        enableComma()

    }

}

function activateOp(op){

    op.classList.add("active")

}

function desactivateOp(){

    if(operator && operator.length != 0){
        const op = document.getElementById("op"+operator)
        op.classList.remove("active")
    }

}

function clear(){

    const header = document.querySelector("header");
    const opButtons = document.querySelectorAll(".op")

    opButtons.forEach(opButton => {
        opButton.classList.remove("active")
        opButton.classList.remove("active-plus")
    })

    num1 = 0
    num2 = 0
    operator = ""
    header.textContent = "0"
    enableComma()
    num1saved = false
    result = 0

    const disabledButtons = document.querySelectorAll("button[name=disable]")
    disabledButtons.forEach(button => {

        button.classList.add("inactive")
        button.setAttribute("disabled", "")
        
    })
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

function equal(){
    const header = document.querySelector("header");
    num2 = parseFloat(header.textContent.replace(",", "."))

    switch (operator) {
        case "+":
            result = num1 + num2
            break;
        case "-":
            result = num1 - num2
            break;
        case "x":
            result = num1 * num2
            break;
        case "/":
            if(num2 == 0){
                result = "ERROR"
            }else{
                result = num1 / num2
            }
            break;
        default:
            result = header.textContent
            break;
    }

    let formattedResult = String(result)

    if(formattedResult.length > 9){

        if(result > 999999999){

            formattedResult = String(result.toExponential(2))

        }else{

            formattedResult = formattedResult.slice(0 , 8)

        }

    }

    if(num1saved){

        header.textContent = num1
        num1saved = false

    }else{

        header.textContent = formattedResult.replace(".", ",")

    }

    const opButtons = document.querySelectorAll(".op")

    opButtons.forEach(opButton => {
        opButton.classList.remove("active")
        opButton.classList.remove("active-plus")
    })

    hasResult = true
    operator = ""
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

        let clickedOp = event.target

        inputOp(clickedOp)
    })
})

const equalButton = document.getElementById("equalButton")

equalButton.addEventListener("click",(event)=> {

    equal()

})