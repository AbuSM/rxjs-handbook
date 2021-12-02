import { of, from, fromEvent, Observable } from "rxjs";

// --------- fromEvent ----------
const triggerButton = document.querySelector('button#trigger');

// const subscription = fromEvent<MouseEvent>(triggerButton, 'click').subscribe(
//   event => console.log(event.type, event.x, event.y)
// );


const triggerClick$ = new Observable<MouseEvent>(subscriber => {
  const clickHandlerFn = event => {
    console.log('Event callback executed');
    subscriber.next(event);
  };

  triggerButton.addEventListener('click', clickHandlerFn);

  return () => {
    triggerButton.removeEventListener('click', clickHandlerFn);
  };
});

const subscription = triggerClick$.subscribe(
  event => console.log(event.type, event.x, event.y)
);

setTimeout(() => {
  console.log('Unsubscribe');
  subscription.unsubscribe();
}, 5000);
  
  const somePromise = new Promise((resolve, reject) => {
  // resolve('Resolved!');
  reject('Rejected!');
});

// --------- from -----------
const observableFromPromise$ = from(somePromise);

observableFromPromise$.subscribe({
  next: value => console.log(value),
  error: err => console.log('Error:', err),
  complete: () => console.log('Completed')
});

// --------- of ----------
  ourOwnOf('Alice', 'Ben', 'Charlie').subscribe({
  next: value => console.log(value),
  complete: () => console.log('Completed')
});

// const names$ = new Observable<string>(subscriber => {
//   subscriber.next('Alice');
//   subscriber.next('Ben');
//   subscriber.next('Charlie');
//   subscriber.complete();
// });

// names$.subscribe({
//   next: value => console.log(value),
//   complete: () => console.log('Completed')
// });

function ourOwnOf(...args: string[]): Observable<string> {
  return new Observable<string>(subscriber => {
    for(let i = 0; i < args.length; i++) {
      subscriber.next(args[i]);
    }
    subscriber.complete();
  });
}


  
