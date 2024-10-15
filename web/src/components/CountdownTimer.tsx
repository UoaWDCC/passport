import React, { useState, useEffect } from "react";

interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

// Countdown Timer Component
const CountdownTimer: React.FC<{ targetDate: string }> = ({ targetDate }) => {
    const calculateTimeLeft = (): TimeLeft => {
        const difference = +new Date(targetDate) - +new Date();
        let timeLeft: TimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / (1000 * 60)) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }
        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, [targetDate]);

    return (
        <div className="flex justify-center space-x-4 mt-2">
            <TimeBox value={timeLeft.days} label="Days" />
            <TimeBox value={timeLeft.hours} label="Hours" />
            <TimeBox value={timeLeft.minutes} label="Minutes" />
        </div>
    );
};

interface TimeBoxProps {
    value: number;
    label: string;
}

const TimeBox: React.FC<TimeBoxProps> = ({ value, label }) => {
    return (
        <div className="flex flex-col items-center">
            <div className="w-20 h-20 bg-blue-500 text-yellow-500 text-3xl font-bold flex items-center justify-center rounded-md border-4 border-blue-800">
                {value < 10 ? `0${value}` : value}
            </div>
            <span className="text-white text-lg mt-2">{label}</span>
        </div>
    );
};

export default CountdownTimer;
