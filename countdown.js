// set the date we're counting down to
var target_date = new Date('Sep, 01, 2016').getTime();

// variables for time units
var days, hours, minutes, seconds;

// get tag element
var countdownDay = document.getElementById('countdownDay');
var countdownHour = document.getElementById('countdownHour');
var countdownMinute = document.getElementById('countdownMinute');
var countdownSecond = document.getElementById('countdownSecond');


// update the tag with id "countdown" every 1 second
setInterval(function() {

    // find the amount of "seconds" between now and target
    var current_date = new Date().getTime();
    var seconds_left = (target_date - current_date) / 1000;

    // do some time calculations
    days = parseInt(seconds_left / 86400);
    seconds_left = seconds_left % 86400;

    hours = parseInt(seconds_left / 3600);
    seconds_left = seconds_left % 3600;

    minutes = parseInt(seconds_left / 60);
    seconds = parseInt(seconds_left % 60);

    // format countdown string + set tag value
    countdownDay.innerHTML = '<span class="days">' + days + '</span>';
    countdownHour.innerHTML = '<span class="hours">' + hours + '</span>';
    countdownMinute.innerHTML = '<span class="minutes">' + minutes + '</span>';
    countdownSecond.innerHTML = '<span class="seconds">' + seconds + '</span>';
}, 1000);