import FormLogo from "../components/formcomponents/form-logo";
import QRCodeForm from "../components/formcomponents/qr-code-form";
import '../styles/form.css';

function Form() {
    return (
        <div className='form-outer'>
            <div className='form-inner'>
                <FormLogo />
                <QRCodeForm />
            </div>
        </div>
    )
}

export default Form;