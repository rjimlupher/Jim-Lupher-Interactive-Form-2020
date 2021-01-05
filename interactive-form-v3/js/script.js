/*** Jim Lupher's third Treehouse TechDegree project: Interactive Form. This project will
entail the creation of an interactive form for users to input data and select personal options. 
***/

// Variables in order of when they come up in the script

const nameInput = document.querySelector('#name');
const jobRole = document.querySelector('#title');
const otherJobRoleInput = document.querySelector('#other-job-role');
const shirtDesigns = document.querySelector('#design');
const shirtColors = document.querySelector('#color');
const activitiesFieldset = document.querySelectorAll('#activities');
const activitiesCost = document.querySelector('#activities-cost');
const totalCost = 0;

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
            //shirtColors.children[i].setAttribute()
        } else {
            shirtColors.children[i].hidden = true;
            //shirtColors.children[i].setAttribute()
        }
    }
});

activitiesFieldset.addEventListener('change', e => {
    const dataCost = +e.target.getAttribute('data-cost');
    if (e.target.checked) {
        totalCost += dataCost
    } else {
        totalCost -= dataCost
    }
    activitiesCost.innerHTML = 'Total: $${totalCost}'
});

console.log(totalCost)
