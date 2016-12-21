import 'isomorphic-fetch';

// wait, then resolve
const wait = (time) => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, time);
  });
}


// fetch data from a remote url, return the json
const apiFetchJson = async (url) => {
  // fetch() returns a promise
  let result = await fetch(url);
  // json() returns a promise.  Could also just return result.json()
  let json = await result.json();
  return json;
}


const getQuote = async () => {
  let resp = await fetch('http://ron-swanson-quotes.herokuapp.com/v2/quotes');
  let json = await resp.json();
  return json[0];
};

// This function isn't labeled as async, but 'fetch' returns a promise, so we can await
// this is functionally the same as getQuote from above, just returning a promise
const getQuotePromise = () => {
  return fetch('http://ron-swanson-quotes.herokuapp.com/v2/quotes')
    .then(resp => resp.json())
    .then(resp => resp[0]);
}

// For times when using the $q library, and using the .finally() method at the end
// of the promise chain, ex: doSomething.then().catch().finally().  Happens a lot
// when blocking the UI for an asyncronous operation
const tryCatchFinally = async () => {
  console.log('blockUI.start()');
  try {
    const errorFetch = await apiFetchJson('http://something.not.real.blah');
    console.log('Fetch Success!');
  } catch(e) {
    console.log('Fetch Error!');
  }
  console.log('blockUI.stop()');
};

// ** CAN'T DO THIS, CAUSES COMPILER ERROR
// ** await must be used within an async function
// const fourSquared = await asyncSquare(4);
// console.log(fourSquared);

// await must be wrapped in async function
async function main() {
  // Example of awaiting function marked as async
  console.log('----- Running test 1 ------');
  const quote = await getQuote();
  console.log('ron says 1: ', quote);

  console.log('----- Waiting 1 second ------');
  // wait 1 second
  await wait(2000);

  // Example of awaiting function that isn't marked as async, but returns a Promise
  console.log('----- Running test 2 ------');
  const quote2 = await getQuotePromise();
  console.log('ron says 2: ', quote);

  // Example of then().catch().finally() flow using try/catch w/ finally after catch
  console.log('----- Running test 3 ------');
  const result = await tryCatchFinally();

  // Example where async function returns promise
  // Won't block or await here, running 3 will come before response handler
  console.log('----- Running test 4 ------');
  const url = apiFetchJson("http://www.reddit.com/r/golfpics/.json")
    .then(res => console.log('Response from test 4:',res));

  // Example: Run three async functions in parallel with await Promise.all
  console.log('----- Running test 5 ------');
  console.log('running 3 at a time');
  console.time('run 3');
  const runMany = await Promise.all([
    wait(1000),
    wait(2000),
    wait(1000),
  ]);
  console.timeEnd('run 3');

  // Simple Example
  console.log('----- Running test 6 ------');
  console.log('fetching api');
  let apiResp = await apiFetchJson('http://www.reddit.com/r/golfpics/.json');
  console.log(apiResp);

};

main();