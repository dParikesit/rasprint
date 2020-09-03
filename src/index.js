import logMessage from './js/logger'
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/style.css'
import rasprint from './img/rasprint.png';

let image = document.getElementById('image')
image.src = rasprint

let formElem = document.getElementById('formElem')
formElem.onsubmit = function(event) {
    event.preventDefault();
    var response = fetch('/upload', {
        method: 'POST',
        body: new FormData(formElem)    
    })
    .then(function(response) {
        console.log(response.status)
        let listFile = document.querySelectorAll('.notYet')
        if (response.status == 200) {
            for (let elem of listFile) {
                elem.classList.remove('list-group-item-dark')
                elem.classList.add('list-group-item-success')
                elem.classList.remove('notYet')
            }
        } else if (response.status != 400) {
            for (let elem of listFile) {
                elem.classList.remove('list-group-item-dark')
                elem.classList.add('list-group-item-danger')
                elem.classList.remove('notYet')
            }
        }
        formElem.reset()
    })
}

var file = []
formElem.addEventListener('change', function (event) {
    let input = event.target;
    let length = input.files.length;
    let ulist = document.getElementById('ulist')
    for(let i = 0; i<length; i++){
        file[i] = document.createElement('li')
        file[i].innerHTML = input.files[i].name
        file[i].classList.add('notYet')
        file[i].classList.add('list-group-item')
        file[i].classList.add('list-group-item-dark')
        ulist.prepend(file[i])
    }
})

// Log message to console
logMessage('Welcome to Expack!')