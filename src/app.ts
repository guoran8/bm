import Taro from "@tarojs/taro";
import { Component, PropsWithChildren } from "react";
import "./app.scss";

class App extends Component<PropsWithChildren> {
	componentDidMount() {
		Taro.login({
			success: function (res) {
				if (res.code) {
					console.log("user", res.code);
					//发起网络请求
					// Taro.request({
					// 	url: "https://test.com/onLogin",
					// 	data: {
					// 		code: res.code,
					// 	},
					// });
				} else {
					console.log("登录失败！" + res.errMsg);
				}
			},
		});
	}

	componentDidShow() {}

	componentDidHide() {}

	render() {
		// this.props.children 是将要会渲染的页面
		return this.props.children;
	}
}

export default App;
