import Notiflix from "notiflix";

function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
 
  const shouldResolve = Math.random() > 0.3;
 setTimeout(() => {
 
  if (shouldResolve) {
    // Fulfill
    resolve({position, delay});
  } else {
    // Reject
    reject({position, delay});
  }
}, delay);
});
return promise;
};

const form = document.querySelector('.form');

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const delay = parseInt(form.elements.delay.value);
  const step = parseInt(form.elements.step.value);
  const amount = parseInt(form.elements.amount.value);

  for (let i = 0; i < amount; i++) {
    createPromise(i, delay + i * step)
    .then(({ position, delay }) => {
      Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
  }
});




