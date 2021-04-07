const $input = document.querySelector("input");
//console.log($input);

const numKeys = document.querySelectorAll(".numKeys");

// fixing value into the input value onclick of the num keys
numKeys.forEach(function(numKey) {
    numKey.addEventListener("click", function(e) {
        $input.value = $input.value !== "0"
        ? $input.value + numKey.innerText : numKey.innerText;
    })
})

//we want to set a buffer;
const buffer = [];

const opCallback = opName => () => {
    let currentVal = $input.value;

    if (opName === "percent") {
        currentVal *= 0.01;
        $input.value = currentVal;
    } else {
        if (buffer && buffer.length) {
            buffer.push({value: parseFloat(currentVal) });

            const result = evaluate(buffer);

            buffer.push({value: result});
            buffer.push({value: opName});

            $input.value = "";

        } else {
            buffer.push({value: parseFloat(currentVal)});
            buffer.push({value: opName});
            $input.value = "";

        }
    }
}

//Evaluate function;
const evaluate = buffer => {
    const secondOperand = buffer.pop().value;
    const operator = buffer.pop().value;
    const firstOperand = buffer.pop().value;

    switch (operator) {
        case "add":
           return firstOperand + secondOperand
            break;
    
        case "subtract":
           return firstOperand - secondOperand
            break;

        case "multiply":
          return  firstOperand * secondOperand
            break;

        case "divide":
           return firstOperand / secondOperand
            break;
    
        default:
            return secondOperand;
    }
}


// a for of loop is used to loop over iterable objects like array.
for (const opName of ["add", "subtract", "multiply", "divide", "percent"]) {
  const opera =  document.querySelector(`.opKeys[op=${opName}]`);
  opera.onclick = opCallback(opName);
   
}

const equalsTo = document.querySelector(".equalsKey");
    equalsTo.addEventListener("click", function() {
        if (buffer && buffer.length) {
            buffer.push({value: parseFloat($input.value)});

            $input.value = evaluate(buffer);

        }
    })


const clearBtn = document.querySelector(".opkeys[op='clear']");
    clearBtn.addEventListener("click", function() {
        $input.value = 0;
        buffer.length = 0;
    })


    const negateBtn = document.querySelector(".opkeys[op='negate']");
        negateBtn.addEventListener("click", function() {
                $input.value = parseFloat(-$input.value);
        })
    

