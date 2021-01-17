/*** Jim Lupher's third Treehouse TechDegree project: Interactive Form. This project will
entail the creation of an interactive form for users to input data and select personal options. 
***/

// Variables in order of when they come up in the script

const nameInput = document.querySelector('#name');
const jobRole = document.querySelector('#title');
const otherJobRoleInput = document.querySelector('#other-job-role');
const shirtDesigns = document.querySelector('#design');
const shirtColors = document.querySelector('#color');
const activitiesFieldset = document.querySelector('#activities');
const activitiesCost = document.querySelector('#activities-cost');
let totalCost = 0;
const payment = document.querySelector('#payment');
const credit = document.querySelector('#credit-card');
const ccNum = document.querySelector('#cc-num')
const paypal = document.querySelector('#paypal');
const bitcoin = document.querySelector('#bitcoin');
const email = document.querySelector('#email');
const cardNumber = document.querySelector('#cc-num');
const zip = document.querySelector('#zip');
const cvv = document.querySelector('#cvv');
const form = document.querySelector('form');
const checkboxes = document.querySelectorAll('#activities input');

// The function below puts the focus on any html element passed into it. 

function getFocused(htmlElement) {
    htmlElement.focus()
}
getFocused(nameInput)

/* The event listener below hides or shows the 'other' field based 
on what a user selects in the job role drop-down menu. */

otherJobRoleInput.style.display = 'none';
jobRole.addEventListener('change', e => {
    if (e.target.value !== 'other') {
        otherJobRoleInput.style.display = 'none';
    } else {
        otherJobRoleInput.style.display = 'block';
        otherJobRoleInput.focus();
    };
});

/*
This event listener resolves the issue of the shirt designs not matching their 
respective colors.
*/

shirtColors.disabled = true;
shirtDesigns.addEventListener('change', e => {
    shirtColors.disabled = false;
    for (i = 0; i < shirtColors.children.length; i++) {
        const changeDesigns = e.target.value;
        const dataTheme = shirtColors.children[i].getAttribute('data-theme');
        if (changeDesigns === dataTheme) {
            shirtColors.children[i].hidden = false;
            shirtColors.children[i].selected = true;
        } else {
            shirtColors.children[i].hidden = true;
            shirtColors.children[i].selected = false;
        }
    }
});

activitiesFieldset.addEventListener('change', e => {
    const dataCost = +e.target.getAttribute('data-cost');
    if (e.target.checked) {
        totalCost += dataCost;
    } else {
        totalCost -= dataCost;
    }
    activitiesCost.innerHTML = `Total: $${totalCost}`;
});

paypal.hidden = true;
bitcoin.hidden = true;
payment.children[1].setAttribute('selected', 'true');
payment.addEventListener('change', (e) => {
    const changePayment = e.target.value;
    if (changePayment === 'paypal') {
        credit.hidden = true;
        paypal.hidden = false;
        bitcoin.hidden = true;  
    } else if (changePayment === 'bitcoin') {
        credit.hidden = true;
        paypal.hidden = true;
        bitcoin.hidden = false;
    } else {
        credit.hidden = false;
        paypal.hidden = true;
        bitcoin.hidden = true;
    }
});

const nameValidator = () => {
	const nameValue = nameInput.value;
	const nameRegex = /^[a-zA-Z]+ ?[a-zA-Z]*? ?[a-zA-Z]*?$/.test(nameValue);
	return nameRegex
}

const emailValidator = () => {
	const emailValue = email.value;
	const emailRegex = /^(\w+\.?-?\D?\w+\.?-?\D?|\D+)@(\w+\.?-?\D?\w+\.?-?\D?)\.([a-z]+)$/.test(emailValue);
	return emailRegex
}

const creditValidator = () => {
    const creditValue = cardNumber.value;
    const creditRegex = /^([0-9]){4}\s?([0-9]){4}\s?([0-9]){4}\s?([0-9]){4}|([0-9]){13}\s?$/.test(creditValue);
    return creditRegex

}

const zipValidator = () => {
    const zipValue = zip.value;
    const zipRegex = /^(([0-9]){5})-?(([0-9]){4})?$/.test(zipValue);
    return zipRegex;
}

const cvvValidator = () => {
    const cvvValue = cvv.value;
    const cvvRegex = /^([0-9]){3}$/.test(cvvValue);
    return cvvRegex;
}

form.addEventListener('submit', (e) => {
    if (!nameValidator()) {
        e.preventDefault();
        nameInput.parentNode.classList.add('not-valid');
        nameInput.parentNode.classList.remove('valid');
        nameInput.parentNode.lastElementChild.style.display = 'block';
    } else {
        nameInput.parentNode.classList.add('valid');
        nameInput.parentNode.classList.remove('not-valid');
        nameInput.parentNode.lastElementChild.style.display = 'none';
    }
    if (!emailValidator()) {
        e.preventDefault();
        email.parentNode.classList.add('not-valid');
        email.parentNode.classList.remove('valid');
        email.parentNode.lastElementChild.style.display = 'block';

    } else {
        email.parentNode.classList.add('valid');
        email.parentNode.classList.remove('not-valid');
        email.parentNode.lastElementChild.style.display = 'block';

    }
    if (payment.value === 'credit-card') {
        if (!creditValidator()) {
            e.preventDefault();
            ccNum.parentNode.classList.add('not-valid');
            ccNum.parentNode.classList.remove('valid');
            ccNum.parentNode.lastElementChild.style.display = 'block';
        } else {
            ccNum.parentNode.classList.add('valid');
            ccNum.parentNode.classList.remove('not-valid');
            ccNum.parentNode.lastElementChild.style.display = 'none';
        }
        if (!zipValidator()) {
            e.preventDefault();
            zip.parentNode.classList.add('not-valid');
            zip.parentNode.classList.remove('valid');
            zip.parentNode.lastElementChild.style.display = 'block';
        } else {
            zip.parentNode.classList.add('valid');
            zip.parentNode.classList.remove('not-valid');
            zip.parentNode.lastElementChild.style.display = 'none';
        }
        if (!cvvValidator()) {
            e.preventDefault();
            cvv.parentNode.classList.add('not-valid');
            cvv.parentNode.classList.remove('valid');
            cvv.parentNode.lastElementChild.style.display = 'block';
        } else {
            cvv.parentNode.classList.add('valid');
            cvv.parentNode.classList.remove('not-valid');
            cvv.parentNode.lastElementChild.style.display = 'none';
        }
    }   
    console.log(payment.value)
});

/* This for loop loops over the activities checkboxes and applies a class
with formatting to any checked checkboxes*/
for (let i = 0; i < checkboxes.length; i++) {
    const checkboxesLabel = checkboxes[i].parentNode;
    checkboxes[i].addEventListener('focus', (e) => {
        const activitiesFocus = e.target;
        if (checkboxes[i] === activitiesFocus) {
            checkboxesLabel.classList.add('focus')
        }
    });

    checkboxes[i].addEventListener('blur', (e) => {
        const activitiesBlur = e.target;
        if (checkboxes[i] === activitiesBlur) {
            checkboxesLabel.classList.remove('focus')
        }
    });
}



