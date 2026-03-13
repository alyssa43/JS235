// 1.

// function flakyService() {
//   return new Promise((resolve, reject) => {
//     if (Math.random() > 0.5) {
//       resolve("Operation successful");
//     } else {
//       reject("Operation failed");
//     }
//   });
// }

// function loadData() {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       if (Math.random() > 0.5) {
//         resolve("Data loaded");
//       } else {
//         reject("Network error");
//       }
//     }, 1000);
//   });
// }

// Promise.all(flakyService(), flakyService(), loadData())
//   .then(console.log)
//   .catch(() => console.log('One of more operations failed'));

// 2.

// const firstResource = new Promise((resolve) =>
//   setTimeout(() => resolve("First resource loaded"), 500)
// );
// const secondResource = new Promise((resolve) =>
//   setTimeout(() => resolve("Second resource loaded"), 1000)
// );

// Promise.race([firstResource, secondResource])
//   .then(console.log)

// 3.

// function flakyService() {
//   return new Promise((resolve, reject) => {
//     if (Math.random() > 0.5) {
//       resolve("Operation successful");
//     } else {
//       reject("Operation failed");
//     }
//   });
// }

// const services = [flakyService(), flakyService(), flakyService()];
// Promise.allSettled(services).then(results => {
//   results.forEach((result, i) => {
//     const value = result.value;
//     if (value) {
//       console.log(`Service ${i + 1} succeeded with value: ${value}`);
//     } else {
//       console.log(`Service ${i + 1} failed with error: ${result.reason}`);
//     }
//   });
// });

// 4. 

// function flakyService() {
//   return new Promise((resolve, reject) => {
//     if (Math.random() > 0.5) {
//       resolve("Operation successful");
//     } else {
//       reject("Operation failed");
//     }
//   });
// }

// const services = [flakyService(), flakyService(), flakyService()];

// Promise.any(services)
//   .then(result => console.log(`First succsesful service result: ${result}`))
//   .catch(error => console.log(`Error: ${error.message}`));

// 5.

function loadData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.5) {
        resolve("Data loaded");
      } else {
        reject("Network error");
      }
    }, 1000);
  });
}

function timeoutPromise(promise, ms) {
  const timeout = new Promise((_, reject) => {
    setTimeout(reject, ms, 'Operation timed out');
  });

  return Promise.race([promise, timeout]);
}

timeoutPromise(loadData(), 500)
  .then(console.log)
  .catch(console.error);
// Expected output: "Operation timed out" (because it exceeds 500ms)