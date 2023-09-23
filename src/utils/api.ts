import axios from 'axios'

const api = axios.create({
  headers: {
    'Content-Type': 'application/json'
  }
})

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response.status === 401) {
      // store.dispatch({ type: ActionType.LOGOUT })
      console.log('auth error!')
    }
    return Promise.reject(err)
  }
)

export default api
