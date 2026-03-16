// 1. 

// async function asyncDownloadFile() {
//   console.log('Downloading file...');
//   let status = await new Promise(resolve => {
//     setTimeout(resolve, 1500, 'Download complete!');
//   });
//   console.log(status);
// }

// asyncDownloadFile();

// 2.

// function processDataPromise(numbers, callback) {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       const processed = numbers.map(callback);
//       resolve(processed);
//     }, 1000);
//   });
// }

// async function processNTimes(numbers, callback, n) {
//   for (let i = 0; i < n; i += 1) {
//     numbers = await processDataPromise(numbers, callback);
//   }
//   console.log(numbers);
// }

// // Example usage:
// const squareIt = (n) => n * n;
// processNTimes([1, 2, 3], squareIt, 3);
// // After 3 seconds, logs: [1, 256, 6561]

// 3 & 4:

function doChore(choreMsg, ms) {
  return new Promise(resolve => {
    console.log(choreMsg);
    setTimeout(resolve, ms);
  });
}

async function getReady() {
  console.log('Good morning!');
  await doChore('Petting cat...', 5000);
  await doChore('Getting dressed...', 3000);
  await doChore('Brushing teeth...', 2000);
  console.log("I'm ready!");
}

async function makeCoffee() {
  await doChore('Making coffee...', 3500);
  console.log('Coffee is ready!')
}

makeCoffee();
getReady();

// Good morning!
// Petting cat...
// Getting dressed... (5 seconds later)
// Brushing teeth...  (3 seconds later)
// I'm ready!         (2 seconds later)