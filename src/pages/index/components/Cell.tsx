import { View, Text } from "@tarojs/components";
import { Icon, Image } from "@antmjs/vantui";
import "../index.scss";

interface CellProps {
	name: string;
	logo: string;
}

export function Cell(props: CellProps) {
	const { name, logo } = props;
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
		<View className='cell'>
			<Image width="60px" height="60px" src={logo} />
			<View className="cell-info">
				<Text>{name}</Text>
				<Text>{name}</Text>
			</View>
			<View className="cell-button">
				<Icon name="add" size="52px" color="#F23030" />
			</View>
		</View>
	);
}
