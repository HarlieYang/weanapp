
function withData(param){
  return param < 10 ? '0' + param : '' + param;
}

function getLoopArray(start,end){
  var start = start || 0;
  var end = end || 1;
  var array = [];
  for (var i = start; i <= end; i++) {
    array.push(withData(i));
  }
  return array;
}

function getMonthDay(year,month){
  var flag = year % 400 == 0 || (year % 4 == 0 && year % 100 != 0), array = null;

  switch (month) {
    case '01':
    case '03':
    case '05':
    case '07':
    case '08':
    case '10':
    case '12':
      array = getLoopArray(1, 31)
      break;
    case '04':
    case '06':
    case '09':
    case '11':
      array = getLoopArray(1, 30)
      break;
    case '02':
      array = flag ? getLoopArray(1, 29) : getLoopArray(1, 28)
      break;
    default:
      array = '月份格式不正确，请重新输入！'
  }
  return array;
}
function getNewDateArry(minDate = 0, dayDate = 0){
  // //1.获取当前日期
  var newDate = new Date();
  //2. 获取当前分钟
  var min = newDate.getMinutes();
  //3. 设置当前时间+5分钟：把当前分钟数+5后的值重新设置为date对象的分钟数
  newDate.setMinutes(min + minDate);
    //3. 设置当前时间+1天：把当前分钟数+5后的值重新设置为date对象的分钟数
  var day = newDate.getDate();
  newDate.setDate(day + dayDate);

  var year = withData(newDate.getFullYear()),
      mont = withData(newDate.getMonth() + 1),
      date = withData(newDate.getDate()),
      hour = withData(newDate.getHours()),
      minu = withData(newDate.getMinutes()),
      seco = withData(newDate.getSeconds());
  return [year, mont, date, hour, minu, seco];
}

function dateTimePicker(startYear,endYear,type="",date) {
  // 返回默认显示的数组和联动数组的声明
  var dateTime = [], dateTimeArray = [[],[],[],[],[],[]];
  var start = startYear || 1978;
  var end = endYear || 2100;
  // 默认开始显示数据
  var defaultDate 
  if(date){
    defaultDate = [...date.split(' ')[0].split('-'), ...date.split(' ')[1].split(':')] 
  } else if(type == 'start') {
    defaultDate = getNewDateArry(15)
  } else if(type == 'end'){
    defaultDate = getNewDateArry(15,1)
  } else {
    defaultDate = getNewDateArry()
  }
  
  // return
  // 处理联动列表数据
  /*年月日 时分秒*/
  dateTimeArray[0] = getLoopArray(start,end);
  dateTimeArray[1] = getLoopArray(1, 12);
  dateTimeArray[2] = getMonthDay(defaultDate[0], defaultDate[1]);
  dateTimeArray[3] = getLoopArray(0, 23);
  dateTimeArray[4] = getLoopArray(0, 59);
  dateTimeArray[5] = getLoopArray(0, 59);

  dateTimeArray.forEach((current,index) => {
    dateTime.push(current.indexOf(defaultDate[index]));
  });
  return {
    dateTimeArray: dateTimeArray,
    dateTime: dateTime
  }
}
export {
  dateTimePicker,
  getMonthDay
}