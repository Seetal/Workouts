import { Config } from "../../config/Config";
import { IntervalType } from "../../types/IntervalType";

export const generateTimingArray = (currentInterval: IntervalType) => {
    const generateCurveDistance = (time: number) => {
        const degrees = 980.1769 / time;
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
            currentCurve: 980.1769
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
                currentCurve: 980.1769
            });
            if(j != currentInterval.rounds - 1) {
                timingArray.push({
                    name: 'Rest',
                    time: currentInterval.rest,
                    currentTime: currentInterval.rest,
                    round: j + 1,
                    set: i + 1,
                    curve: generateCurveDistance(currentInterval.rest),
                    currentCurve: 980.1769
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
                currentCurve: 980.1769
            });
        } else {
            timingArray.push({
                name: 'Break',
                time: Config.setRestTime,
                currentTime: Config.setRestTime,
                round: currentInterval.rounds,
                set: i + 1,
                curve: generateCurveDistance(Config.setRestTime),
                currentCurve: 980.1769
            });
        }
    }
    return timingArray;
}