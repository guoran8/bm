const HOST_URI = "https://pre.java-api.itxcc.cn/";

function queryString(obj?: Object) {
	if (!obj) {
		return "";
	}
	return (
		"?" +
		Object.keys(obj)
			.map(function (k) {
				return encodeURIComponent(k) + "=" + encodeURIComponent(obj[k]);
			})
			.join("&")
	);
}
// 获取所有公告
function getAllNotices() {
	return HOST_URI + "post/postSchool/school/list";
}

export default {
	getAllNotices,
};
