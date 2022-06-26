const myInit = {
    method: 'GET',
    mode: 'cors',
};

fetch("../types.json", myInit)
.then(response => {
    return response.json();
})
.then(jsondata => console.log(jsondata));


const INPUT = 'input'
const SELECT = 'select'

const calculate = document.querySelector('#calculate')
const newRow = document.querySelector('#newRow')

const INPUTS = [
    {
        type: SELECT,
        name: 'type'
    },
    {
        type: INPUT,
        name: 'length'
    },
    {
        type: INPUT,
        name: 'attribute'
    }
]

var amountAttributes = 0 
var containerElemento = document.querySelector('.columns')

newRow.addEventListener('click', (evento) => {
    evento.preventDefault()
    createRow()
})

function createRow() {

    let tbody  = document.createElement('tbody'); 
    containerElemento.appendChild(tbody);

    let row = document.createElement('tr'); 
    tbody.appendChild(row) 

    amountAttributes++

    for (let input of INPUTS) {
        let th = document.createElement('th'); 
        row.appendChild(th) 
    
        if (input.type === INPUT) {
            elemento = createInput(input.name, amountAttributes)
        } else if (input.type === SELECT) {
            elemento = createSelect(input.name, amountAttributes)
        }

        th.appendChild(elemento);
    }
}


function createInput(name, id) {
    let input = document.createElement(INPUT)
    input.setAttribute('type', 'text')
    input.setAttribute('id', `${name}-${id}`)

    return input;
}

items = [
    'ola mundo',
    'mundo',
    'ldldldl'
]

function createSelect(name, id) {
    let select = document.createElement(SELECT)
    select.setAttribute('id', `${name}-${id}`)

    for (let item of items) {
        let option = document.createElement("option");
        option.value = item
        option.text = item

        select.appendChild(option);
    }
    
    return select
}

function render() {
    for (let i = 0; i < 3; i++) {
        createRow()
    }
}

render()