import { useState, useEffect } from 'react';
import CountdownTimer from './CountdownTimer';

type PopUpNotifProps = {
    events: any[];
};

export default function PopUpNotif({ events }: PopUpNotifProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [nextEvent, setNextEvent] = useState<any>(null);

    // the next event in the next 7 days
    const getNextEvent = (events: any[]) => {
        const now = new Date();

        const upcomingEvents = events.filter(event => {
            const startTime = new Date(event.startDate);
            return startTime >= now && startTime <= new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
        });

        // sorting events 
        const sortedEvents = upcomingEvents.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
        return sortedEvents[0] || null;
    };

    // currently showing popup when we find an even in the next 7 days
    // needa implement something that shows the popup maybe once a session or sumn 
    useEffect(() => {
        const upcomingEvent = getNextEvent(events);
        setNextEvent(upcomingEvent);
        // console.log(upcomingEvent);
        if (upcomingEvent) {
            setIsOpen(true);
        }
    }, [events]);

    const closePopup = () => {
        setIsOpen(false);
    };

    return (
        <>
            {isOpen && nextEvent && (
                <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm">
                    <div className="relative rounded-3xl p-6 flex flex-col items-center"
                        style={{
                            backgroundColor: "#087DF1",
                            width: '80%',
                            maxWidth: '600px',
                            minWidth: '300px',
                            height: 'auto',
                        }}>

                        {/* close button */}
                        <button
                            className="absolute top-3 right-4 text-white text-3xl"
                            onClick={closePopup}
                        >
                            &times;
                        </button>

                        <div className="flex flex-col justify-between items-center">
                            {/* Event Name and Description */}
                            <div>
                                <p className="text-white text-center text-2xl">The next event:</p>
                                <p className="text-white text-center text-5xl font-semibold ">
                                    {nextEvent?.eventName || "Stay Tuned!"}
                                </p>
                                <p className="text-white text-center text-lg italic mt-3" style={{ color: "#FED066" }}>
                                    {nextEvent?.eventDescription || "Stay tuned for more information!!"}
                                </p>
                            </div>

                            <div className='mt-5'>
                                {/* Countdown Timer */}
                                <p className="text-white text-center text-2xl">Starts in:</p>
                                {nextEvent?.startDate && <CountdownTimer targetDate={nextEvent.startDate} />}
                            </div>

                            <div className='mt-5'>
                                {/* Location of event */}
                                <p className="text-white text-center text-2xl">at:</p>
                                <p className="text-white text-center text-lg italic" style={{ color: "#FED066" }}>
                                    {nextEvent?.eventVenue || "To be announced!"}
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            )}
        </>
    );
}
