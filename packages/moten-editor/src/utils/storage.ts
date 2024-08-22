const constants = {
  TOKEN: 'token',
}

/**
 * 获取token
 * @returns token
 */
export const getToken = () => localStorage.getItem(constants.TOKEN) || ''

/**
 * 设置token
 * @param token token
 * @returns void
 */
export const setToken = (token = '') => localStorage.setItem(constants.TOKEN, token)
