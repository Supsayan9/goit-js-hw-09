import Notiflix from 'notiflix';

const form = document.querySelector('.form');
const inputs = {
  delay: document.querySelector('[name="delay"]'),
  step: document.querySelector('[name="step"]'),
  amount: document.querySelector('[name="amount"]'),
};

form.addEventListener('submit', letStartIt);

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

function letStartIt(e) {
  e.preventDefault();
  const delay = Number(inputs.delay.value);
  const step = Number(inputs.step.value);
  const amount = Number(inputs.amount.value);

  if (!checkValues(delay, step, amount)) {
    return;
  }
  for (let i = 0; i < amount; i++) {
    createPromise(i + 1, step * i + delay)
      .then(({ position, delay }) => {
        // console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        // console.log(`❌ Rejected promise ${position} in ${delay}ms`);
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
}

function checkValues(delay, step, amount) {
  let check = true;
  if (delay < 0) {
    Notiflix.Notify.failure(`❌ ERROR!!! WRONG VALUE (${delay}) OF DELAY!!!`);
    check = false;
  }
  if (step < 0) {
    Notiflix.Notify.failure(`❌ ERROR!!! WRONG VALUE (${step}) OF STEP!!!`);
    check = false;
  }
  if (amount <= 0) {
    Notiflix.Notify.failure(`❌ ERROR!!! WRONG VALUE (${amount}) OF AMOUNT!!!`);
    check = false;
  }
  return check;
}
