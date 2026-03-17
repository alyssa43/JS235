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

// async function handleFlakyService() {
//   try {
//     const status = await flakyService();
//     console.log(status);
//   } catch (error) {
//     console.error(error);
//   }
// }

// handleFlakyService();

// 2.

// function operation() {
//   return new Promise(resolve => {
//     console.log('Operation started');
//     setTimeout(resolve, 1000, 'Operation complete');
//   });
// }

// async function handleOperation() {
//   try {
//     const data = await operation();
//     console.log(data);
//   } finally {
//     console.log('Cleaning up resources...');
//   }
// }

// handleOperation();

// 3.

// function failedFunc() {
//   return new Promise((resolve, reject) => {
//     setTimeout(reject, 2000, 'promise rejected');
//   });
// }

// async function retryOperation(operationFunc) {
//   let attempts = 0;

//   async function attempt() {
//     try {
//       return await operationFunc();
//     } catch (err) {
//       if (attempts < 2) {
//         attempts += 1;
//         console.log(`Retry attempt ${attempts}`);
//         return attempt();
//       } else {
//         throw err;
//       }
//     }
//   }

//   try {
//     console.log(await attempt());
//   } catch {
//     console.error('Operation failed');
//   }
// }

// retryOperation(failedFunc);

// 4.

async function asyncLoadData() {
  try {
    const result = await new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.5) {
          resolve('Data loaded');
        } else {
          reject('Network error');
        }
      }, 1000);
    });
    return result;
  } catch {
    console.error('An error occurred. Attempting to recover...');
    return 'Using cached data';
  }
}

async function processData() {
  console.log(await asyncLoadData());
}

processData();