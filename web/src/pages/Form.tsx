import FormLogo from "../components/formcomponents/form-logo";
import QRCodeForm from "../components/formcomponents/qr-code-form";
import '../styles/page styles/form.css';
import CheckLoggedInAdmin from "../components/CheckLoggedInAdmin";

function Form() {
    return (
        <CheckLoggedInAdmin>
            <div className='form-outer background-form'>
                <div className='form-inner'>
                    <FormLogo />
                    <QRCodeForm />
                </div>
            </div>
        </CheckLoggedInAdmin>
    )
}

export default Form;