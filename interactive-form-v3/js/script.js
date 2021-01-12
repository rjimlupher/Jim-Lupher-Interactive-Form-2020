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
const paypal = document.querySelector('#paypal');
const bitcoin = document.querySelector('#bitcoin');
const email = document.querySelector('#email');
const cardNumber = document.querySelector('#cc-num');
const zip = document.querySelector('#zip');
const cvv = document.querySelector('#cvv');
const form = document.querySelector('form');

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

form.addEventListener('submit', (e) => {
    const nameValue = nameInput.value;
    const nameRegex = /^[A-Za-z]+ ?[A-Za-z]*? ?[A-Za-z]*?$/.test(nameValue);
    if (!nameRegex) {
        e.preventDefault();
    }
    const emailValue = email.value;
    const emailRegex = /^(\w+\.?-?\D?\w+\.?-?\D?|\D+)@(\w+\.?-?\D?\w+\.?-?\D?)\.([a-z]+)$/.test(emailValue);
    if (!emailRegex) {
        e.preventDefault();
    }
    if (payment.value === 'CREDIT') {
        const creditValue = credit.value;
        const creditRegex = /^([0-9]){4}\s?([0-9]){4}\s?([0-9]){4}\s?([0-9]){4}$/.test(creditValue);
        if (!creditRegex) {
            e.preventDefault();
        }
        const zipValue = zip.value;
        const zipRegex = /^(([0-9]){5})-?(([0-9]){4})?$/.text(zipValue);
        if (!zipRegex) {
            e.preventDefault();
        }
        const cvvValue = cvv.value;
        const cvvRegex = /^([0-9]){3}$/.test(cvvValue);
        if (!cvvRegex) {
            e.preventDefault();
        }
    }

});

