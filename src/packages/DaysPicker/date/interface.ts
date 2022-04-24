/*
 * @Author: your name
 * @Date: 2022-04-24 10:11:23
 * @LastEditTime: 2022-04-24 16:14:52
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /tinkerbell-ui-react/src/packages/DaysPicker/date/interface.ts
 */
//  props 天
export interface dayProps {
    year: number;
    month: number;
    active: number;
    change: Function;
    visible: boolean;
    monthRef: any;
    show: boolean;
    limit: boolean;
}
//  props 月
export interface monthProps {
    visible: boolean;
    active: number;
    change: Function;
    year: number;
    plateChange: Function;
    limit: boolean;
}
//  props 年
export interface yearProps {
    visible: boolean;
    active: number;
    change: Function;
    plateChange: Function;
    limit: boolean;
}

// pageday-item type
export type dayItem = {
    label: string;
    value: number;
    disabled: boolean; //禁用
    prev: boolean; // 是否属于上一月份
    next: boolean; // 是否属于上一月份
    week: number; // 星期下标
    weekLabel: string; // 星期明文
};

// pageMonth-item type
export type monthItem = {
    value: number;
    label: string;
    disabled: boolean;
};

// 年份
export function getYearList(year: number, limit: boolean) {
    let list: Array<monthItem> = [];

    let newYear = new Date().getFullYear();
    let maxYear = year + 9;
    for (let i = year - 3; i < maxYear; i++) {
        list.push({
            value: i,
            label: `${i}`,
            disabled: i < newYear && limit,
        });
    }
    return list;
}

// 月份
export function getMonthList(year: number, limit: boolean) {
    let list: Array<monthItem> = [];
    for (let i = 1; i < 13; i++) {
        list.push({
            value: i,
            label: `${i}月`,
            disabled: checkDisabledMonth(year, i) && limit,
        });
    }
    return list;
}
// 月-禁用判定
function checkDisabledMonth(prevYear: number, prevMonth: number) {
    const prevTime = new Date(`${prevYear}/${prevMonth}/01`).getTime();
    const newDate = new Date();
    const year: number = newDate.getFullYear();
    let month: number = newDate.getMonth() + 1;
    const newTime = new Date(`${year}/${month}/01`).getTime();
    return prevTime < newTime;
}

// 日期对照月份表
const monthAsDay = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; //月份

// 星期列表
export const weekList = ["一", "二", "三", "四", "五", "六", "日"];

// 日-数据列表生成type:0当前月份，1上一月，2下一月
export function getDayList(
    year: number,
    month: number,
    type: number,
    limit: boolean
) {
    let list: Array<dayItem> = [];
    let max: number = year % 4 === 0 && month === 2 ? 1 : 0; // 闰年判定
    max = monthAsDay[month - 1] + max; // 定位月份

    for (let i = 0; i < max; i++) {
        let value = i + 1;
        let weekParam = checkWeek(year, month, value);
        list.push({
            label: value.toString(),
            value: value,
            disabled: checkDisabled(year, month, value) && limit,
            prev: type === 1,
            next: type === 2,
            week: weekParam.value,
            weekLabel: weekParam.label,
        });
    }
    if (type !== 0) {
        return list;
    } else {
        return dayListSupply(list, year, month, limit);
    }
}
// 日-数据按周补充
function dayListSupply(
    arr: Array<dayItem>,
    year: number,
    month: number,
    limit: boolean
) {
    let prevList = getDayList(
        month === 1 ? year - 1 : year,
        month === 1 ? 12 : month - 1,
        1,
        limit
    );
    let nextList = getDayList(
        month === 12 ? year + 1 : year,
        month === 12 ? 1 : month + 1,
        2,
        limit
    );
    // 上月
    for (let i = prevList.length - 1; i > 0; i--) {
        if (prevList[i].week === 7) {
            break;
        }
        arr.unshift(prevList[i]);
    }
    // 下月
    for (let i = 0; i < nextList.length - 1; i++) {
        if (arr.length === 42) {
            break;
        }
        arr.push(nextList[i]);
    }
    return arr;
}

// 日-禁用判定
export function checkDisabled(
    prevYear: number,
    prevMonth: number,
    prevDay: number
) {
    const prevTime = new Date(`${prevYear}/${prevMonth}/${prevDay}`).getTime();
    const newDate = new Date();
    const year: number = newDate.getFullYear();
    let month: number = newDate.getMonth() + 1;
    let day: number = newDate.getDate();
    const newTime = new Date(`${year}/${month}/${day}`).getTime();
    return prevTime < newTime;
}

// 周期-判定星期几
function checkWeek(year: number, month: number, day: number) {
    let weekday = [
        "星期日",
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六",
    ];
    let newDate = new Date(`${year}/${month}/${day}`);
    let mark = newDate.getDay();

    return {
        value: mark === 0 ? 7 : mark,
        label: weekday[mark],
    };
}
