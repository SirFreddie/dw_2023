let idGen = 5;

const btnUl = document.getElementById("btn-ul");
const inputDataUl = document.getElementById("input-ul");
const listaU = document.getElementById("listaU");
const btnLoadU = document.getElementById("loadU");
const btnSwitch = document.getElementById("switch");

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

// When clicking the load data button, loads the tasks from the server
btnLoadU.addEventListener('click', async () => {
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
    if(inputDataUl && listaU && inputDataUl.value) {
        const task = {
            "id": idGen++,
            "title": inputDataUl.value,
            "description": "Random description of new post.",
            "done": false
        }
        addData(listaU, task)
    }
})

listaU.addEventListener('click', removeDataUl)

function removeDataUl(event) {
    const clickedElement = event.target
    if (clickedElement.parentNode.classList.contains("card")) {
        let itemId = clickedElement.parentNode.id;
        const listElement = clickedElement.parentNode.parentNode
        listElement.remove();
        deleteTask(itemId);
    }
}

async function addData(listRef, value) {
    let newValue = document.createElement('li')
    newValue.innerHTML = `
    <div id="${value.id}" class="card">
        <div id="card-title" class="card-title">${value.title}</div>
        <div id="card-desc" class="card-desc">${value.description}</div>
    </div>
    `
    listRef.appendChild(newValue) 
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
}