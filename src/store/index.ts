import create from "zustand";
import { persist } from "zustand/middleware";
import {
	getStorageSync,
	setStorageSync,
	removeStorageSync,
} from "@tarojs/taro";

type UserInfo = {
	nickName: string;
	phone?: string;
	avatarUrl: string;
	gender: number | undefined;
	WCid: string;
};

interface UserInfoState {
	userInfo: UserInfo | null;
	setUserInfo: (payload: UserInfo) => void;
	setUserPhone: (phone: string) => void;
	setUserAvatar: (avatar: string) => void;
	setUserNickname: (name: string) => void;
}

export const useRootStore = create(
	persist<UserInfoState>(
		(set) => ({
			userInfo: null,
			setUserInfo: (payload: UserInfo) =>
				set(() => ({
					userInfo: payload,
				})),
			setUserPhone: (phone: string) =>
				set((state) => ({
					userInfo: {
						phone,
						nickName: state.userInfo?.nickName || "",
						avatarUrl: state.userInfo?.avatarUrl || "",
						gender: state.userInfo?.gender ?? undefined,
						WCid: state.userInfo?.WCid || "",
					},
				})),
			setUserAvatar: (avatar: string) =>
				set((state) => ({
					userInfo: {
						phone: state.userInfo?.phone,
						nickName: state.userInfo?.nickName || "",
						avatarUrl: avatar,
						gender: state.userInfo?.gender ?? undefined,
						WCid: state.userInfo?.WCid || "",
					},
				})),
			setUserNickname: (name: string) =>
				set((state) => ({
					userInfo: {
						phone: state.userInfo?.phone,
						nickName: name,
						avatarUrl: state.userInfo?.avatarUrl || "",
						gender: state.userInfo?.gender ?? undefined,
						WCid: state.userInfo?.WCid || "",
					},
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
