/*
 * @Description:
 * @Author: 刘强
 * @Date: 2021-12-22 16:11:50
 * @LastEditTime: 2022-04-24 16:13:31
 * @LastEditors: Please set LastEditors
 */
export interface DatePickerProps {
	placeholder?: string;
	disabled?: boolean;
	value: string;
	onChange: Function;
	defaultValue?: string;
	limit?: boolean;
	type?:string;
	size?:string
}

// type 默认值
type defaultParam = {
	year: number;
	month: number;
	day: number;
	hour: number;
	minute: number;
	//
	yearLabel: string;
	monthLabel: string;
	dayLabel: string;
	hourLabel: string;
	minuteLabel: string;
	value: string;
	timeStamp: number;
};

// 获取当前值
export function getNewParams(time: string) {
	//兼容ios,ios浏览器中格式为2016/05/31 08:00
	time = time.replace(/\-/g, "/");// eslint-disable-line
	let newDate = time !== '' ? new Date(time) : new Date();
	const year: number = newDate.getFullYear();
	let month: number = newDate.getMonth() + 1;
	let day: number = newDate.getDate();
	let hour: number = newDate.getHours();
	let minute: number = newDate.getMinutes();
	let defaultParam: defaultParam = {
		year: year,
		month: month,
		day: day,
		hour: hour,
		minute: minute,
		//
		yearLabel: year.toString(),
		monthLabel: month < 10 ? `0${month}` : month.toString(),
		dayLabel: day < 10 ? `0${day}` : day.toString(),
		hourLabel: hour < 10 ? `0${hour}` : hour.toString(),
		minuteLabel: minute < 10 ? `0${minute}` : minute.toString(),
		value: `${year}-${month}-${day} ${hour}:${minute}`,
		timeStamp: newDate.getTime(),
	};
	return defaultParam;
}
