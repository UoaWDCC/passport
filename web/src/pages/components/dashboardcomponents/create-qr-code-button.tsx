import CreateNewButton from './create-new-button';

function GenerateQRCodeButton() {
    return (
        <div className='generate-qr-code-button'>
            <h3 className='button-header'>QR Code Generator</h3>
            <CreateNewButton />
        </div>
    );
}

export default GenerateQRCodeButton;