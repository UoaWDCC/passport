import FormLogo from "./components/formcomponents/formlogo";
import QRCodeForm from "./components/formcomponents/qrcodeform";

function Form() {
    return (
        <div className='app-form'>
            <FormLogo />
            <QRCodeForm />
        </div>
    )
}

export default Form;