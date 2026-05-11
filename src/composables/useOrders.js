import { ref, watch, computed } from 'vue'

const savedOrders = localStorage.getItem('cakeOrders')
let startOrders = []

if (savedOrders) {
  try {
    startOrders = JSON.parse(savedOrders)
  } catch (error) {
    startOrders = []
  }
}

const orders = ref(startOrders)

watch(orders, (newValue) => {
  localStorage.setItem('cakeOrders', JSON.stringify(newValue))
}, { deep: true })

export function useOrders() {
  const orderList = computed(() => orders.value)

  function getOrdersByUserId(userId) {
    return orders.value.filter((order) => order.userId === Number(userId))
  }

  function addOrder(order) {
    let newId = 1

    if (orders.value.length > 0) {
      newId = orders.value[orders.value.length - 1].id + 1
    }

    orders.value.push({
      id: newId,
      userId: Number(order.userId),
      userLogin: order.userLogin,
      name: order.name,
      phone: order.phone,
      email: order.email,
      shape: order.shape,
      taste: order.taste,
      weight: Number(order.weight),
      filling: order.filling,
      decor: order.decor,
      date: order.date,
      comment: order.comment,
      referenceName: order.referenceName,
      price: Number(order.price),
      status: 'Новая заявка'
    })
  }

  function deleteOrder(id) {
    const index = orders.value.findIndex((order) => order.id === Number(id))

    if (index !== -1) {
      orders.value.splice(index, 1)
    }
  }

  function updateOrderStatus(id, status) {
  const order = orders.value.find((order) => order.id === Number(id))

    if (order) {
      order.status = status
    }
  }

  return {
    orderList,
    getOrdersByUserId,
    addOrder,
    deleteOrder
  }
}
