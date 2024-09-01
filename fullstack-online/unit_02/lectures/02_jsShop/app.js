
const menu = [
  {
    name: 'Pomegranate',
    price: 4.15,
    quantity: 0
  },
  {
    name: 'Plantains',
    price: 5.99,
    quantity: 0
  },
  {
    name: 'Dragon Fruit',
    price: 3.40,
    quantity: 0
  },
  {
    name: 'Durian',
    price: 6.75,
    quantity: 0
  },
  {
    name: 'Bananas',
    price: 2.75,
    quantity: 0
  },
]

function addPlantains() {
  menu[0].quantity += 1
  console.log('added Plantain', menu[0]);
}

function addFruit(fruitIndex) {
  menu[fruitIndex].quantity += 1
  console.log('added Pom', menu[fruitIndex])
}

function addFruitByName(fruitName) {
  // console.log('ordering', fruitName);
  for (let i = 0; i < menu.length; i++) {
    const item = menu[i]
    if (fruitName == item.name) {
      item.quantity += 1
      console.log('+', i, item);
    }
  }
  drawOrder()
}

function drawOrder() {
  const orderListElm = document.getElementById('order-list')
  const totalElm = document.getElementById('order-total')
  // console.log(orderListElm);
  let orderContent = ''

  for (let i = 0; i < menu.length; i++) {
    const item = menu[i]
    if (item.quantity > 0) {
      console.log(`${item.quantity}x ${item.name} $${(item.price * item.quantity).toFixed(2)}`);
      orderContent += `
      <p class="fw-bold">${item.quantity}x ${item.name} $${(item.price * item.quantity).toFixed(2)}</p>`
    }
  }

  orderListElm.innerHTML = orderContent
  const orderTotal = getOrderTotal()
  console.log('🏧', orderTotal);
  totalElm.innerText = orderTotal.toFixed(2)
}

function getOrderTotal() {
  let total = 0
  for (let i = 0; i < menu.length; i++) {
    const item = menu[i]
    total += item.price * item.quantity
  }
  console.log('💰', total);
  return total
}

function clearOrder() {
  for (let i = 0; i < menu.length; i++) {
    const item = menu[i]
    item.quantity = 0
  }
  window.alert("Thank you for shopping with us!😎")
  drawOrder()
}