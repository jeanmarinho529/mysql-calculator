const myInit = {
    method: 'GET',
    mode: 'cors',
}

fetch("./types.json", myInit)
.then(response => {
    return response.json()
})
.then(jsondata => types = jsondata)

let containerElemento = document.querySelector('.box')

let pre = document.createElement('pre')
containerElemento.appendChild(pre)

let code = document.createElement('code')
pre.appendChild(code)

elemento = document.createTextNode(TYPES);
code.appendChild(elemento)
