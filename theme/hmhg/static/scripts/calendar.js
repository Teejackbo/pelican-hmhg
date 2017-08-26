var day                 //current day
var month;              //current month
var year;               //current year
var doom = 1;           //day of 29th Feb 2000
var monthStarts = [4,6,1,4,6,2,4,0,3,5,1,3];    //1st day of a month wrt the doomsday of that year (JAN + FEB need adjustment on leap years)
var monthLengths = [31,28,31,30,31,30,31,31,30,31,30,31];   //length of each month in standard year
var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]   //pretty self explanatory

var getDay = function() {   //Gets current day
  var today = new Date();
  day = today.getDate();
  month = today.getMonth();
  year = today.getFullYear();
}

var isLeapYear = function(y) {   //returns true if leapyear, false if not
  if (y % 4 === 0) {
    if (y % 100 === 0) {
      if (y % 400 === 0) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  } else {
    return false;
  }
}

var Doomsday = function(y) {   //finds doomsday of a given year
  y = y - 2000;
  var q =  Math.floor(y/12);
  var r = y % 12;
  return ((doom + q + r + Math.floor(r/4)) % 7);
}

var getCalMonth = function(m, y) {    //Returns calendar month html string (from monday before to sunday after)
  var calArray = [];

  var curDoom = Doomsday(y);                                //current year doomsday
  var curMonthLength = monthLengths[m];                     //length of current month
  var prevMonthLength = monthLengths[(m+11)%12];                  //length of previous month
  var firstOfMonth = (curDoom + monthStarts[m]) % 7;        //day of week of first day of month

  if (isLeapYear(y)) {
    if (m === 0 || m === 1) {              //adjusts days for leap years
      firstOfMonth = (firstOfMonth + 1) % 7;
      if (m === 1) {
        curMonthLength += 1;
      }
    } if (m === 2) {
      prevMonthLength += 1;
    }
  }

  var lastOfMonth = (firstOfMonth + curMonthLength - 1) % 7;   //day of week of last day of month

  for (i = firstOfMonth; i > 0; i--) {
    calArray.push(prevMonthLength-i+1);
  }
  for (i = 1; i <= curMonthLength; i++) {
    calArray.push(i);
  }
  for (i = 1; i < 7-lastOfMonth; i++) {
    calArray.push(i);
  }


  var string = "";
  for (i = 0; i < calArray.length; i++) {
    if (i % 7 === 0) {
      string += "<div class='row'>\r";
    }
    string += "<div class='col14";
    if ((i < firstOfMonth) || (i >=firstOfMonth + curMonthLength) ) {
      string += " not-month";
    }
    if ((i - firstOfMonth + 1 === day) && (m === month) && (y == year)) {
      string += " today";
    }
    string += ("'>\r\t<h3>" + String(calArray[i]) + "</h3>\r</div>\r");
    if (i % 7 === 6)  {
      string += "</div>\r";
    }
  }
  return string;
}

$(document).ready(function() {
  getDay();
  var calString = getCalMonth(month, year);
  var curMonth = month;
  var curYear = year;
  $(".cal-month-container").html(calString);
  $(".cal-label").html(monthNames[month] + ' ' + String(year));

  $(".cal-left").click(function() {
    if ($(".month-view").hasClass("cal-selected")) {
      curMonth = (curMonth + 11) % 12;
      if (curMonth === 11) {
        curYear -= 1;
      }

      calString = getCalMonth(curMonth, curYear);
      $(".cal-month-container").html(calString);
      $(".cal-label").html(monthNames[curMonth] + ' ' + String(curYear));

    } else {
      curYear -= 1;
      $(".cal-label").html(String(curYear));
      if (curYear === year) {
        $("." + monthNames[month] + " .cal-year-head").css("background-color", "#236323");
      } else {
        $("." + monthNames[month] + " .cal-year-head").css("background-color", "#42af41");
      }
    }
  });

  $(".cal-right").click(function() {
    if ($(".month-view").hasClass("cal-selected")) {
      curMonth = (curMonth + 1) % 12;
      if (curMonth === 0) {
        curYear += 1;
      }

      calString = getCalMonth(curMonth, curYear);
      $(".cal-month-container").html(calString);
      $(".cal-label").html(monthNames[curMonth] + ' ' + String(curYear));

    } else {
      curYear += 1;
      $(".cal-label").html(String(curYear));
      if (curYear === year) {
        $("." + monthNames[month] + " .cal-year-head").css("background-color", "#236323");
      } else {
        $("." + monthNames[month] + " .cal-year-head").css("background-color", "#42af41");
      }
    }
  });

  $(".month-view").click(function() {
    $(".cal-selected").removeClass("cal-selected");
    $(".month-view").addClass("cal-selected");
    $(".cal-year-container").hide();
    if (curYear!==year) {
      curMonth = 0;
    } else {
      curMonth = month;
    }
    calString = getCalMonth(curMonth, curYear);
    $(".cal-month-container").html(calString);
    $(".cal-header").show();
    $(".cal-month-container").show();
    $(".cal-label").html(monthNames[curMonth] + ' ' + String(curYear));
  });

  $(".year-view").click(function() {
    $(".cal-selected").removeClass("cal-selected");
    $(".year-view").addClass("cal-selected");
    $(".cal-month-container").hide();
    $(".cal-header").hide();
    $(".cal-year-container").show();
    $(".cal-label").html(String(curYear));

    if (curYear === year) {
      $("." + monthNames[month] + " .cal-year-head").css("background-color", "#236323");
    }
  });

  $(".cal-year-head").click(function() {
    curMonth = monthNames.indexOf($(this).text());
    calString = getCalMonth(curMonth, curYear);
    $(".cal-month-container").html(calString);

    $(".year-view").removeClass("cal-selected");
    $(".month-view").addClass("cal-selected");
    $(".cal-year-container").hide();
    $(".cal-header").show();
    $(".cal-month-container").show();
    $(".cal-label").html(monthNames[curMonth] + ' ' + String(curYear));
  });
});
