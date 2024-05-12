import { useGoogleLogin } from '@react-oauth/google';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

interface UserData {
  family_name: string
  given_name: string
  email: string
  accessToken: string
  UserUPI: string
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
      console.log("New User added!!")
      console.log(response)
    })
    .catch((error) => {
      console.log(error)
    })
}

//updating User in MongoDB
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
    )

    if (!response.ok) {
      throw new Error("Failed to update user data")
    } else {
      console.log("User Data Updated")
    }
  } catch (error) {
    console.error(error)
  }
}

// Passes UPI to WDCC member checker API
const checkUser = async (upi: string): Promise<string | undefined> => { 
  try {
    const response = await fetch(
      `https://membership.wdcc.co.nz/api/verify/${import.meta.env.VITE_MEMBERSHIP_CHECKER_SECRETS}/UPI/${upi}`,
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

const useGoogleSignIn = (currentPage: string) => {
  const navigate = useNavigate();

  const handleSignIn = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      // console.log('Token Response:', tokenResponse.access_token); //DELETE
      
      try {
        const userInfo = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        });
        // console.log('User Info:', userInfo.data); //DELETE

        //extracting user UPI
        const userUPI:string = userInfo.data.email.split("@")[0];
        //passing userUPI to member checker
        const text = await checkUser(userUPI);

        //checking if email is in domain and user is in WDCC
        if (
          userInfo.data.email.endsWith("aucklanduni.ac.nz") &&
          text === "value found in column"
        ) {
          console.log("YOU'RE IN WDCC!!");

          const getUserData = async () => {
            //TODO Fix up this method - FIXED
            await fetch(`${import.meta.env.VITE_SERVER_URL}/api/user/` + userUPI, {
              method: "GET",
            })
              .then((response) => {
                console.log(
                  "Fetch response for user data - Checking if user is in DB"
                )
                // If we get something then, update the user data. Else post.
                
                
                if (response.status == 200) {
                  console.log("Updating User Data")
                  updateUserData({
                    family_name: userInfo.data.family_name,
                    given_name: userInfo.data.given_name,
                    email: userInfo.data.email,
                    accessToken: tokenResponse.access_token,
                    UserUPI: userUPI,
                  }).then(() => {
                    localStorage.setItem("accessToken", tokenResponse.access_token)
                  })
                } else {
                  console.log("Posting User Data")
                  postUserData({
                    family_name: userInfo.data.family_name,
                    given_name: userInfo.data.given_name,
                    email: userInfo.data.email,
                    accessToken: tokenResponse.access_token,
                    UserUPI: userUPI,
                  }).then(() => {
                    localStorage.setItem("accessToken", tokenResponse.access_token)
                  })
                }
              })
              .catch((error) => {
                console.log(error)
              })
          }
        
          // Check MongoDB if user is in DB, then updates/posts user data accordingly
          getUserData();

          // "/passport"
          if (currentPage === "/sign-in") {
            navigate('/passport');
          }
          else {
            navigate('/dashboard/events');
          }

        } else {
          // Redirect to error page
          console.log("Redirect to error page");
          
          // "/sign-in-error"
          // navigate('/sign-in-error');
          navigate('/passport');
        }
        
      } catch (error) {
        console.error('Failed to fetch user info:', error); 
      }
    },
    onError: (error) => {
      console.log('Login failed:', error);
    }
    // Assuming implicit flow as default; no need to specify unless changing
  });

  return handleSignIn;
};

export default useGoogleSignIn;
