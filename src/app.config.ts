export default defineAppConfig({
	pages: ["pages/index/index", "pages/user/index"],
	window: {
		backgroundTextStyle: "light",
		navigationBarBackgroundColor: "#fff",
		navigationBarTitleText: "研先知",
		navigationBarTextStyle: "black",
	},
	tabBar: {
		color: "#CCCCCC",
		selectedColor: "#F23030",
		list: [
			{
				text: "首页",
				pagePath: "pages/index/index",
				iconPath: "./assets/images/tab-home.png",
				selectedIconPath: "./assets/images/tab-home-focus.png",
			},
			{
				text: "个人",
				pagePath: "pages/user/index",
				iconPath: "./assets/images/tab-user.png",
				selectedIconPath: "./assets/images/tab-user-focus.png",
			},
		],
	},
});
