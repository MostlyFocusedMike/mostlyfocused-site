const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const asyncInterval = async (callback, ms = 250, triesLeft = 5) => {
  return new Promise((resolve, reject) => {
    const handleInterval = () => {
      triesLeft--;
      const result = callback();
      if (result) {
        resolve(result);
        clearInterval(interval);
      } else if (triesLeft < 1) {
        reject(new Error('Failed'));
        clearInterval(interval);
      }
    };

    const interval = setInterval(handleInterval, ms);
  });
};

// Some examples!
const main = async () => {
  console.log('Wait a second');
  await sleep(1000);
  console.log('Hello!');

  const checkForElement = () => {
    console.log('tried!');
    return document.querySelector('#some-3rd-party-div');
  }

  try {
    const result = await asyncInterval(checkForElement);
    console.log('result:', result);
  } catch (err) {
    console.log(err.message);
  }
}

main();
