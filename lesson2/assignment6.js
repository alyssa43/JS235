// 1.

// function flakyService() {
//   const rand = Math.random();

//   return new Promise((resolve, reject) => {
//     if (rand > 0.5) {
//       resolve('Operation successful');
//     } else {
//       reject('Operation failed');
//     }
//   })
// }

// flakyService()
//   .then(console.log)
//   .catch(console.error);

// 2.

// function operation() {
//   return new Promise(resolve => {
//     console.log('Operation started');
//     setTimeout(() => {
//       resolve('Operation complete');
//     }, 1000);
//   })
// }

// operation()
//   .then(console.log)
//   .finally(() => console.log('Cleaning up resources'));

// 3.

// new Promise(resolve => {
//   resolve(1);
// })
//   .then(num => {
//     return new Promise(resolve => {
//       resolve(num * 2);
//     })
//   })
//   .then(num => {
//     return new Promise(resolve => {
//       resolve(num + 5);
//     })
//   })
//   .then(console.log);

// // OR
// Promise.resolve(1)
//   .then(num => num * 2)
//   .then(num => num + 5)
//   .then(console.log)

// 4.

// function fetchUserData() {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => reject({ error: "User not found" }), 500);
//   });
// }

// fetchUserData()
//   .catch(errorObj => console.error(errorObj.error))
//   .finally(() => console.log('Fetching complete'));

// 5.

// function retryOperation(operationFunc, attempts = 0) {
//   attempts += 1;

//   if (attempts <= 3) {
//     operationFunc()
//       .then(result => {
//         console.log(result);
//         return result;
//       })
//       .catch(error => {
//         console.log(`Error: ${error.message}`);
//         console.log(`Attempt #${attempts}`);
//         return retryOperation(operationFunc, attempts);
//       });
//   } else {
//     console.log('Operation failed');
//   }
// }

// // Example usage:
// retryOperation(
//   () =>
//     new Promise((resolve, reject) =>
//       Math.random() > 0.33
//         ? resolve("Success!")
//         : reject(new Error("Fail!"))
//     )
// );

// 6.

// function mockAsyncOp() {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       if (Math.random() > 0.5) {
//         resolve("Operation succeeded");
//       } else {
//         reject("Operation failed");
//       }
//     }, 1000);
//   });
// }

// mockAsyncOp()
//   .then(console.log)
//   .catch(console.error)
//   .finally(() => console.log('Operation attempted'));

// 7.

function fetchData() {
  const rand = Math.random();
  return rand >= 0.5;
}

function loadData() {
  const data = fetchData();

  return new Promise((resolve, reject) => {
    if (data) {
      resolve('Data loaded');
    } else {
      reject('Network Error');
    }
  })
}

loadData()
.catch(error => {
  console.error(error);
  return Promise.resolve('Using cached data');
})
.then(console.log);

