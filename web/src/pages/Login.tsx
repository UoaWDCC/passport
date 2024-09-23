import { TokenResponse, useGoogleLogin } from "@react-oauth/google";
import axios, { AxiosResponse } from "axios";
import { NavigateFunction, useNavigate } from "react-router-dom";
import updateStampValues from "@components/GetTotalStamps";
import checkEventStatus from "@components/event-valid";

interface UserData {
    family_name: string;
    given_name: string;
    email: string;
    accessToken: string;
    UserUPI: string;
}

// Navigate user to correct page
const NavigateUser = (currentPage: string, navigate: Function) => {
    const prevLocation = localStorage.getItem('prevLocation');
    if (prevLocation) {
        localStorage.removeItem('prevLocation');
        navigate(prevLocation); // Takes them back to previous location if they've been logged out
    } else if (currentPage === "/dashboard") {
        navigate('/dashboard/events');
    } else {
        navigate('/passport');
    }
}

// New user to MongoDB
const postUserData = async (data: UserData) => {
    await fetch(`${import.meta.env.VITE_SERVER_URL}/api/user`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
            firstName: data.given_name,
            lastName: data.family_name,
            email: data.email,
            accessToken: data.accessToken,
            upi: data.UserUPI,
        }),
    })
        .then((response) => {
            console.log("New User added!!");
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        });
};

// Updating User in MongoDB
const updateUserData = async (data: UserData) => {
    try {
        const response = await fetch(
            `${import.meta.env.VITE_SERVER_URL}/api/user/` + data.UserUPI,
            {
                method: "PUT",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({
                    firstName: data.given_name,
                    lastName: data.family_name,
                    email: data.email,
                    accessToken: data.accessToken,
                    upi: data.UserUPI,
                }),
            }
        );

        if (!response.ok) {
            throw new Error("Failed to update user data");
        } else {
            console.log("User Data Updated");
        }
    } catch (error) {
        console.error(error);
    }
};

// Passes UPI to WDCC member checker API
const checkUser = async (upi: string): Promise<string | undefined> => {
    try {
        const response = await fetch(
            `https://membership.wdcc.co.nz/api/verify/${
                import.meta.env.VITE_MEMBERSHIP_CHECKER_SECRETS
            }/UPI/${upi}`,
            {
                method: "GET",
            }
        );

        if (!response.ok) {
            throw new Error("Failed to connect to verification API");
        }

        const text = await response.text();
        return text;
    } catch (error) {
        console.error("Error verifying user:", error);
    }
};

const handleResponse = async (response: Response, userInfo: AxiosResponse, tokenResponse:TokenResponse, userUPI:string, eventId:string|undefined, currentPage:string, navigate:NavigateFunction) => {
    try {
        const userData = {
            family_name: userInfo.data.family_name,
            given_name: userInfo.data.given_name,
            email: userInfo.data.email,
            accessToken: tokenResponse.access_token,
            UserUPI: userUPI,
        };
        
        if (response.status === 200) {
            console.log("Updating User Data");
            await updateUserData(userData);
        } else {
            console.log("Posting User Data");
            await postUserData(userData);
        }

        console.log("success");
        localStorage.setItem("accessToken", tokenResponse.access_token);
        console.log(eventId);

        if (eventId !== "sign-in" && eventId !== undefined && eventId !== "dashboard" && eventId !== "") {
            const eventStatus = await checkEventStatus(eventId);
            if (eventStatus.status) {
                await updateStampValues(tokenResponse.access_token);
            } else {
                navigate("/qr-error/" + eventId);
                return;
            }
        }

        NavigateUser(currentPage, navigate);
    } catch (error) {
        console.log(error);
        if (eventId) {
            navigate("/qr-error/" + eventId);
        }
    }
};

// Passes UPI to WDCC member checker API
const useGoogleSignIn = (
    currentPage: string,
    setLoading: (loading: boolean) => void
) => {
    const navigate = useNavigate();

    const handleSignIn = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try {
                setLoading(true);
                const userInfo = await axios.get(
                    "https://www.googleapis.com/oauth2/v3/userinfo",
                    {
                        headers: {
                            Authorization: `Bearer ${tokenResponse.access_token}`,
                        },
                    }
                );

                // Extracting user UPI
                const userUPI: string = userInfo.data.email.split("@")[0];
                localStorage.setItem("userUpi", userUPI);
                // Passing userUPI to member checker
                const text = await checkUser(userUPI);
                // Checking if email is in domain and user is in WDCC
                const eventId = location.pathname.split('/').pop();

                if (
                    userInfo.data.email.endsWith("aucklanduni.ac.nz") &&
                    text === "value found in column"
                ) {
                    console.log("YOU'RE IN WDCC!!");
                    const getUserData = async () => {
                        try {
                            const response = await fetch(
                                `${import.meta.env.VITE_SERVER_URL}/api/user/` + userUPI,
                                {
                                    method: "GET",
                                }
                            );
                            console.log("Fetch response for user data - Checking if user is in DB");
                            await handleResponse(response, userInfo, tokenResponse, userUPI, eventId, currentPage, navigate);
                        } catch (error) {
                            console.log(error);
                        }
                    };

                    // Check MongoDB if user is in DB, then updates/posts user data accordingly
                    getUserData();
                } else {
                    // Redirect to error page if user is not in WDCC
                    navigate("/sign-in-error");
                }
            } catch (error) {
                console.error("Failed to fetch user info:", error);
            }
        },
        onError: (error) => {
            console.log("Login failed:", error);
        },
        // Assuming implicit flow as default; no need to specify unless changing
    });

    return handleSignIn;
};

export default useGoogleSignIn;