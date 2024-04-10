import { GoogleLogin } from "@react-oauth/google"
import { JwtPayload, jwtDecode } from "jwt-decode"

//getting rid of  error :D
interface OathPayload extends JwtPayload {
  family_name: string
  given_name: string
  email: string
  jti: string
}

interface UserData {
  userData: OathPayload
  UserUPI: string
}

// sending data to mongoDB, need to change url
const postUserData = async (data: UserData) => {
  await fetch("http://localhost:3000/user", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      firstName: data.userData.given_name,
      lastName: data.userData.family_name,
      email: data.userData.email,
      accessToken: data.userData.jti,
      upi: data.UserUPI,
    }),
  })
    .then((response) => {
      console.log(response)
    })
    .catch((error) => {
      console.log(error)
    })
}

const updateUserData = async (data: UserData) => {
  await fetch("http://localhost:3000/user", {
    method: "PUT",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      firstName: data.userData.given_name,
      lastName: data.userData.family_name,
      email: data.userData.email,
      accessToken: data.userData.jti,
      upi: data.UserUPI,
    }),
  })
    .then((response) => {
      console.log(response)
    })
    .catch((error) => {
      console.log(error)
    })
}

function Login() {
  return (
    <div>
      <GoogleLogin
        onSuccess={async (credentialResponse) => {
          // console.log(credentialResponse.credential);
          if (
            credentialResponse.credential == null ||
            credentialResponse.credential == undefined
          ) {
            throw new Error("Credential is null or undefined")
          } else {
            const jsondata: OathPayload = jwtDecode(
              credentialResponse.credential
            )

            console.log(jsondata)

            //extracting user UPI
            const UserUPI = jsondata.email.split("@")[0]

            //passes UPI to WDCC member checker API
            const checkUser = async (
              upi: string
            ): Promise<string | undefined> => {
              try {
                const response = await fetch(
                  "https://membership.wdcc.co.nz/api/verify/" +
                    import.meta.env.VITE_MEMBERSHIP_CHECKER_SECRETS +
                    "/UPI/" +
                    upi,
                  {
                    method: "GET",
                  }
                )

                if (!response.ok) {
                  throw new Error("Failed to connect to verification API")
                }

                const text = await response.text()
                //console.log(text);
                return text
              } catch (error) {
                console.error("Error verifying user:", error)
              }
            }

            //passing userUPI to member checker
            const text = await checkUser(UserUPI)

            //checking is user email is in domain & if user is in WDCC
            if (
              jsondata.email.endsWith("aucklanduni.ac.nz") &&
              text == "value found in column"
            ) {
              console.log("YOU'RE IN WDCC!!")

              // Need to create a fork?, if a user is valid and is their first time logging in, then we would need to post
              //otherwise, need to update

              const getUserData = async () => {
                //TODO Fix up this method
                await fetch("http://localhost:3000/user/" + UserUPI, {
                  method: "GET",
                })
                  .then((response) => {
                    console.log("Fetch response for user data")
                    console.log(response)
                    // If we get something then, update the user data. Else post.
                    if (response.status == 200) {
                      updateUserData({
                        userData: jsondata,
                        UserUPI: UserUPI,
                      }).then(() => {
                        localStorage.setItem("accessToken", jsondata!.jti)
                      })
                    } else {
                      postUserData({
                        userData: jsondata,
                        UserUPI: UserUPI,
                      }).then(() => {
                        localStorage.setItem("accessToken", jsondata!.jti)
                      })
                    }
                  })
                  .catch((error) => {
                    console.log(error)
                  })
              }
              getUserData()
            } else {
              //redirect user to Error Page
              console.log("Send user to Error Page")
            }
          }
        }}
        onError={() => {
          console.log("Login Failed")
        }}
      />
    </div>
  )
}

export default Login
