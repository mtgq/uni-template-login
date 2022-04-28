import * as Storage from '@/common/storage.js'

export const getToken = () => {
	let key = Storage.cacheKey.token
	return Storage.get(key)
}

export const setToken = (value) => {
	let key = Storage.cacheKey.token
	return Storage.set(key, value)
}

export const clearToken = (value) => {
	let key = Storage.cacheKey.token
	return Storage.set(key, '')
}

export const isLogin = () => {
	if (getToken() == '') {
		return false
	}
	return true
}

export const checkLogin = (opt = {}) => {
	let redirect = '/pages/index/index'
	if (opt.redirect && opt.redirect != '') {
		redirect = opt.redirect
	}
	if (getToken() == '') {
		uni.navigateTo({
			url: '/pages/account/login?redirect=' + encodeURIComponent(redirect)
		})
		return false
	}
	if (opt.success && typeof opt.success == 'function') {
		opt.success()
	}
}
