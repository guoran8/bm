import { useState } from "react";
import { View, Text } from "@tarojs/components";
import { Icon, Image, Transition } from "@antmjs/vantui";
import "../index.scss";

interface CellProps {
	name: string;
	logo: string;
}

export function Cell(props: CellProps) {
	const [isSubscription, setIsSubscription] = useState(false);
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
			<View className="cell-info">
				<Image width="60px" height="60px" src={logo} />
				<View className="cell-info">
					<Text>{name}</Text>
					<Text>{name}</Text>
				</View>
			</View>

			<View className="cell-button">
				<Transition
					duration={{ enter: 300, leave: 1000 }}
					className="center-x"
					enterClass="vanEnterClass"
					enterActiveClass="vanEnterActiveClass"
					leaveActiveClass="vanLeaveActiveClass"
					leaveToClass="vanLeaveToClass"
					key={`fade-righttran`}
					show={isSubscription}
					name="fade-right"
				>
					<Icon
						onClick={() => setIsSubscription(false)}
						name="bell"
						size="32px"
						color="#F23030"
					/>
				</Transition>
				{!isSubscription && (
					<Icon
						onClick={() => setIsSubscription(true)}
						name="add"
						size="52px"
						color="#F23030"
					/>
				)}
			</View>
		</View>
	);
}
