import logMessage from './js/logger'
import './css/style.css'

let formElem = document.getElementById('formElem')

formElem.onsubmit = function(event) {
    event.preventDefault();
    var response = fetch('/upload', {
        method: 'POST',
        body: new FormData(formElem)    
    })
    .then(function(response) {
        console.log(response.status)
        let listFile = document.querySelectorAll('div')
        if (response.status == 200) {
            for (let elem of listFile) {
                elem.classList.toggle('notyet')
                elem.classList.add('success')
            }
        } else if (response.status == 400) {
            for (let elem of listFile) {
                elem.classList.toggle('notyet')
                elem.classList.add('fail')
            }
        }
    })
}
formElem.addEventListener('change', function (event) {
    let input = event.target;
    let length = input.files.length;
    for(let i = 0; i<length; i++){
        formElem.insertAdjacentHTML('beforeend', `<div class='notyet'><p'>${input.files[i].name}</p></div>`)
    }
})

// Log message to console
logMessage('Welcome to Expack!')