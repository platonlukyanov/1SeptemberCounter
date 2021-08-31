function getDelta(timestring) {
    var now = new Date();
    var targetTime = new Date(timestring);
    var delta = (targetTime.getTime() - now.getTime());
    return delta / 1000 - 10800;
}
var months_counter = document.getElementById('months-counter'), weeks_counter = document.getElementById('weeks-counter'), days_counter = document.getElementById('days-counter'), hours_counter = document.getElementById('hours-counter'), minutes_counter = document.getElementById('minutes-counter'), seconds_counter = document.getElementById('seconds-counter');
function getTime(timestring) {
    var delta = getDelta(timestring ? timestring : null), seconds = delta, minutes = seconds / 60, hours = minutes / 60, days = hours / 24, weeks = days / 7, months = days / 30;
    return { delta: delta, seconds: seconds, minutes: minutes, hours: hours, days: days, weeks: weeks, months: months };
}
var cycle_function = function (timestring) {
    var _a = getTime(timestring), seconds = _a.seconds, minutes = _a.minutes, hours = _a.hours, days = _a.days, weeks = _a.weeks, months = _a.months;
    months_counter.innerText = Math.round(months).toLocaleString();
    weeks_counter.innerText = Math.round(weeks).toLocaleString();
    days_counter.innerText = Math.round(days).toLocaleString();
    hours_counter.innerText = Math.round(hours).toLocaleString();
    minutes_counter.innerText = Math.round(minutes).toLocaleString();
    seconds_counter.innerText = Math.round(seconds).toLocaleString();
};
var FirstSeptemberTimerStarter = function () {
    var firstSeptember = function () { return cycle_function('2021-09-01'); };
    var interval = setInterval(firstSeptember, 1000);
    firstSeptember();
    return function () {
        clearInterval(interval);
    };
};
var LearnEndTimerStarter = function () {
    var learnEnd = function () { return cycle_function('2022-05-25'); };
    var interval = setInterval(learnEnd, 1000);
    learnEnd();
    document.querySelector('.site-title').textContent = "Конец учебного года";
    document.body.style.background = "url('pictures/4.jpg')";
    document.body.style.color = "black";
    var lines = document.querySelectorAll(".line");
    lines.forEach(function (element) {
        element.style.background = "black";
        element.style.color = "white";
        element.style.opacity = "0.7";
    });
    return function () {
        clearInterval(interval);
    };
};
var clearFunction = function () { return null; };
var currentDate = new Date();
if (getDelta('2021-09-01') > 0) {
    clearFunction = FirstSeptemberTimerStarter();
}
else if (getDelta('2022-05-25') > 0) {
    clearFunction = LearnEndTimerStarter();
}
var checkUpdates = function () {
    if (getDelta('2021-09-01') < 0) {
        clearFunction();
        if (getDelta('2022-05-25') > 0 && getDelta('2021-09-01') < 0) {
            clearFunction = LearnEndTimerStarter();
        }
    }
};
setInterval(checkUpdates, 1000);
