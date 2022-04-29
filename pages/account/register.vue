<template>
	<view class="container">
		<u--form v-if="loginType=='password'" :model="pl" ref="pl">
			<u-form-item label="账号" prop="account" borderBottom>
				<u--input border="none" v-model="pl.account" type="number" maxlength="11" placeholder="请输入手机号">
				</u--input>
			</u-form-item>
			<u-form-item borderBottom label="密码" prop="password">
				<u-input border="none" v-model="pl.password" :type="pwdType" maxlength="16" placeholder="请输入密码">
					<template slot="suffix">
						<u-icon :name="isPassword?'eye-fill':'eye-off'" @click="showPassword()"></u-icon>
					</template>
				</u-input>
			</u-form-item>
			<u-form-item borderBottom label="密码" prop="rePassword">
				<u-input border="none" v-model="pl.rePassword" :type="pwdType1" maxlength="16" placeholder="请输入密码">
					<template slot="suffix">
						<u-icon :name="isPassword1?'eye-fill':'eye-off'" @click="showPassword1()"></u-icon>
					</template>
				</u-input>
			</u-form-item>
			<view class="form-item">
				<u-button type="primary" @click="submit" text="注册"></u-button>
			</view>
			<view class="form-item">
				<view class="link">
					<text @click="gotoLogin">用户登录</text>
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
				isPassword1: false,
				pwdType1: 'password',
				loginType: 'password',
				pl: {
					account: '',
					password: '',
					rePassword: '',
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
							message: '请输入密码',
							trigger: ['change', 'blur'],
						},
						{
							// 正则不能含有两边的引号
							pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]+\S{5,12}$/,
							message: '需同时含有字母和数字，长度在6-12之间',
							trigger: ['change', 'blur'],
						}
					],
					rePassword: [{
							required: true,
							message: '请重新输入密码',
							trigger: ['change', 'blur'],
						},
						{
							validator: (rule, value, callback) => {
								return value === this.pl.password;
							},
							message: '两次输入的密码不相等',
							trigger: ['change', 'blur'],
						}
					],
				},
			}
		},
		computed: {
			...mapGetters(['isLogin']),
		},
		onLoad(e) {},
		onReady() {
			this.$refs.pl.setRules(this.plRules)
		},
		onShow() {
			if (this.isLogin) {
				uni.navigateTo({
					url: '/pages/me/index'
				});
			}
		},
		methods: {
			showPassword() {
				this.pwdType = this.pwdType === 'password' ? 'text' : 'password';
				this.isPassword = !this.isPassword;
			},
			showPassword1() {
				this.pwdType = this.pwdType === 'password' ? 'text' : 'password';
				this.isPassword = !this.isPassword;
			},
			submit() {
				this.$refs.pl.validate(valid => {
					if (valid) {}
				})
			},
			gotoLogin() {
				uni.navigateTo({
					url: '/pages/account/login'
				});
			},
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
