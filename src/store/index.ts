import create from "zustand";
import { persist } from "zustand/middleware";
import {
	getStorageSync,
	setStorageSync,
	removeStorageSync,
} from "@tarojs/taro";

type UserInfo = {
	nickName: string;
	avatarUrl: string;
};

interface UserInfoState {
	userInfo: UserInfo | null;
	setUserInfo: (payload: UserInfo) => void;
}

export const useRootStore = create(
	persist<UserInfoState>(
		(set) => ({
			userInfo: null,
			setUserInfo: (payload: UserInfo) =>
				set(() => ({
					userInfo: payload,
				})),
		}),
		{
			name: "zustand/persist/userInfo",
			getStorage: () => ({
				getItem: getStorageSync,
				setItem: setStorageSync,
				removeItem: removeStorageSync,
			}),
		},
	),
);
