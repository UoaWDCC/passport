const checkEventStatus = async (eventId: string) => {
    try {
        const response = await fetch(
            `${import.meta.env.VITE_SERVER_URL}/api/check-event-status/${eventId}`,
            {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            }
        );
        console.log("Response:", response);
        if (!response.ok) {
            throw new Error("Failed to fetch event status");
        }

        const data = await response.json();

        if (data.error === "none") {
            console.log("Event is active:", data.result);
            return data.result; // This will return the event details with the status true
        } else {
            console.log("Event is not active or not found:", data.error);
            return { status: false, error: data.error };
        }
    } catch (error) {
        console.error("Error fetching event status:", error);
        return { status: false, error: "An error occurred while checking the event status." };
    }
};

export default checkEventStatus;
