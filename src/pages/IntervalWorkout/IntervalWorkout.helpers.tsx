import { Config } from "../../config/Config";
import { IntervalType } from "../../types/IntervalType";

export const generateTimingArray = (currentInterval: IntervalType) => {
    const generateCurveDistance = (time: number) => {
        const degrees = Config.timerCircumference / time;
        return degrees;
    }
    const timingArray = [
        {
            name: 'Get Ready',
            time: Config.getReadyTime,
            currentTime: Config.getReadyTime,
            round: 0,
            set: 0,
            curve: generateCurveDistance(Config.getReadyTime),
            currentCurve: Config.timerCircumference
        }
    ];
    for (let i = 0; i < currentInterval.sets; i++) {
        for(let j = 0; j < currentInterval!.rounds; j++) {
            timingArray.push({
                name: 'Work',
                time: currentInterval.work,
                currentTime: currentInterval.work, 
                round: j + 1,
                set: i + 1,
                curve: generateCurveDistance(currentInterval.work),
                currentCurve: Config.timerCircumference
            });
            if(j != currentInterval.rounds - 1) {
                timingArray.push({
                    name: 'Rest',
                    time: currentInterval.rest,
                    currentTime: currentInterval.rest,
                    round: j + 1,
                    set: i + 1,
                    curve: generateCurveDistance(currentInterval.rest),
                    currentCurve: Config.timerCircumference
                });
            }
        }
        if(i === currentInterval.sets - 1) {
            timingArray.push({
                name: 'Cooldown',
                time: Config.coolDownTime,
                currentTime: Config.coolDownTime,
                round: currentInterval.rounds,
                set: i + 1,
                curve: generateCurveDistance(Config.coolDownTime),
                currentCurve: Config.timerCircumference
            });
        } else {
            timingArray.push({
                name: 'Break',
                time: Config.setRestTime,
                currentTime: Config.setRestTime,
                round: currentInterval.rounds,
                set: i + 1,
                curve: generateCurveDistance(Config.setRestTime),
                currentCurve: Config.timerCircumference
            });
        }
    }
    return timingArray;
}

export const getTimerColor = (intervalName: string) => {
    let timerColor;
    if (intervalName === 'Work') {
        timerColor = { "--timer-color": "var(--clr-green)" } as React.CSSProperties;
    } else if (intervalName === 'Get Ready' || intervalName === 'Rest' || intervalName === 'Break') {
        timerColor = { "--timer-color": "var(--clr-orange)" } as React.CSSProperties;
    } else {
        timerColor = { "--timer-color": "var(--clr-blue)" } as React.CSSProperties;
    }
    return timerColor;
}