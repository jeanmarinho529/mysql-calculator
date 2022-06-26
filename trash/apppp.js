
const calculate = document.querySelector('#calculate')
const newColumn = document.querySelector('#newColumn')

var containerElemento = document.querySelector('.columns')

var attributes = JSON.parse(localStorage.getItem('attributes')) || []

function getNewId() {
    let lastId = 0
    let lastCity = attributes[attributes.length - 1]

    if (lastCity) {
        lastId = lastCity['id']
    }

    return lastId + 1
}

newColumn.addEventListener('click', (evento) => {
    evento.preventDefault()
    
    // saveItensLocalStorage(getValuesRowColumns())


    // var containerElemento = document.querySelector('.columns')
    // createColumns()
    createRow()
})

const inputs = [
    {
        type: 'input',
        name: 'name'
    },
    {
        type: 'input',
        name: 'size'
    }
]

function createRow() {

    let tbody  = document.createElement('tbody'); 
    containerElemento.appendChild(tbody);

    let row = document.createElement('tr'); 
    tbody.appendChild(row) 

    for (let input of inputs) {
        let th = document.createElement('th'); 
        row.appendChild(th) 
    
        let input = document.createElement('input');
        input.setAttribute('type', 'text');
    
        th.appendChild(input);
    }

    // document.createElement('input');

    // // elemento.setAttribute('name', 'nome_' + contador);
    // elemento.setAttribute('id', 'nome_' + getNewId());
    // elemento.setAttribute('autocomplete', 'off');
}


// function createRows() {

//     for (let input of inputs) {

//     }
// }