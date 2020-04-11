console.log('Client side javascript is loaded')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

let messageOne = document.querySelector('#message-1')
let messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (e) =>{
    e.preventDefault()
    const address = search.value
    messageOne.textContent ='Loading.....'
    messageTwo.textContent = ''
    fetch('/weather/?address='+address).then((response) => {
        response.json().then((data) =>{
          if(data.error){
            messageOne.textContent = 'Please provide a valid city address!'
          }
          else{
              messageOne.textContent = "Temperature: " + data.temperature
              messageTwo.textContent = "Location: " + data.location
          }
        })
        })
        

})