


async function start() {

  console.log(1);

  console.time('time')
  let promise = await delay(Math.random() * 4000)
  console.timeEnd('time')
  console.log('🍵', promise)

  console.log(3);

}


function delay(time) {
  return new Promise((resolve, reject) => {

    setTimeout(() => {
      console.log(2);
      console.log('delayed by', time, 'seconds')
      resolve()
    }, time)

  })
}

async function getPuffins() {
  let imageUrl = 'https://images.unsplash.com/photo-1724884564497-f5024b7e2f93?q=100&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&w=4000'

  let imageResponse = await fetch(imageUrl)
  console.log(imageResponse);
  let imageData = await imageResponse.text()
  console.log(imageData);

}