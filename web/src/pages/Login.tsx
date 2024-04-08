import { GoogleLogin } from "@react-oauth/google"
import { JwtPayload, jwtDecode } from "jwt-decode"

//getting rid of  error :D
interface OathPayload extends JwtPayload {
  family_name: string;
  given_name: string;
  email: string;
  jti: string;
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
            throw new Error("Credential is null or undefined");
          } else {
            const jsondata : OathPayload = jwtDecode(credentialResponse.credential)
            
            //extracting user UPI
            const UserUPI = jsondata.email.split("@")[0];

            //passes UPI to WDCC member checker API
            const checkUser = async (upi: any): Promise<String | undefined> => {
              try {
                const response = await fetch("https://membership.wdcc.co.nz/api/verify/sejJBBABIXoePtuQlPkbY/UPI/" + upi, {
                  method: "GET"
                });
            
                if (!response.ok) {
                  throw new Error('Failed to connect to verification API');
                }
            
                const text = await response.text();
                //console.log(text);
                return text;

              } catch (error) {
                console.error('Error verifying user:', error);
              }
            };
            
            //passing userUPI to member checker
            const text = await checkUser(UserUPI);
          
            //checking is user email is in domain & if user is in WDCC
            if (jsondata.email.endsWith("aucklanduni.ac.nz") && text == "value found in column"){
              console.log("YOU'RE IN WDCC!!")

              // Need to create a fork?, if a user is valid and is their first time logging in, then we would need to post
              //otherwise, need to update

              // sending data to mongoDB, need to change url
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
                  postUserData().then(() => {
                    localStorage.setItem("accessToken", jsondata!.jti)
                  })
              }

            } else {
              //redirect user to Error Page
              console.log("Send user to Error Page")
            }
          }
        }}

        onError={() => {
          console.log("Login Failed");
        }}
      />
    </div>
  );
}

export default Login
