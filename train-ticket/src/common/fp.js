// 获取当天0时0分0秒的时间
export function h0(timestamp = Date.now()) {
    const target = new Date(timestamp);
    // 将时、分、秒、毫秒全设置成0
    target.setHours(0);
    target.setMinutes(0);
    target.setSeconds(0);
    target.setMilliseconds(0);

    return target.getTime();
}