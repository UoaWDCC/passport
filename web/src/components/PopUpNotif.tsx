import { useState, useEffect } from 'react';

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

        // sortig events 
        const sortedEvents = upcomingEvents.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()); 
        return sortedEvents[0] || null; 
    };

    // currently showing popup when we find an even in the next 7 days
    // needa implement something that shows the popup maybe once a session or sumn 
    useEffect(() => {
        const upcomingEvent = getNextEvent(events);
        setNextEvent(upcomingEvent);
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
                        
                        <div className="flex flex-col items-center">
                            <p className="text-white text-center text-lg ">The next event: </p>
                            <p className="text-white text-center text-6xl font-semibold">{nextEvent.eventName}</p>
                            <p className="text-white text-center text-lg italic"
                                style={{color: "#FED066"}}
                            >
                                [DESCRIPTION]
                            </p>
                            

                            <p className="text-white text-center text-lg mt-2">Starts in: </p>
                            <p className="text-white text-center text-lg mt-2">[TIMER]</p>
                            {/* <p className="text-white text-center text-lg mt-2"> {new Date(nextEvent.startDate).toLocaleString()}</p> */}

                            <p className="text-white text-center text-lg mt-1">at:</p>
                            <p className="text-white text-center text-lg mt-1 italic"
                                style={{color: "#FED066"}}
                            >
                                [LOCATION]
                            </p>
                        </div>

                    </div>
                </div>
            )}
        </>
    );
}
