// babel-preset-taro 更多选项和默认值：
// https://github.com/NervJS/taro/blob/next/packages/babel-preset-taro/README.md
module.exports = {
	plugins: [
		[
			"import",
			{
				libraryName: "@antmjs/vantui",
				libraryDirectory: "es",
				style: (name) => `${name}/style/less`,
			},
			"@antmjs/vantui",
		],
	],
	presets: [
		[
			"taro",
			{
				framework: "react",
				ts: true,
			},
		],
	],
};
