// SET AFID 
document.querySelector('#AFID').value = document.referrer.split('AFID=')[1] || '465368'
// SET ZIP CODE 
document.querySelector('#PROP_ZIP').value = document.referrer.split('zipcode=')[1] || '55555'

// THE  FORM ELEMENT 
const form = document.querySelector('#lp_form')


// prevent default on enter key!!!!
// form.addEventListener('keydown', preventSubmit)
window.addEventListener('keydown', preventSubmit)
function preventSubmit(e) {
    e.preventDefault()
    e.stopPropagation()
}

// handle questions with button 
const button = document.querySelectorAll('.question')
button.forEach(btn => btn.addEventListener('click', handleClick))

function handleClick(e) {
    e.preventDefault()
    e.stopPropagation()
    // move progress bar
    moveProgress()

    const formElement = e.target.parentElement.parentElement
    const nextFormElement = formElement.nextElementSibling
    const field = formElement.dataset.field
    const formValue = e.target.dataset.value;
	// console.log({field}, {formValue})
    const input = document.querySelector(`[name=${field}]`)
	// console.log(input)

    // set the value to be submitted
    input.value = formValue
    // show next, hide current 
    formElement.style.display = 'none';
    nextFormElement.style.display = 'block'
}


// handle questions with their own field value
const setBtn = document.querySelectorAll('.next')
setBtn.forEach(btn => btn.addEventListener('click', setValue))
 function setValue(e) {
     e.preventDefault()
     e.stopPropagation()

// selectors 
     const formElement = e.target.parentElement.parentElement
     const nextFormElement = formElement.nextElementSibling
     if (formElement.dataset.field === 'propertyValue' || formElement.dataset.field === 'additionalCash' ) {
           formElement.style.display = 'none';
            nextFormElement.style.display = 'block'
            moveProgress()
     }
     if (formElement.dataset.field === 'state') {
        const state = document.querySelector('#PROP_ST')
         if (!state.value) {
            // state.insertAdjacentHTML('afterend', '<p>* Required</p>')
            state.classList.add('select-styled-required')
            state.classList.remove('select-styled')
             return
         } else {
            formElement.style.display = 'none';
            nextFormElement.style.display = 'block'
            moveProgress()
        }
     }
    if (formElement.dataset.field === 'address') {
        if (!form.address.value) {
         const addressInput = form.querySelector('#address')
             addressInput.placeholder = '* Address Required'
            addressInput.classList.add('required')
            addressInput.classList.remove('input-styled')
            return
        }   else if (!form.city.value) {
            const cityInput = form.querySelector('#city')
            cityInput.placeholder = '* Required'
            cityInput.classList.add('required')
            cityInput.classList.remove('input-styled')
            return
        } else {
            formElement.style.display = 'none';
            nextFormElement.style.display = 'block'
            moveProgress()
        }
    } 
    //  formElement.style.display = 'none';
    //  nextFormElement.style.display = 'block'
 }


// submit form
 const submitBtn = document.querySelector('.submit')
 submitBtn.addEventListener('click', sendSubmission)

 function sendSubmission(e) {
     e.preventDefault()
    e.stopPropagation()

    const formElement = e.target.parentElement.parentElement

     // email validation
function emailIsValid (email) {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}
// set value for "I  agree to terms and conditions"
const agreeInput = form.querySelector('#opt_in')
agreeInput.addEventListener('change', () => agreeInput.value = 1)


     if (formElement.dataset.field === 'contact') {
        if (!form.first_name.value) {
            const fNameInput = form.querySelector('#first_name')
             fNameInput.placeholder = '* First Name Required'
            fNameInput.classList.add('required')
            fNameInput.classList.remove('input-styled')
            return
        } else if (!form.last_name.value) {
            const lNameInput = form.querySelector('#last_name')
            lNameInput.placeholder = '* Last Name Required'
            lNameInput.classList.add('required')
            lNameInput.classList.remove('input-styled')
            return
        }  else if (!emailIsValid(form.email_address.value)) {
            const emailInput = form.querySelector('#email_address')
            emailInput.placeholder = '* Email Required'
            emailInput.classList.add('required')
            emailInput.classList.remove('input-styled')
            return
        }  else if (!form.phone_home.value ) {
            const phoneInput = form.querySelector('#phone_home')
            phoneInput.placeholder = '* (XXX) XXX-XXXX'
            phoneInput.classList.add('required')
            phoneInput.classList.remove('input-styled')
            return
        }   else if (!agreeInput.checked) {
            agreeInput.parentElement.classList.add('required-agree')
            agreeInput.classList.add('required-agree-terms')
            agreeInput.classList.remove('input-styled')
            return
        }   else {
            form.submit()
        } 
    }
 }



// handel sliders 
const sliders = document.querySelectorAll(`[type='range']`)
sliders.forEach(slider => slider.addEventListener('change', displaySliderValue))

function displaySliderValue(e) {
    const displayValue = document.querySelector(`#${e.target.id}Text`)
    displayValue.innerHTML = `<span>$${e.target.value}</span>`
}


//go back
const backBtn = document.querySelectorAll('.gold-btn')
backBtn.forEach(btn => btn.addEventListener('click', goBack))

function goBack(e) {
    e.preventDefault()

    const formElement = e.target.parentElement
   
    const prevElement = formElement.previousElementSibling;
    formElement.style.display = 'none'
    prevElement.style.display = 'block'
}


// move progress bar

let moved = 1 // progress bar memory
function moveProgress() {
        let theBar = document.querySelector('.the-bar')
        const amountToMove = document.querySelectorAll('.form-box')
        const distanceToMove = 100 / amountToMove.length 
        theBar.style.width = `${ moved += distanceToMove}%`
    } 

const progressIndicator = document.querySelectorAll('.progressIndicator')
// console.log([...progressIndicator]);

progressIndicator.forEach(indicator => indicator.style.transform = 'translateX(30px)')