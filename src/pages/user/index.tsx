import { useState } from "react";
import Taro from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import { Image, Button, Cell, CellGroup, Field } from "@antmjs/vantui";
import api from "../../utils/api";
import "./index.scss";
import { useRootStore } from "../../store";

function UserPage() {
	const [loading, setLoading] = useState(true);
	const { userInfo, setUserInfo, setUserAvatar, setUserPhone } = useRootStore();
	const [phone, setPhone] = useState(userInfo?.phone);
	// const [threads, setThreads] = useState<IThread[]>([]);
	// useAsyncEffect(async () => {
	// 	try {
	// 		const res = await Taro.request<IThread[]>({
	// 			url: api.getLatestTopic(),
	// 		});
	// 		setLoading(false);
	// 		setThreads(res.data);
	// 	} catch (error) {
	// 		Taro.showToast({
	// 			title: "载入远程数据错误",
	// 		});
	// 	}
	// }, [])
	const handleChooseAvatarClick = async (e: any) => {
		// 更新用户信息
		const { avatarUrl } = e.detail;
		const userRes = await Taro.request({
			url: api.updateUser(),
			header: {
				WCid: userInfo?.WCid,
			},
			method: "POST",
			data: {
				avatarUrl: avatarUrl,
			},
		});

		setUserAvatar(avatarUrl);
	};
	const handleSavePhoneClick = async () => {
		await Taro.request({
			url: api.updateUser(),
			header: {
				WCid: userInfo?.WCid,
			},
			method: "POST",
			data: {
				phoneNumber: phone,
			},
		});

		setUserPhone(phone);
	};

	const formatGender = (type: number | undefined) => {
		if (type === undefined) return "未知";
		return type === 0 ? "男" : "女";
	};
	const handleLoginClick = () => {
		Taro.getUserProfile({
			desc: "用于完善会员资料", // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
			success: (profileRes) => {
				// 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
				Taro.login({
					async success(wxLoginRes) {
						if (wxLoginRes.code) {
							// 获取用户 token
							const loginRes = await Taro.request({
								url: api.userLogin(),
								method: "POST",
								data: {
									grantType: "wechat",
									wechatCode: wxLoginRes.code,
								},
							});

							// 更新用户信息
							const userRes = await Taro.request({
								url: api.updateUser(),
								header: {
									WCid: loginRes.data.data.token,
								},
								method: "POST",
								data: {
									nickName: profileRes.userInfo.nickName,
									gender: profileRes.userInfo.gender,
									avatarUrl: profileRes.userInfo.avatarUrl,
								},
							});

							console.log("WCid", loginRes.data.data.token);

							setUserInfo({
								nickName: profileRes.userInfo.nickName,
								gender: profileRes.userInfo.gender,
								avatarUrl: profileRes.userInfo.avatarUrl,
								WCid: loginRes.data.data.token,
							});
						}
					},
				});

				// this.setState({
				// 	userInfo: res.userInfo,
				// 	hasUserInfo: true,
				// });
			},
		});
	};

	if (!userInfo) {
		return (
			<View className="login">
				<Button
					onClick={handleLoginClick}
					className="login-button"
					color="#F23030"
				>
					登录
				</Button>
			</View>
		);
	}

	return (
		<View className='user'>
			<Button
				className="avatar-wrapper"
				onChooseAvatar={handleChooseAvatarClick}
				openType="chooseAvatar"
			>
				<Image className="avatar" src={userInfo.avatarUrl} />
			</Button>
			<CellGroup className="user-info" inset>
				<Field
					value={userInfo.nickName}
					clearable
					type="nickname"
					label="昵称"
					placeholder="请输入用户名"
				/>
				<Field
					type="text"
					value={formatGender(userInfo.gender)}
					label="性别"
					placeholder="请输入密码"
					disabled
				/>
				<Field
					value={phone}
					onChange={(e) => setPhone(e.detail)}
					center
					clearable
					type="number"
					label="手机号码"
					placeholder="请输手机号码"
					renderButton={
						<Button onClick={handleSavePhoneClick} size="small" type="primary">
							保存
						</Button>
					}
				/>
			</CellGroup>
			<Button
				onClick={handleLoginClick}
				className="login-button"
				color="#F23030"
			>
				登录
			</Button>
		</View>
	);
}

export default UserPage;
