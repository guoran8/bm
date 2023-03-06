import { useState } from "react";
import Taro from "@tarojs/taro";
import { View, ScrollView, Text } from "@tarojs/components";
import { Button } from "@antmjs/vantui";
import { useRootStore } from "../../store";
import api from "../../utils/api";
import { useAsyncEffect } from "../../hooks/useAsyncEffect";
import { Cell } from "./components/Cell";
import "./index.scss";

interface IListItem {
	id: number;
	schoolName: string;
	schoolLogo: string;
}

function IndexPage() {
	const [loading, setLoading] = useState(true);
	const { value, increment } = useRootStore();
	const [list, setList] = useState<IListItem[]>([]);

	useAsyncEffect(async () => {
		try {
			const res = await Taro.request<[]>({
				url: api.getAllNotices(),
				method: "POST",
				data: {
					current: 1,
					extra: {},
					model: {
						class: "",
						date: "",
						day: "",
						distanceEnd: "",
						distanceStart: "",
						lat: 0,
						lng: 0,
						orderBy: 0,
						type: "order",
					},

					order: "descending",
					size: 4,
					sort: "id",
				},
			});
			setLoading(false);
			setList(() =>
				res.data.data.records.map((item: any) => ({
					id: item.id,
					schoolName: item.schoolName,
					schoolLogo: item.schoolLogo,
				})),
			);
		} catch (error) {
			Taro.showToast({
				title: "载入远程数据错误",
			});
		}
	}, []);

	return (
		<>
			<Text>{value}</Text>
			<View className="header">
				<Text className="header-title">研先知-学校</Text>
				<Text className="header-desc">请等待研先知收录您的学校</Text>
			</View>
			<ScrollView className='list'>
				{list?.map((item) => (
					<Cell key={item.id} name={item.schoolName} logo={item.schoolLogo} />
				))}
			</ScrollView>
		</>
	);
}

export default IndexPage;
