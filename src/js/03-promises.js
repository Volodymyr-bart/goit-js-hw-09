import Notiflix from 'notiflix';
const refs = {
  form: document.querySelector('.form'),
};

refs.form.addEventListener('submit', onClickBtnSubmit);

function onClickBtnSubmit(e) {
  e.preventDefault();
  let delay = Number(e.target[0].value);
  const step = Number(e.target[1].value);
  const amount = Number(e.target[2].value);
  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
    delay += step;
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
