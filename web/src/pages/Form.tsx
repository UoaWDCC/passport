import { useEffect, useState } from "react";
import FormLogo from "../components/formcomponents/form-logo";
import QRCodeForm from "../components/formcomponents/qr-code-form";
import "../styles/page styles/form.css";
import CheckLoggedInAdmin from "../components/CheckLoggedInAdmin";
import { useNavigate } from "react-router-dom";

function Form() {
    const [event, setEvent] = useState<string>("");
    const navigate = useNavigate();

    useEffect(() => {
        const url = window.location.href;
        const id = url.split("/").pop();
        if (id && !event) {
            setEvent(id);
        }
    }, [event]);

    const close = () => {
        navigate(-1); // Navigate back to the previous page
    };

    return (
        <CheckLoggedInAdmin>
            <div className="form-outer background-form">
                <button className="self-end mr-6 mt-6" onClick={close}>
                    Go Back
                </button>
                <div className="form-inner -mt-12">
                    <FormLogo />
                    <QRCodeForm eventId={event} />
                </div>
            </div>
        </CheckLoggedInAdmin>
    );
}

export default Form;
