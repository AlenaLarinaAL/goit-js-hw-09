import { Notify } from "notiflix";

const formEl = document.querySelector('.form');
formEl.addEventListener('submit', onFormSubmit);
formEl.addEventListener('input', onFormElInput);

let delay = 0;
let step = 0;
let amount = 0;


function onFormSubmit(event) {
  event.preventDefault();

  for (let i = 1; i <= amount; i += 1) {
    let delayStep = delay + (i - 1) * step;
    createPromise(i, delayStep)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
        Notify.info(`✅ Fulfilled promise ${position} in ${delay}ms`);
        
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay)
  })

}

function onFormElInput(event) {
  if (event.target.name === 'delay') {
    delay = Number(event.target.value);
  }
  if (event.target.name === 'step') {
    step = Number(event.target.value);
  }
  if (event.target.name === 'amount') {
    amount = Number(event.target.value);
  }
}






