const dataTypes = [
    {
        type: 1,
        name: "TINYINT",
        storage_amount : 1
    },
    {
        type: 1,
        name: "SMALLINT",
        storage_amount: 2
    },
    {
        type: 1,
        name: "MEDIUMINT",
        storage_amount: 3
    },
    {
        type: 1,
        name: "INT",
        storage_amount: 4
    },
    {
        type: 1,
        name: "BIGINT",
        storage_amount: 8
    },
    {
        type: 2,
        name: 'FLOAT',
        rules: [
            {
                min: 0,
                max: 24,
                storage_amount: 4,
                more: 0
            },
            {
                min: 25,
                max: 53,
                storage_amount: 8,
                more: 0
            }

        ]
    },
    {
        type: 1,
        name: 'DOUBLE',
        storage_amount: 8
    },
    {
        type: 1,
        name: "YEAR",
        storage_amount: 1
    },
    {
        type: 1,
        name: "DATE",
        storage_amount: 3
    },
    {
        type: 1,//5-
        name: "TIME",
        storage_amount: 3
    },
    {
        type: 1,//5-
        name: "DATETIME",
        storage_amount: 5
    },
    {
        type: 1, //5-
        name: "TIMESTAMP",
        storage_amount: 4
    },
    {
        type: 4,
        name: 'CHAR',
        storage_amount: 1
    },
    {
        type: 4,
        name: 'BINARY',
        storage_amount: 1
    },
    {
        type: 3,
        name: 'TINYBLOB',
        storage_amount: 1
    },
    {
        type: 3,
        name: 'TINYTEXT',
        storage_amount: 1
    },
    {
        type: 3,
        name: 'BLOB',
        storage_amount: 2
    },
    {
        type: 3,
        name: 'TEXT',
        storage_amount: 2
    },
    {
        type: 3,
        name: 'MEDIUMBLOB',
        storage_amount: 3
    },
    {
        type: 3,
        name: 'MEDIUMTEXT',
        storage_amount: 3
    },
    {
        type: 3,
        name: 'LONGBLOB',
        storage_amount: 4
    },
    {
        type: 3,
        name: 'LONGTEXT',
        storage_amount: 4
    },
    {
        type: 2,
        name: 'VARCHAR',
        rules: [
            {
                min: 0,
                max: 255,
                storage_amount: 1,
                more: 1
            },
            {
                min: 256,
                max: 0,
                storage_amount: 1,
                more: 2
            }
        ]
    },
    {
        type: 2,
        name: 'VARBINARY',
        rules: [
            {
                min: 0,
                max: 255,
                storage_amount: 1,
                more: 1
            },
            {
                min: 256,
                max: 0,
                storage_amount: 1,
                more: 2
            }

        ]
    },
]

function findByDataType(type, attributeLength) {
    let obj = dataTypes.find(data => data.name === type);

    attributeLength = Number(attributeLength)

    if (obj.type === fixed){
        return obj.storage_amount
    }
    if (obj.type === variable){
        return olamundo(obj, attributeLength)
    }

    if (obj.type === sumSize){
        return obj.storage_amount + attributeLength
    }

    if (obj.type === multiplie){
        return obj.storage_amount * attributeLength
    }

}

function olamundo(obj, attributeLength) {
    rules = obj.rules

    for (let rule of rules){
        if (attributeLength >= rule.min && attributeLength <= rule.max) {
            return attributeLength + rule.more
        }
    }
}

const fixed = 1
const variable = 2
const sumSize = 3
const multiplie = 4




var amountAttributes = 0

const calculate = document.querySelector('#calculate')
const newColumn = document.querySelector('#newColumn')
var containerElemento = document.querySelector('.columns')


var attributes = JSON.parse(localStorage.getItem('attributes')) || []

newColumn.addEventListener('click', (evento) => {
    evento.preventDefault()
    
    saveItensLocalStorage(getValuesRowColumns())


    // var containerElemento = document.querySelector('.columns')
    createColumns()
    createColumnss()
})

calculate.addEventListener('click', (evento) => {
    evento.preventDefault()
    getRowColumns()
})


function getRowColumns() {
    let values = []
    // inputs = document.getElementsByTagName('input')
    countRows = document.getElementsByTagName('select').length
    for (let i = 1; i <= countRows; i++) {
        type = document.getElementById(`type-${i}`).value
        attributeLength = document.getElementById(`length-${i}`).value
        values.push(findByDataType(type, attributeLength))
    }

    sum = values.reduce((partialSum, a) => partialSum + a, 0)
    console.log(values)
    console.log(sum)
}

function getValuesRowColumns() {
    countRows = document.getElementsByTagName('select').length
    attributess = []
    // for (let i = 1; i <= countRows; i++) {
    for (let attribut of attributes) {
        let attributeType = document.getElementById(`type-${attribut.id}`).value
        let attributeLength = document.getElementById(`length-${attribut.id}`).value
        let attributeName = document.getElementById(`name-${attribut.id}`).value

        let attribute = {
            id: getNewId(),
            type: attributeType,
            length: attributeLength,
            name: attributeName
        }

        attributess.push(attribute)
        // saveItensLocalStorage(attributes)
    }

    return attributess
}

function getNewId() {
    let lastId = 0
    let lastCity = attributes[attributes.length - 1]

    if (lastCity) {
        lastId = attributes['id']
    }

    return lastId + 1
}

function saveItensLocalStorage(itens) {
    // attributes.push(itens)
    attributes = itens
    localStorage.setItem('attributes', JSON.stringify(attributes))
}

function createColumnss() {
    amountAttributes++
    let options = createOptionType()
    for (let attribute of attributes) {
        document.getElementById(`name-${attribute.id}`).outerHTML = ""
        document.getElementById(`length-${attribute.id}`).outerHTML = ""
        document.getElementById(`type-${attribute.id}`).outerHTML = ""
        containerElemento.innerHTML += `
            <tr>
                <td>
                    <select id="type-${attribute.id}">
                        ${options}
                    </select>
                </td>
                <td><input class="name" type="text" id="name-${attribute.id}" value="${attribute.name}" required></td>
                <td><input class="length" type="text" id="length-${attribute.id}" value="${attribute.length}" required></td>
            </tr>
        `
    }

}


function getNewId() {
    let lastId = 0
    let lastCity = attributes[attributes.length - 1]

    if (lastCity) {
        lastId = lastCity['id']
    }

    return lastId + 1
}




function createColumns() {
    amountAttributes++
    let options = createOptionType()
    containerElemento.innerHTML += `
        <tr>
            <td>
                <select id="type-${amountAttributes}">
                    ${options}
                </select>
            </td>
            <td><input class="name" type="text" id="name-${amountAttributes}" required></td>
            <td><input class="length" type="text" id="length-${amountAttributes}" required></td>
        </tr>
    `
}


function createOptionType(){
    let options = '';
    for (let type of dataTypes) {
        options +=`<option value="${type.name}">${type.name}</option>`
    }

    return options;
}

function renderColumns()
{
    for (let i = 0; i < 3; i++) {
        createColumns()
    }
}
renderColumns()



