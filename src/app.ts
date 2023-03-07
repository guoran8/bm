import Taro from "@tarojs/taro";
import { Component, PropsWithChildren, useEffect } from "react";
import "./app.scss";

import api from "./utils/api";
import { useRootStore } from "./store";

function App(props: PropsWithChildren) {
	const { userInfo, setUserNickname, setUserAvatar, setUserPhone } =
		useRootStore();

	useEffect(() => {
		Taro.request({
			url: api.getUserInfo(),
			header: {
				WCid: userInfo?.WCid,
			},
			method: "POST",
			data: {},
		}).then((res) => {
			setUserNickname(res.data.data.nickName);
			setUserAvatar(res.data.data.avatarUrl);
			setUserPhone(res.data.data.phoneNumber);
		});
	}, []);

	return props.children;
}

export default App;
