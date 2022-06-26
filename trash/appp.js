var amountAttributes = 0

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



