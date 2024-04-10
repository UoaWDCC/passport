import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"


function Submit() {

  const [postData, setPostData] = useState({ eventName: "skeeetttt", stampImage: "" })
  const [image64, setImage64] = useState()

  const submitForm = async () => {
    const response = await axios.post('http://localhost:3000/api/event',
      { hello: "hello" },
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    );
    console.log(response)

    // Reset form fields after successful submission
    setPostData({
      eventName: '',
      stampImage: ''
    });
  }

  return (
    <div>
      <Link
        to='/form'
      >
        <button className="submit" type="submit" onClick={submitForm}>
          Finish!
        </button>
      </Link>
    </div>
  );
}
export default Submit;