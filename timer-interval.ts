import { Observable, timer } from "rxjs";

console.log('App started');

const timer$ = new Observable<number>(subscriber => {
  const timeoutId = setTimeout(() => {
    console.log('Timeout!');
    subscriber.next(0);
    subscriber.complete();
  }, 2000);

  return () => clearTimeout(timeoutId);
});

const subscription = timer$.subscribe({
  next: value => console.log(value),
  complete: () => console.log('Completed')
});

setTimeout(() => {
  subscription.unsubscribe();
  console.log('Unsubscribe');
}, 1000);


const interval$ = new Observable<number>(subscriber => {
  let counter = 0;
  
  const intervalId = setInterval(() => {
    console.log('Timeout!');
    subscriber.next(counter++);
  }, 1000);

  return () => clearInterval(intervalId);
});

const subscription = interval$.subscribe({
  next: value => console.log(value),
  complete: () => console.log('Completed')
});

setTimeout(() => {
  subscription.unsubscribe();
  console.log('Unsubscribe');
}, 5000);
