/*
 * @Description:
 * @Author: 刘强
 * @Date: 2021-12-22 16:11:50
 * @LastEditTime: 2022-05-30 17:56:51
 * @LastEditors: 韩旭小天才 905583741@qq.com
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
	second:number;
	//
	yearLabel: string;
	monthLabel: string;
	dayLabel: string;
	hourLabel: string;
	minuteLabel: string;
	secondLabel:string;
	value: string;
	timeStamp: number;
};

// 获取当前值
export function getNewParams(time: string) {
	//兼容ios,ios浏览器中格式为2016/05/31 08:00
	time = time.replace(/\-/g, "/");// eslint-disable-line
	let newDate = time !== '' ? new Date(time) : new Date(`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()} 00:00:00`);
	console.log(newDate,44444)
	const year: number = newDate.getFullYear();
	let month: number = newDate.getMonth() + 1;
	let day: number = newDate.getDate();
	let hour: number = newDate.getHours();
	let minute: number = newDate.getMinutes();
	let second: number = newDate.getSeconds()
	let defaultParam: defaultParam = {
		year: year,
		month: month,
		day: day,
		hour: hour,
		minute: minute,
		second:second,
		//
		yearLabel: year.toString(),
		monthLabel: month < 10 ? `0${month}` : month.toString(),
		dayLabel: day < 10 ? `0${day}` : day.toString(),
		hourLabel: hour < 10 ? `0${hour}` : hour.toString(),
		minuteLabel: minute < 10 ? `0${minute}` : minute.toString(),
		secondLabel:second < 10 ? `0${second}` : second.toString(),
		value: `${year}-${month}-${day} ${hour}:${minute}`,
		timeStamp: newDate.getTime(),
	};
	return defaultParam;
}
export function getYMDHMS (timestamp:any) {

　　let time: any  = new Date(timestamp)
　　let year: number|string  = time.getFullYear()
　　let month: number|string  = time.getMonth() + 1
　　let date: number|string  = time.getDate()
　　let hours: number|string  = time.getHours()
　　let minute: number|string  = time.getMinutes()
　　let second: number|string  = time.getSeconds()

　　if (month < 10) { month = '0' + month }
　　if (date < 10) { date = '0' + date }
　　if (hours < 10) { hours = '0' + hours }
　　if (minute < 10) { minute = '0' + minute }
　　if (second < 10) { second = '0' + second }
　　return year + '-' + month + '-' + date + ' ' + hours + ':' + minute + ':' + second
}