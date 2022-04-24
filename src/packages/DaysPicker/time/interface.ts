/*
 * @Author: your name
 * @Date: 2022-04-24 10:11:24
 * @LastEditTime: 2022-04-24 16:15:10
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /tinkerbell-ui-react/src/packages/DaysPicker/time/interface.ts
 */
// props 小时
export type hourProps = {
	active: number;
	change: Function;
	year: number;
	month: number;
	day: number;
	limit: boolean;
};

// props 分钟
export type minuteProps = {
	active: number;
	change: Function;
	year: number;
	month: number;
	day: number;
	hour: number;
	limit: boolean;
};

export type ListItem = {
	label: string;
	value: number;
};
// 小时/分 -数据列表生成
export function getTimeList(
	max: number,
	year: number,
	month: number,
	day: number,
	hour: number,
	minute: number,
	limit: boolean
) {
	let list: Array<ListItem> = [];

	for (let i = max; i > -1; i--) {
		if (
			checkDisabled(
				max < 24,
				year,
				month,
				day,
				max > 23 ? hour : i,
				max < 24 ? minute : i
			) ||
			!limit
		) {
			let label = i < 10 ? `0${i.toString()}` : i.toString();
			list.push({
				label: label,
				value: i,
			});
		} else {
			break;
		}
	}
	return list.reverse();
}
// 时/分-禁用判定
function checkDisabled(
	ishour: boolean,
	prevYear: number,
	prevMonth: number,
	prevDay: number,
	prevHour: number,
	prevMinute: number
) {
	const prevTime = new Date(
		`${prevYear}/${prevMonth}/${prevDay} ${prevHour}:${prevMinute}`
	).getTime();
	const newDate = new Date();
	const year: number = newDate.getFullYear();
	let month: number = newDate.getMonth() + 1;
	let day: number = newDate.getDate();
	let hour: number = newDate.getHours();
	let minute: number = newDate.getMinutes();
	const newTime = new Date(
		`${year}/${month}/${day} ${hour}:${ishour ? 0 : minute}`
	).getTime();
	return prevTime >= newTime;
}

// 秒 -数据列表生成
export function getSecondList(max: number) {
	let list: Array<ListItem> = [];

	for (let i = max; i > -1; i--) {
		let label = i < 10 ? `0${i.toString()}` : i.toString();
		list.push({
			label: label,
			value: i,
		});
	}
	return list.reverse();
}
