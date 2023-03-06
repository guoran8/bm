import { useEffect, useState } from "react";
import Taro from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import { Icon, Image, Transition, Toast } from "@antmjs/vantui";
import { useRootStore } from "../../../store";
import "../index.scss";

interface CellProps {
	id: number;
	name: string;
	logo: string;
	subscription: boolean;
	onSubscription: (id: number, status: boolean) => void;
}

export function Cell(props: CellProps) {
	const [isSubscription, setIsSubscription] = useState(props.subscription);
	const { userInfo, setUserInfo } = useRootStore();
	const { id, name, logo, onSubscription } = props;

	const showLoginToast = () => {
		Toast.fail({
			message: "请登录",
			selector: "#vanToast-demo2",
			onClose: () => {
				Taro.switchTab({
					url: "/pages/user/index",
				});
			},
		});
	};

	const handleSubscriptionClick = (subscription: boolean) => {
		if (!userInfo) {
			showLoginToast();
			return;
		}

		setIsSubscription(subscription);
		onSubscription && onSubscription(id, subscription);
	};

	useEffect(() => {
		setIsSubscription(props.subscription);
	}, [props.subScription]);
	return (
		<View className='cell'>
			<View className="cell-info">
				<Image width="60px" height="60px" src={logo} />
				<View className="cell-info">
					<Text>{name}</Text>
					<Text>{name}</Text>
				</View>
			</View>

			<View
				className="cell-button"
				style={{ backgroundColor: isSubscription ? "" : "#e6e6e6" }}
			>
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
						onClick={() => handleSubscriptionClick(false)}
						name="bell"
						size="28px"
						color="#F23030"
					/>
				</Transition>
				{!isSubscription && (
					<Icon
						onClick={() => handleSubscriptionClick(true)}
						name="add"
						size="32px"
						color="#929292"
					/>
				)}
			</View>
			<Toast id="vanToast-demo2" />
		</View>
	);
}
