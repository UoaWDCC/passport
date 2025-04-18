import { ReactElement, useEffect, useState } from "react";
import { useSwipeable } from "react-swipeable";
import PassportMain from "@components/PassportMain";
import PassportPage from "@components/PassportPage";
import HamburgerMenu from "@components/HamburgerMenu";
import "../styles/page styles/Passport.css";
import CheckLoggedIn from "@components/CheckLoggedIn.tsx";
import GetLeaderboardStats from "@components/LeaderboardStats.tsx";
import axios from "axios";
import PopUpNotif from "@components/PopUpNotif";
import ErrorPage from "@pages/DesktopErrorPage.tsx";
import updateStampValues from "@components/GetTotalStamps";

type PageComponent = React.ComponentType<any> | (() => ReactElement);

export default function Passport() {
    const userData = GetLeaderboardStats();

    // initialise index and loading state
    const [currentIndex, setCurrentIndex] = useState(0);
    const [events, setEvents] = useState([]);
    const [userStamps, setUserStamps] = useState<any[]>([]);
    const [loading, setLoading] = useState(true); // Add loading state
    const [isPopUpVisible, setIsPopUpVisible] = useState(true);
    const [isMobile, setIsMobile] = useState(true);

    // chceck if user on mobile
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768); // Adjust the width threshold as needed
        };

        handleResize(); // Set initial value
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    //getting all events
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                await axios
                    .get(
                        `${
                            import.meta.env.VITE_SERVER_URL
                        }/api/event/get-all-events`
                    )
                    .then((res) => {
                        setEvents(res.data);
                    });
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };

        fetchEvents();

        //tracking session - showing popUpNotif once a session :)
        if (sessionStorage.getItem("sameSession")) {
            setIsPopUpVisible(false);
        }

        const updateStamps = async () => {
            await updateStampValues(localStorage.getItem("accessToken"));
        };

        updateStamps();
    }, []);

    //getting all stamps that user has collected
    useEffect(() => {
        const fetchStamps = async () => {
            if (events.length > 0 && userData.eventList?.length > 0) {
                const stamps = userData.eventList.map((eventId) =>
                    events.find((event) => (event as any)._id === eventId)
                );
                setUserStamps(stamps);
            }
            setLoading(false); // Set loading to false once the data is fetched
        };

        fetchStamps();
    }, [events, userData.eventList]);

    // generate PassportPage components based on number of userStamps
    function generatePassportPages(): PageComponent[] {
        const pages: PageComponent[] = [];
        const pageSize = 4;

        for (let i = 0; i < userStamps.length; i += pageSize) {
            const pageStamps = userStamps.slice(i, i + pageSize);
            pages.push(() => <PassportPage key={i} stamps={pageStamps} />);
        }

        return pages;
    }

    // initialise temporary page array
    const views: PageComponent[] = [PassportMain, ...generatePassportPages()];

    // function to switch to next page
    const goToNextView = () => {
        if (currentIndex < views.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    // function to switch to previous page
    const goToPreviousView = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    // retrieves the page component from the array
    const CurrentView: PageComponent = views[currentIndex];

    // handlers for swiping
    const swipeHandlers = useSwipeable({
        onSwipedLeft: goToNextView,
        onSwipedRight: goToPreviousView,
    });

    if (loading) {
        return (
            <div
                className="background flex flex-col h-svh justify-center items-center"
                style={{ backgroundColor: "#e1ebff" }}
            ></div>
        );
    }

    if (!isMobile) {
        return <ErrorPage />;
    }

    return (
        <CheckLoggedIn>
            <div
                {...swipeHandlers}
                className="background flex flex-col h-svh justify-center items-center "
            >
                <HamburgerMenu />
                <div className="flex items-start w-88">
                    <div className="pt-3 text-left flex item-start">
                        <h1 className="text-2xl text-blue-950">
                            <span className="italic">Welcome</span>{" "}
                            <span className="font-semibold">
                                {userData.firstName}
                            </span>
                        </h1>
                    </div>
                </div>
                <div>
                    <div className="border-b-4 welcome-line w-88 mb-1 mt-3"></div>
                    <div className="text-center text-blue-950">
                        <span className="text-4xl font-semibold">
                            {userData.eventList.length}
                        </span>{" "}
                        <span className="text-xl">
                            {userData.totalStamps === 1
                                ? "Stamp Collected"
                                : "Stamps Collected"}
                        </span>
                    </div>
                    <div className="border-b-4 welcome-line w-88 mb-4 mt-1"></div>
                </div>
                {isPopUpVisible && <PopUpNotif events={events} />}
                {typeof CurrentView === "function" ? (
                    <CurrentView />
                ) : (
                    CurrentView
                )}
                <p>Page {currentIndex + 1}</p>
            </div>
        </CheckLoggedIn>
    );
}
