function reversedStr(str) {
    var myStr = str.split('').reverse('').join('');
    return myStr;
  }
  
  function booleanPalindrome(str) {
    return str === reversedStr(str);
  }

  function dateNumberToString(date) {
    var myDate = { day: '', month: '', year: '' };
  
    if (date.day < 10) {
      myDate.day = '0' + date.day;
    } else {
      myDate.day = date.day.toString();
    }
  
    if (date.month < 10) {
      myDate.month = '0' + date.month;
    } else {
      myDate.month = date.month.toString();
    }
  
    myDate.year = date.year.toString();
  
    return myDate;
  }

  function allDateFormats(date) {
    var dateStr = dateNumberToString(date);
  
    var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
  
    var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;
  
    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
  }
   
  function checkPalindromeForAllDate(date) {
    var listOfDateFormats = allDateFormats(date);
  
    var flag = false;
  
    for (let i = 0; i < listOfDateFormats.length; i++) {
      if (booleanPalindrome(listOfDateFormats[i])) {
        flag = true;
        break;
      }
    }
    return flag;
  }

  function isLeapYear(year) {
    if (year % 400 === 0) {
      return true;
    }
    if (year % 100 === 0) {
      return false;
    }
    if (year % 4 === 0) {
      return true;
    }
    return false
  }
  
  function getNextDay(date) {
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;
  
    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  
    if (month === 2) {
      if (isLeapYear(year)) {
        if (day > 29) {
          day = 1;
          month++
        }
      } else {
        if (day > 28) {
          day = 1;
          month++;
        }
      }
  
    }
    else {
      if (daysInMonth[month - 1]) {
        day = 1
        month++;
      }
    }
    if (month > 12) {
      day = 1;
      month = 1;
      year++
    }
    return {
      day: day,
      month: month,
      year: year
    }
  }

  function getNextPalindromeDate(date) {
    var counter = 0;
    var nextDate = getNextDay(date)
    while (1) {
      counter++;
      var isPalindrome = checkPalindromeForAllDate(nextDate);
      if (isPalindrome) {
        break;
      }
      nextDate = getNextDay(nextDate);
    }
    return [counter, nextDate]
  }

var dobInput = document.querySelector("#input-dob");
var btnCheck =  document.querySelector("#button-check");

var outputDiv = document.querySelector("#output");


function clickEventHandler()
{  var newDateIp = dobInput.value;

    if (newDateIp !== '') {
      var dateObject = newDateIp.split('-');
  
      var date = {
        day: Number(dateObject[2]),
        month: Number(dateObject[1]),
        year: Number(dateObject[0])
      }
      var palindrome = checkPalindromeForAllDate(date)
      if (palindrome) {
        outputDiv.innerText = "yes! Your birthday is palindrome!";
      } else {
        var [counter, nextDate] = getNextPalindromeDate(date)
        outputDiv.innerText = `The next palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed by ${counter} days.`
      }
  
    }
}


btnCheck.addEventListener("click",clickEventHandler);