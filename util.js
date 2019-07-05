/**
 * 把Date转化为数组
 */
function formatTimeArray(date) {
  let year = date.getFullYear()
  let month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
  // const month = date.getMonth()
  let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  return [year, month, day]
}

/**
 * 数组形式的date:year-month-day是否已经超过当前时间
 * true 超过了当前时间 
 */
function compareNowTime(date) {
  if (new Date() < new Date(date))
    return false;
  return true;
}

/**
 * startDate:比较开始时间 endDate:结束时间
 * end>=start  end<now
 */
function compareTime(startDate, endDate) {
  if (!compareNowTime(startDate) || !compareNowTime(endDate))
    return false;
  if (new Date(startDate) > new Date(endDate))
    return false;
  return true;
}

/**
 * 是否间距大于intervalTime 毫秒级别
 * true 代表不超过
 */
function exceedTime(startDate, endDate, intervalTime) {
  let start = new Date(startDate);
  let end = new Date(endDate);
  let now = new Date();
  if ((now < new Date(start)) || (now < new Date(end)))
    return false;
  //间隔大于多久
  if ((start > end) || ((end.getTime() - start.getTime()) > intervalTime)) {
    return false;
  }
  return true;
}

/**
 * 转化为非null的串
 * @param content 
 *
 * @return content
 */
function notNullValue(content) {
  if (content == null || content.length == 0 || content == 'null')
    return "";
  else
    return content;
}


/**
 * 是否为null
 * @param content 
 *
 * @return boolean
 */
function isNullValue(content) {
  if (content == null || content.length == 0 || content == 'null')
    return true;
  else
    return false;
}

/**
 * 获取某一天的开始时间戳 精确到秒
 * @param date 2018-06-06
 */
function startTimeDay(date) {
  return (new Date(Date.parse(date.replace(/-/g, "/")))).getTime() / 1000;
}

/**
 * 获取某一天的结束时间戳 精确到秒
 * @param date 2018-06-06
 */
function endTimeDay(date) {
  return new Date().setTime(Date.parse(date.replace(/-/g, "/")) / 1000 + 24 * 60 * 60);
}

module.exports = {
  formatTime: formatTimeArray,
  compareTime: compareTime,
  exceedTime: exceedTime,
  compareNowTime: compareNowTime,
  notNullValue: notNullValue,
  isNullValue: isNullValue,
  showRefreshTime: 10 * 60 * 1000,  //当页面hide-->show,如果超过10分钟刷新数据
  startTimeDay: startTimeDay,
  endTimeDay: endTimeDay
}
