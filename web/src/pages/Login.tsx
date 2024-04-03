import { GoogleLogin } from "@react-oauth/google"
import { jwtDecode } from "jwt-decode"

function Login() {
  return (
    <div>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          console.log(credentialResponse.credential)
          if (
            credentialResponse.credential == null ||
            credentialResponse.credential == undefined
          ) {
            throw new Error("Credential is null or undefined")
          } else {
            const jsondata = jwtDecode(credentialResponse.credential)
            console.log(jsondata)

            const postUserData = async () => {
              await fetch("http://localhost:3000/api/v1/users", {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({
                  firstName: jsondata!.given_name,
                  lastName: jsondata!.family_name,
                  email: jsondata!.email,
                  accessToken: jsondata!.jti,
                }),
              })
                .then((response) => {
                  console.log(response)
                })
                .catch((error) => {
                  console.log(error)
                })
            }

            postUserData().then(() => {
              localStorage.setItem("accessToken", jsondata.jti)
            })
          }
        }}
        onError={() => {
          console.log("Login Failed")
        }}
      />
      ;
    </div>
  )
}

export default Login
