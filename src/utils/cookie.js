import Cookies from 'js-cookie'

const TOKEN_KEY = 'APP_TOKEN'

export const getToken = () => Cookies.get(TOKEN_KEY)

export const setToken = TOKEN => Cookies.set(TOKEN_KEY, TOKEN)

export const removeToken = () => Cookies.remove(TOKEN_KEY)
