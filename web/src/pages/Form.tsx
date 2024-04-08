import FormLogo from "./components/formcomponents/formlogo";
import QRCodeForm from "./components/formcomponents/qrcodeform";
import '../styles/form.css';

function Form() {
    return (
        <div className='form-container'>
            <FormLogo />
            <QRCodeForm />
        </div>
    )
}

export default Form;