// 用户数据模块
import storage from '@/common/storage'

const state = {
	token: uni.getStorageSync("token") || "",
	isLogin: uni.getStorageSync("isLogin") || false, // 是否登陆
	userInfo: uni.getStorageSync("userInfo") || {}, // 用户信息
	userData: {}, //用户其他相关信息
}

const getters = {
	token: state => state.token,
	isLogin: state => state.isLogin,
	userInfo: state => state.userInfo,
}

const actions = {
	// 获取用户信息
	getUserInfo({
		commit,
		dispatch,
		getters,
		state
	}, userData = []) {
		commit('userInfo', userData);
		commit('isLogin', true);
	},

	// 退出登录
	logout({
		commit,
		dispatch
	}) {
		commit('isLogin', false);
		commit('userInfo', {});
		commit('USER_DATA', {});
		// 重置全局分享信息
		share.setShareInfo();
	},
}

const mutations = {
	token(state, payload) {
		state.token = payload;
		uni.setStorageSync("token", payload);
	},
	// 登录态
	isLogin(state, data) {
		state.isLogin = data;
		uni.setStorageSync('isLogin', data);
	},
	// 用户信息
	userInfo(state, data) {
		state.userInfo = data;
		uni.setStorageSync("userInfo", data);
	},
}


export default {
	state,
	mutations,
	actions,
	getters
}
