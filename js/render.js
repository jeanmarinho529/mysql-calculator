// const myInit = {
//     method: 'GET',
//     mode: 'cors',
// }

// fetch("../types.json", myInit)
// .then(response => {
//     return response.json()
// })
// .then(jsondata => console.log(jsondata.name))

// mundo = []
// fetch("./types.json", myInit)
// .then(response => {
//     return response.json()
// })
// .then(jsondata => mundo = jsondata)

const TYPES = `[
    {
        "type": 1,
        "name": "TINYINT",
        "storage_amount" : 1
    },
    {
        "type": 1,
        "name": "SMALLINT",
        "storage_amount": 2
    },
    {
        "type": 1,
        "name": "MEDIUMINT",
        "storage_amount": 3
    }
]`

types = JSON.parse(TYPES)


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
var resultData = document.querySelector('.results')


newRow.addEventListener('click', (evento) => {
    evento.preventDefault()
    createRow(containerElemento, INPUTS)
})

function createRow(containerElemento, inputs) {

    let tbody  = document.createElement('tbody')
    containerElemento.appendChild(tbody)

    let row = document.createElement('tr')
    tbody.appendChild(row) 

    amountAttributes++

    for (let input of inputs) {
        let th = document.createElement('th')
        row.appendChild(th) 
        console.log(input)
        if (input.type === INPUT) {
            elemento = createInput(input.name, amountAttributes)
        } else if (input.type === SELECT) {
            elemento = createSelect(input.name, amountAttributes)
        } else {
            elemento = document.createTextNode(input)
        }

        th.appendChild(elemento)
    }
}


function createInput(name, id) {
    let input = document.createElement(INPUT)
    input.setAttribute('type', 'text')
    input.setAttribute('id', `${name}-${id}`)

    return input
}

function createSelect(name, id) {
    let select = document.createElement(SELECT)
    select.setAttribute('id', `${name}-${id}`)

    for (let item of types) {
        let option = document.createElement("option")
        option.value = item.name
        option.text = item.name

        select.appendChild(option)
    }
    
    return select
}

function render() {
    for (let i = 0; i < 3; i++) {
        createRow(containerElemento, INPUTS)
    }
}

render()

// ----------------------------------------------

const FIXED = 1
const VARIABLE = 2
const SUM = 3
const MULTIPLIE = 4

calculate.addEventListener('click', (evento) => {
    evento.preventDefault()
    size = getValueRows()
    size = 1302
    // size = 1048576

    createRow(resultData, ['tamnho por linha', convertByte(size, 0).for_humans])
    createRow(resultData, ['tamnho por 1Mi linha', convertByte(size*1000000).for_humans])
    createRow(resultData, ['qtd de linhas por gb', (Math.floor(GIGABYTE/size))])
})

//mudar calculateTable
function getValueRows() {
    //mudar armazena em uma variavel
    let values = []
    let value = 0
    countRows = document.getElementsByTagName('select').length

    for (let i = 1; i <= countRows; i++) {
        attributeLength = Number(document.getElementById(`length-${i}`).value)
        attributeType = document.getElementById(`type-${i}`).value

        calculo = calculateRow(attributeType, attributeLength)
        values.push(calculo)
        value += calculo
    }

    // console.log(value)
    // console.log(values)
    return value
}


function calculateRow(type, length) {
    let value = 0
    let item = types.find(data => data.name === type)

    switch (item.type) {
        case FIXED:
            value = item.storage_amount
            break
        case VARIABLE:
            value = olamundo(item.rules, length)
            break
        case SUM:
            value = item.storage_amount + length
            break
        case MULTIPLIE:
            value = item.storage_amount * length
            break
        default:
            alert('kdkdkdkkd')
    }

    return value
}

//mudar nome
function olamundo(rules, length) {
    for (let rule of rules){
        if (length >= rule.min && length <= rule.max) {
            return attributeLength + rule.more
        }
    }
}

// -------------------------------------------------


const MEGABYTE = 1048576
const GIGABYTE = 1073741824

function convertByte(size, number = 2) {
    let type = 'B'
    let result = size
    if (size >= MEGABYTE) {
        result = size / MEGABYTE
        type = 'MB'
    } 
    if (size >= GIGABYTE){
        result = size / GIGABYTE
        type = 'GB'
    }

    return {
        result: result,
        type: type,
        for_humans: (`${result.toFixed(number)} ${type}`)
    }
}