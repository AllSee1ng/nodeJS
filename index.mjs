"use strict";

import process from "process";
import EventEmitter from "events";
import { intervalToDuration, formatDuration, isEqual, isPast } from "date-fns";

const log = console.log;
const emitter = new EventEmitter();

const getIntroducedDate = (date) => {
    const [year, month, day, hours, minutes, seconds] = date.split("-");
    return new Date(+year, +month - 1, +day, +hours, +minutes, +seconds, 0); //месяцы от 0 до 11, поэтому -1, и 0 миллисекунд
};

const timeDiff = (date) => {
    const interval = formatDuration(
        intervalToDuration({
            start: new Date(date),
            end: new Date(),
        })
    );
    return log(interval);
};

const timer = () => {
    const currentTime = new Date();
    currentTime.setMilliseconds(0);
    const deadline = new Date(currentTime);

    if (isEqual(new Date(deadline), new Date(introducedDate))) {
        log("DONE");
        emitter.removeListener("timer", timer);
        process.exit(1);
    } else {
        console.clear();
        timeDiff(introducedDate);
    }
};

emitter.on("timer", timer);

const introducedDate = getIntroducedDate(process.argv[2]); // год-месяц-день-часы-минуты-секунды

if (isPast(introducedDate)) {
    //минимальная валидация
    log("Вы ввели дату из прошлого");
} else {
    setInterval(() => {
        emitter.emit("timer");
    }, 1000);
}
