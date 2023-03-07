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

// 订阅公告
function updateSubcription() {
	return HOST_URI + "post/postSchool/schools/save";
}

// 获取用户信息
function getUserInfo() {
	return HOST_URI + "post/h5Customer/info";
}

function userLogin() {
	return HOST_URI + "post/noToken/login";
}

function updateUser() {
	return HOST_URI + "post/h5Customer/update";
}

export default {
	getAllNotices,
	getUserInfo,
	userLogin,
	updateUser,
	updateSubcription,
};
