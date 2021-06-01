function get_delta() {
    var now = new Date();
    var first_of_september = new Date('2021-09-01');
    var delta = first_of_september - now;
    return delta / 1000;
}

var months_counter = document.getElementById('months-counter');
var weeks_counter = document.getElementById('weeks-counter');
var days_counter = document.getElementById('days-counter');
var hours_counter = document.getElementById('hours-counter');
var minutes_counter = document.getElementById('minutes-counter');
var seconds_counter = document.getElementById('seconds-counter');

var cycle_function = ()=> {
    var delta = get_delta();
    var seconds = delta;
    var minutes = seconds / 60;
    var hours = minutes / 60;
    var days = hours / 24;
    var weeks = days / 7;
    var months = days / 30;


    months_counter.innerText = Math.round(months);
    weeks_counter.innerText = Math.round(weeks);
    days_counter.innerText = Math.round(days);
    hours_counter.innerText = Math.round(hours);
    minutes_counter.innerText = Math.round(minutes);
    seconds_counter.innerText = Math.round(seconds);
}

cycle_function();
setInterval(cycle_function, 1000);
