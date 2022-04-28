<template>
	<view class="container">
		<u-form v-if="loginType=='password'" :model="pl" ref="pl">
			<u-form-item label="账号" prop="account">
				<u-input v-model="pl.account" type="number" maxlength="11" placeholder="请输入手机号"></u-input>
			</u-form-item>
			<u-form-item label="密码" prop="password">
				<u-input v-model="pl.password" type="password" maxlength="16" placeholder="请输入密码" :password-icon="true">
				</u-input>
			</u-form-item>
			<view class="form-item">
				<u-button type="primary" @click="loginByPassword">登录</u-button>
			</view>
			<view class="form-item">
				<view class="link">
					<text @click="loginType='verify'">验证登录</text>
					<text @click="gotoForget">忘记密码</text>
					<text @click="gotoRegister">用户注册</text>
				</view>
			</view>
		</u-form>
		<u-form v-else-if="loginType=='verify'" :model="vl" ref="vl">
			<u-verification-code seconds="60" ref="verifyCode" @change="verifyCodeChange"></u-verification-code>
			<u-form-item label="手机号" label-width="150" prop="account">
				<u-input v-model="vl.account" type="number" maxlength="11" placeholder="请输入手机号"></u-input>
			</u-form-item>
			<u-form-item label="验证码" label-width="150" prop="verifyCode">
				<u-input v-model="vl.verify_code" type="number" maxlength="6" placeholder="请输入验证码"></u-input>
				<u-button slot="right" type="success" size="mini" @click="getVerifyCode">{{ verifyCodeTips }}</u-button>
			</u-form-item>
			<view class="form-item">
				<u-button type="primary" @click="loginByVerify">登录</u-button>
			</view>
			<view class="form-item">
				<view class="link">
					<text @click="loginType='password'">密码登录</text>
					<text @click="gotoForget">忘记密码</text>
					<text @click="gotoRegister">用户注册</text>
				</view>
			</view>
		</u-form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				loginType: 'password',
				redirectUrl: '/pages/index/index',
				verifyCodeTips: '',
				pl: {
					account: '',
					password: ''
				},
				vl: {
					account: '',
					verify_code: ''
				},
				plRules: {
					account: [{
						required: true,
						message: '请填写手机号'
					}, {
						validator: (rule, value, callback) => {
							return this.$u.test.mobile(value)
						},
						message: '无效的手机号'
					}],
					password: [{
						required: true,
						message: '请填写账户密码'
					}, {
						min: 6,
						max: 16,
						message: '密码6-16个字符'
					}]
				},
				vlRules: {
					account: [{
						required: true,
						message: '请填写手机号'
					}, {
						validator: (rule, value, callback) => {
							return this.$u.test.mobile(value)
						},
						message: '无效的手机号'
					}],
					verify_code: [{
						required: true,
						message: '请填写验证码'
					}, {
						len: 6,
						message: '无效的验证码'
					}]
				}
			}
		},
		onLoad(e) {
			if (e.redirect) {
				this.redirectUrl = e.redirect
			}
		},
		onReady() {
			if (this.loginType == 'password') {
				this.$refs.pl.setRules(this.plRules)
			} else {
				this.$refs.vl.setRules(this.vlRules)
			}
		},
		onShow() {
			if (this.$utils.isLogin()) {
				this.$utils.redirect('/pages/me/index')
			}
		},
		methods: {
			verifyCodeChange(text) {
				this.verifyCodeTips = text
			},
			getVerifyCode: async function() {},
			loginByPassword() {
				this.$refs.pl.validate(valid => {
					if (valid) {
						this.$api.loginByPassword({
							account: this.pl.account,
							password: this.pl.password
						}).then(res => {
							this.$utils.setToken(res.token)
							this.$utils.redirect(this.redirectUrl)
						}).catch(e => {
							this.$u.toast(e.msg)
						})
					}
				})
			},
			loginByVerify() {
				this.$refs.vl.validate(valid => {
					if (valid) {
						this.$api.loginByVerify({
							account: this.vl.account,
							verify_code: this.vl.verify_code
						}).then(res => {
							this.$utils.setToken(res.token)
							this.$utils.redirect(this.redirectUrl)
						}).catch(e => {
							this.$u.toast(e.msg)
						})
					}
				})
			},
			gotoForget() {
				this.$utils.redirect('/pages/account/forget')
			},
			gotoRegister() {
				this.$utils.redirect('/pages/account/register')
			}
		}
	}
</script>

<style>

</style>
