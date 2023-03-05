import Taro, { useState } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import { Button } from "@antmjs/vantui";
import "./index.css";

function UserPage() {
	const [loading, setLoading] = useState(true);
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

	return (
		<View className='index'>
			<Button>123231</Button>
		</View>
	);
}

export default UserPage;
