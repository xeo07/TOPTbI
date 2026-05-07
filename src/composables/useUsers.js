import { reactive, computed, watch } from 'vue'

const defaultUsers = [
  {
    id: 1,
    login: 'admin',
    password: 'admin123',
    email: 'admin@cakes.ru',
    phone: '+79990000000',
    city: 'Санкт-Петербург',
    address: 'Невский проспект',
    role: 'admin'
  },
  {
    id: 2,
    login: 'ivan',
    password: 'ivan123',
    email: 'ivan@example.ru',
    phone: '+79991112233',
    city: 'Санкт-Петербург',
    address: 'ул. Садовая',
    role: 'user'
  }
]

const state = reactive({
  users: defaultUsers,
  currentUserId: null,
  nextUserId: 3
})

try {
  const usersFromStorage = localStorage.getItem('cake_users')
  const currentUserIdFromStorage = localStorage.getItem('cake_current_user_id')
  const nextIdFromStorage = localStorage.getItem('cake_users_next_id')

  if (usersFromStorage) {
    const parsedUsers = JSON.parse(usersFromStorage)

    if (Array.isArray(parsedUsers) && parsedUsers.length > 0) {
      state.users = parsedUsers
    }
  }

  if (currentUserIdFromStorage) {
    state.currentUserId = Number(currentUserIdFromStorage)
  }

  if (nextIdFromStorage) {
    state.nextUserId = Number(nextIdFromStorage)
  }
} catch (error) {
  state.users = defaultUsers
  state.currentUserId = null
  state.nextUserId = 3
}

watch(
  () => state.users,
  (newValue) => {
    localStorage.setItem('cake_users', JSON.stringify(newValue))
  },
  { deep: true }
)

watch(
  () => state.currentUserId,
  (newValue) => {
    if (newValue === null) {
      localStorage.removeItem('cake_current_user_id')
    } else {
      localStorage.setItem('cake_current_user_id', String(newValue))
    }
  }
)

watch(
  () => state.nextUserId,
  (newValue) => {
    localStorage.setItem('cake_users_next_id', String(newValue))
  }
)

function registerUser(data) {
  const existingUser = state.users.find((user) => {
    return user.login === data.login || user.email === data.email
  })

  if (existingUser) {
    return {
      success: false,
      message: 'Пользователь с таким логином или почтой уже существует.'
    }
  }

  const newUser = {
    id: state.nextUserId,
    login: data.login,
    password: data.password,
    email: data.email,
    phone: data.phone,
    city: data.city,
    address: data.address,
    role: 'user'
  }

  state.users.push(newUser)
  state.nextUserId = state.nextUserId + 1

  return {
    success: true,
    message: 'Регистрация выполнена успешно.'
  }
}

function loginUser(login, password) {
  const foundUser = state.users.find((user) => {
    return user.login === login && user.password === password
  })

  if (!foundUser) {
    return {
      success: false,
      message: 'Неверная пара логин-пароль.'
    }
  }

  state.currentUserId = foundUser.id

  return {
    success: true,
    message: 'Авторизация успешна.'
  }
}

function logoutUser() {
  state.currentUserId = null
}

function updateCurrentUser(data) {
  const current = state.users.find((user) => user.id === state.currentUserId)

  if (!current) {
    return false
  }

  current.login = data.login
  current.password = data.password
  current.email = data.email
  current.phone = data.phone
  current.city = data.city
  current.address = data.address

  return true
}

function deleteUser(id) {
  const target = state.users.find((user) => user.id === Number(id))

  if (!target) {
    return false
  }

  if (target.role === 'admin') {
    return false
  }

  const index = state.users.findIndex((user) => user.id === Number(id))

  if (index !== -1) {
    state.users.splice(index, 1)
  }

  if (state.currentUserId === Number(id)) {
    state.currentUserId = null
  }

  return true
}

export function useUsers() {
  const users = computed(() => state.users)
  const currentUser = computed(() => {
    return state.users.find((user) => user.id === state.currentUserId) || null
  })
  const isAuth = computed(() => currentUser.value !== null)
  const isAdmin = computed(() => currentUser.value !== null && currentUser.value.role === 'admin')

  return {
    users,
    currentUser,
    isAuth,
    isAdmin,
    registerUser,
    loginUser,
    logoutUser,
    updateCurrentUser,
    deleteUser
  }
}
