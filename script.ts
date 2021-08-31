interface ITimeInfo {
    delta: number,
    seconds: number, 
    minutes: number,
    hours: number,
    days: number, 
    weeks: number,
    months: number
}

function getDelta(timestring): number {
    const now: Date = new Date();
    const targetTime: Date = new Date(timestring);
    const delta: number = (targetTime.getTime() - now.getTime());
    return delta / 1000 - 10800;
}

const months_counter: HTMLElement = document.getElementById('months-counter'),
      weeks_counter: HTMLElement = document.getElementById('weeks-counter'),
      days_counter: HTMLElement = document.getElementById('days-counter'),
      hours_counter: HTMLElement = document.getElementById('hours-counter'),
      minutes_counter: HTMLElement = document.getElementById('minutes-counter'),
      seconds_counter: HTMLElement = document.getElementById('seconds-counter');

function getTime(timestring: string): ITimeInfo {
    const delta: number = getDelta(timestring ? timestring : null),
          seconds: number = delta,
          minutes: number = seconds / 60,
          hours: number = minutes / 60,
          days: number = hours / 24,
          weeks: number = days / 7,
          months: number = days / 30;
    return {delta, seconds, minutes, hours, days, weeks, months}
}

const cycle_function = (timestring: string): void => {
    const {seconds, minutes, hours, days, weeks, months} = getTime(timestring);
    months_counter.innerText = Math.round(months).toLocaleString();
    weeks_counter.innerText = Math.round(weeks).toLocaleString();
    days_counter.innerText = Math.round(days).toLocaleString();
    hours_counter.innerText = Math.round(hours).toLocaleString();
    minutes_counter.innerText = Math.round(minutes).toLocaleString();
    seconds_counter.innerText = Math.round(seconds).toLocaleString();
}

type TimerStarter = () => () => void

const FirstSeptemberTimerStarter: TimerStarter = () => {
    const firstSeptember = () => cycle_function('2021-09-01');
    const interval = setInterval(firstSeptember, 1000);

    firstSeptember()
    return () => {
        clearInterval(interval)
    }
}

const LearnEndTimerStarter: TimerStarter = () => {
    const learnEnd = () => cycle_function('2022-05-25');
    const interval = setInterval(learnEnd, 1000);

    learnEnd()
    document.querySelector('.site-title').textContent = "Конец учебного года"

    document.body.style.background = "url('pictures/4.jpg')";
    document.body.style.color = "black";
    const lines: NodeListOf<HTMLElement> = document.querySelectorAll(".line");
    lines.forEach(element => {
        element.style.background = "black";
        element.style.color = "white";
        element.style.opacity = "0.7";
    });


    return () => {
        clearInterval(interval)
    }
}
let clearFunction: () => void = () => null;
const currentDate: Date = new Date();

if (getDelta('2021-09-01') > 0) {
    clearFunction = FirstSeptemberTimerStarter()
}
else if (getDelta('2022-05-25') > 0) {
    clearFunction = LearnEndTimerStarter()
}

const checkUpdates = () => {
    if (getDelta('2021-09-01') < 0) {
        clearFunction()
        if (getDelta('2022-05-25') > 0 && getDelta('2021-09-01') < 0) {
            clearFunction = LearnEndTimerStarter()
        }
        
    }
}
setInterval(checkUpdates, 1000)

