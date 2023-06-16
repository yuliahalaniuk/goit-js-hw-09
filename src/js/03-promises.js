import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');
const submitBtn = document.querySelector("button[type='submit']");

const delayInput = form.elements.delay;
const stepInput = form.elements.step;
const amountInput = form.elements.amount;

submitBtn.addEventListener('click', onSubmit);

function onSubmit(e) {
  e.preventDefault();

  const amount = parseInt(amountInput.value);
  const delay = parseInt(delayInput.value);
  const step = parseInt(stepInput.value);

  let time = delay;

  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, time)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    time += step;
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
