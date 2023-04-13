const btnUl = document.getElementById("btn-ul")
const inputDataUl = document.getElementById("input-ul")
const listaU = document.getElementById("listaU")

const btnOl = document.getElementById("btn-ol")
const inputDataOl = document.getElementById("input-ol")
const listaO = document.getElementById("listaO")


btnUl.addEventListener('click', () => {
    if(inputDataUl && listaU) {
        addData(listaU, inputDataUl.value)
    }
})

btnOl.addEventListener('click', () => {
    if(inputDataOl && listaO) {
        addData(listaO, inputDataOl.value)
    }
})

listaU.addEventListener('click', removeDataUl)
listaO.addEventListener('click', removeDataOl)

function removeDataUl(event) {
    if (event.target.tagName === 'LI') {
        listaU.removeChild(event.target)
    }
}

function removeDataOl(event) {
    if (event.target.tagName === 'LI') {
        listaO.removeChild(event.target)
    }
}

function addData(listRef, value) {
    let newValue = document.createElement('li')
    newValue.innerHTML = value
    listRef.appendChild(newValue) 
}