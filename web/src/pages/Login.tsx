import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import updateStampValues from "@components/GetTotalStamps";

interface UserData {
    family_name: string;
    given_name: string;
    email: string;
    accessToken: string;
    UserUPI: string;
    isAdmin: boolean; // Field to handle admin check
}

// Navigate user to the correct page
const NavigateUser = (currentPage: string, navigate: Function) => {
    const prevLocation = localStorage.getItem("prevLocation");
    if (prevLocation) {
        localStorage.removeItem("prevLocation");
        navigate(prevLocation); // Takes them back to the previous location if they've been logged out
    } else if (currentPage === "/dashboard/") {
        navigate("/dashboard/events");
    } else {
        navigate("/passport");
    }
};

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
            isAdmin: data.isAdmin, // Ensure isAdmin is passed correctly when creating a new user
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

// Check user in WDCC member checker API
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
                    isAdmin: data.isAdmin, // Update isAdmin flag as well
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

// Google Sign-In handler
const useGoogleSignIn = (currentPage: string, setLoading: (loading: boolean) => void) => {
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

                // Passing user UPI to member checker
                const text = await checkUser(userUPI);

                // Fetch the user from MongoDB to check admin status
                const getUserData = async () => {
                    const response = await fetch(
                        `${import.meta.env.VITE_SERVER_URL}/api/user/${userUPI}`,
                        {
                            method: "GET",
                        }
                    );
                    
                    if (response.status === 200) {
                        const userData = await response.json(); // Parse the user data
                        
                        // Checking MongoDB for isAdmin
                        if (userData.isAdmin == true) {
                            console.log("User is an admin!");

                            // Update user data
                            updateUserData({
                                family_name: userInfo.data.family_name,
                                given_name: userInfo.data.given_name,
                                email: userInfo.data.email,
                                accessToken: tokenResponse.access_token,
                                UserUPI: userUPI,
                                isAdmin: userData.isAdmin, // Use the isAdmin from MongoDB
                            }).then(() => {
                                console.log("User data updated successfully");
                                localStorage.setItem(
                                    "accessToken",
                                    tokenResponse.access_token
                                );
                                NavigateUser(currentPage, navigate);
                            });
                        } else {
                            console.log("User is not an admin.");
                            navigate("/dashboard/not-an-admin");
                        }
                    } else {
                        // User not found, add new user
                        console.log("User not found. Adding new user.");
                        postUserData({
                            family_name: userInfo.data.family_name,
                            given_name: userInfo.data.given_name,
                            email: userInfo.data.email,
                            accessToken: tokenResponse.access_token,
                            UserUPI: userUPI,
                            isAdmin: false, // Default to non-admin when adding new users
                        }).then(() => {
                            localStorage.setItem(
                                "accessToken",
                                tokenResponse.access_token
                            );
                            NavigateUser(currentPage, navigate);
                        });
                    }
                };

                // Only proceed if the user is from "aucklanduni.ac.nz" domain and verified in WDCC
                if (userInfo.data.email.endsWith("aucklanduni.ac.nz") && text === "value found in column") {
                    console.log("User is in WDCC!");
                    getUserData();
                } else {
                    console.log("User is not a member of WDCC.");
                    navigate("/sign-in-error");
                }
            } catch (error) {
                console.error("Failed to fetch user info:", error);
            }
        },
        onError: (error) => {
            console.log("Login failed:", error);
        },
    });

    return handleSignIn;
};

export default useGoogleSignIn;






