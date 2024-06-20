let selectedNum = "";
let num1 = "";
let num2;
let result;

let operation = "";

function inputNumber(number)
{
    if (selectedNum.length < 9)
    {
           selectedNum += number; 
    }
}

// Possible operations: "+", "-", "*" (×), "/"
function selectOperation(op)
{
    operation = op;
}

function clear()
{
    if (selectedNum != "0")
    {
        selectedNum = selectedNum.replace(/.$/, "");
        if (selectedNum == "")
            selectedNum = "0";
    }
}

function clearAll()
{
    selectedNum = "";
    num1 = "";
    num2 = "";
    // Change selected num in the calc
    // De-select the operation button
}

function executeOp()
{
    if (num2 == "") num2 = num1;
    if (operation == "/" && parseFloat(num2) == 0.0)
    {
        window.alert("ERROR: Division entre 0!");
        clearAll();
    }

    else 
    {
        // Execute operation
        switch(operation)
        {
            case "+":
                result = parseFloat(num1) + parseFloat(num2);
                break;
            case "-":
                result = parseFloat(num1) - parseFloat(num2);
                break;
            case "*":
                result = parseFloat(num1) * parseFloat(num2);
                break;
            default:
                result = parseFloat(num1) / parseFloat(num2);
        }
    }
}