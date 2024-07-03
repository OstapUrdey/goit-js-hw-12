import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css"

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.form');
  
    form.addEventListener('submit', event => {
      event.preventDefault();
      
      const delayInput = form.querySelector('input[name="delay"]');
      const stateInput = form.querySelector('input[name="state"]:checked');
      const delay = Number(delayInput.value);
      const state = stateInput.value;
  
      createPromise(delay, state)
        .then(result => {
          iziToast.success({
            title: '✅ Success',
            message: `Fulfilled promise in ${result}ms`
          });
        })
        .catch(error => {
          iziToast.error({
            title: '❌ Error',
            message: `Rejected promise in ${error}ms`
          });
        });
    });
  
    function createPromise(delay, state) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (state === 'fulfilled') {
            resolve(delay);
          } else {
            reject(delay);
          }
        }, delay);
      });
    }
  });
  