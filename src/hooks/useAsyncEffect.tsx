import { useEffect } from "react";
import { DependencyList } from "@tarojs/taro";

export function useAsyncEffect(
	effect: () => Promise<any>,
	deps?: DependencyList,
) {
	useEffect(() => {
		effect();
	}, deps);
}
