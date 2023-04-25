let idGen = 5;
let catCount = 0;

const btnUl = document.getElementById("btn-ul");
const inputDataUl = document.getElementById("input-ul");
const inputDescUl = document.getElementById("desc-ul");
const listaU = document.getElementById("listaU");
const btnLoadU = document.getElementById("loadU");
const btnSwitch = document.getElementById("switch");
const btnCat = document.getElementById("btn-cat")

// Loads data from server when DOM is loaded
window.addEventListener("DOMContentLoaded", () => {
    getTasks()
    .then((tasks) => {
        tasks.forEach(task => {
            addData(listaU, task)
        });
    })
    .catch((err) => {
        console.error(err);
    });
})

btnCat.addEventListener('click', () => {
    addCatsk(listaU)
})

// When clicking the load data button, loads the tasks from the server
btnLoadU.addEventListener('click', async () => {
    window.location.href = 'https://www.youtube.com/watch?v=jIQ6UV2onyI';
})

btnSwitch.addEventListener("change", function() {
    let listItems = Array.from(document.getElementsByClassName("card"));
    listItems.forEach((item) => {
        getTaskById(item.id)
            .then((task) => {
                if (btnSwitch.checked) {
                    item.style.display = task.done ? "block" : "none";
                } else {
                    item.style.display = "block";
                }
            })
            .catch((err) => console.err(err))
    });
});

btnUl.addEventListener('click', () => {
    if(inputDataUl && listaU && inputDataUl.value && inputDescUl.value) {
        idGen++;
        const task = {
            "id": idGen,
            "title": inputDataUl.value,
            "description": inputDescUl.value,
            "done": false
        }
        createTask(task)
            .then(() => {
                addData(listaU, task)
            })
            .catch(err => console.error(err))
    }
})

listaU.addEventListener('dblclick', removeDataUl)

listaU.addEventListener('click', taskToggle)

function taskToggle() {
    const clickedElement = event.target
    if (clickedElement.parentNode.classList.contains("card")) {
        let itemId = clickedElement.parentNode.id;
        const listElement = clickedElement.parentNode.parentNode
        const child = listElement.childNodes[1].childNodes[3]
        const cardBg = listElement.childNodes[1]
        child.style.background = child.style.background === 'goldenrod' ? 'steelblue' : 'goldenrod';
        cardBg.style.background = cardBg.style.background === 'goldenrod' ? 'steelblue' : 'goldenrod';
    }
}

function removeDataUl(event) {
    const clickedElement = event.target
    if (clickedElement.parentNode.classList.contains("card")) {
        let itemId = clickedElement.parentNode.id;
        const listElement = clickedElement.parentNode.parentNode
        listElement.remove();
        deleteTask(itemId)
            .catch(err => console.error(err))
    }
}

async function addData(listRef, value) {
    let newValue = document.createElement('li')
    if (value.title === 'cat') {
        addCatsk(listRef)            
    } else {
        newValue.innerHTML = `
        <div id="${value.id}" class="card">
        <div id="card-title" class="card-title">${value.title}</div>
        <div id="card-desc" class="card-desc">${value.description}</div>
        </div>
        `
    }
    listRef.appendChild(newValue) 
}

async function addCatsk(listRef) {
    let newValue = document.createElement('li')
    catCount++;
    getCats()
        .then((res) => {
            const fact = res.fact;
            newValue.innerHTML = `
            <div id="${idGen++}" class="card">
                <div id="card-title" class="card-title">Random Cat Fact ${catCount}</div>
                <div id="card-desc" class="card-desc">${fact}</div>
            </div>
            `
            listRef.appendChild(newValue) 
        })          
}

async function getTasks() {
    const response = await fetch("https://my-json-server.typicode.com/SirFreddie/db-json/tasks");
    const jsonData = await response.json();
    return jsonData;
}

async function getTaskById(id) {
    const response = await fetch(`https://my-json-server.typicode.com/SirFreddie/db-json/tasks/${id}`);
    const jsonData = await response.json();
    return jsonData;
}

async function getCats() {
    const response = await fetch("https://catfact.ninja/fact");
    const jsonData = await response.json();
    return jsonData;
}

async function createTask(value) {
    const task = {
        "id": 10,
        "title": value,
        "description": "una descripcion nueva",
        "done": false
    }
    const settings = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
    }

    fetch("https://my-json-server.typicode.com/SirFreddie/db-json/tasks", settings);
}

async function deleteTask(id) {
    const settings = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    }

    fetch(`https://my-json-server.typicode.com/SirFreddie/db-json/tasks/${id}`, settings);
}


