// main.js


const update = document.querySelector('#update-button');

update.addEventListener('click', _ => {
    fetch('/quotes', {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: 'Darth Vader',
            age: '70'
        })
    })
        .then(res => {
            if(res.ok) return res.json()
        })
        .then(response => {
            window.location.reload(true)
            console.log(response)
        })
})
const deleteButton = document.querySelector('#delete-button')
const messageDiv = document.querySelector('#message')

deleteButton.addEventListener('click', _ => {
    fetch('quotes', {
        method: 'delete',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            name: 'Darth Vader'
        })
    })
        .then(res => {
            if (res.ok) return res.json()
        })
        .then(response =>{
            if (response === 'No DV quote to delete.'){
                messageDiv.textContent = 'No DV quote to delete.'
            }
            else {
                window.location.reload(true)
            }
        })
        .catch(error => console.error(error))
})
