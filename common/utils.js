export const getNowTime = () => {
	return Math.ceil(Date.now() / 1000)
}

export const formatPrice = (number) => {
	number = parseFloat(number)
	return '￥' + number.toFixed(2)
}

export const formatNumber = (number) => {
	number = number.toString()
	return number[1] ? number : '0' + number
}

export const redirect = (url, params = {}) => {
	const tabUrls = [
		'/pages/index/index',
		'/pages/course/category',
		'/pages/discovery/index',
		'/pages/me/index',
		'/pages/im/index',
	]
	if (Object.keys(params).length > 0) {
		url += '?' + httpBuildQuery(params)
	}
	if (tabUrls.indexOf(url) !== -1) {
		uni.switchTab({
			url: url
		})
	} else if (url.indexOf('://') !== -1) {
		plus.runtime.openURL(url)
	} else if (url.indexOf('/pages') == 0) {
		uni.navigateTo({
			url: url
		})
	} else {
		uni.showToast({
			title: '不支持的协议类型'
		})
	}
}
