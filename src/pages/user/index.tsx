import { useState } from "react";
import Taro from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import { Image, Button, Cell, CellGroup } from "@antmjs/vantui";
import "./index.scss";
import { useRootStore } from "../../store";

function UserPage() {
	const [loading, setLoading] = useState(true);
	const { userInfo, setUserInfo } = useRootStore();
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
	// }, []);
	const handleLoginClick = () => {
		Taro.getUserProfile({
			desc: "用于完善会员资料", // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
			success: (res) => {
				// 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
				setUserInfo({
					nickName: res.userInfo.nickName,
					avatarUrl: res.userInfo.avatarUrl,
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
				;
			</View>
		);
	}

	return (
		<View className='user'>
			<View className="user-avatar">
				<Image src={userInfo.avatarUrl} round width="100px" height="100px" />
				{/* <Text>编辑</Text> */}
			</View>
			<CellGroup className="user-info" inset>
				<Cell title="昵称" isLink value={userInfo.nickName} />
				<Cell title="性别" isLink value="内容" />
				<Cell title="手机号码" isLink value="内容" arrowDirection="down" />
				<Cell title="个性签名" isLink value="内容" arrowDirection="down" />
			</CellGroup>
		</View>
	);
}

export default UserPage;
