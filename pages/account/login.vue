<template>
	<view class="container">
		<u--form v-if="loginType=='password'" :model="model1" ref="form1">
			<u-form-item borderBottom label="账号" prop="account">
				<u-input border="none" v-model="model1.account" type="number" maxlength="11" placeholder="请输入手机号">
				</u-input>
			</u-form-item>
			<u-form-item borderBottom label="密码" prop="password">
				<u-input border="none" v-model="model1.password" :type="pwdType" maxlength="16" placeholder="请输入密码">
					<template slot="suffix">
						<u-icon :name="isPassword?'eye-fill':'eye-off'" @click="showPassword()"></u-icon>
					</template>
				</u-input>
			</u-form-item>
			<view class="form-item">
				<u-button type="primary" text="登录" @click="loginByPassword"></u-button>
			</view>
			<view class="form-item">
				<view class="link">
					<text @click="loginType='verify'">验证码登录</text>
					<text @click="gotoForget">忘记密码</text>
					<text @click="gotoRegister">用户注册</text>
				</view>
			</view>
		</u--form>
		<u--form v-else-if="loginType=='verify'" :model="model2" ref="form2">
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
		</u--form>
	</view>
</template>

<script>
	import {
		mapMutations,
		mapActions,
		mapState,
		mapGetters
	} from 'vuex';

	export default {
		data() {
			return {
				isPassword: false,
				pwdType: 'password',
				loginType: 'password',
				redirectUrl: '/pages/index/index',
				verifyCodeTips: '',
				model1: {
					account: '',
					password: ''
				},
				model2: {
					account: '',
					verify_code: ''
				},
				model1Rules: {
					account: [{
						required: true,
						message: '请填写手机号'
					}, {
						validator: (rule, value, callback) => {
							return this.$u.test.mobile(value)
						},
						message: '手机号填写错误'
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
						message: '手机号填写错误'
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
		computed: {
			...mapGetters(['isLogin']),
		},
		onLoad(e) {},
		onReady() {
			if (this.loginType == 'password') {
				this.$refs.form1.setRules(this.model1Rules)
			} else {
				this.$refs.form2.setRules(this.model2Rules)
			}
		},
		onShow() {
			console.log(this.isLogin)
			// if (this.$utils.isLogin()) {
			// 	this.$utils.redirect('/pages/me/index')
			// }
		},
		methods: {
			...mapActions(['getUserInfo']),
			showPassword() {
				this.pwdType = this.pwdType === 'password' ? 'text' : 'password';
				this.isPassword = !this.isPassword;
			},
			verifyCodeChange(text) {
				this.verifyCodeTips = text
			},
			getVerifyCode: async function() {},
			loginByPassword() {
				this.$refs.form1.validate().then(valid => {
					if (valid) {
						uni.$u.http.post('login/logon', {
							phone: this.model1.account,
							password: this.model1.password
						}).then(res => {
							if (res.code == 200) {
								this.getUserInfo(res.data);
							}
							// this.$utils.redirect(this.redirectUrl)
						}).catch(err => {

						})
					}
				}).catch(errors => {
					uni.$u.toast('校验失败')
				})
			},
			loginByVerify() {
				this.$refs.form2.validate(valid => {
					if (valid) {
						uni.$u.toast('校验通过')
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

<style lang="scss">
	.form-item .link {
		display: flex;
		justify-content: center;
	}

	.form-item .link text {
		margin: 0 15rpx;
		color: #007aff;
	}
</style>
