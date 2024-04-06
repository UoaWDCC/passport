import EventSection from "./eventsection";
import StampSection from "./stampsection";

function QRCodeForm() {
  return (
    <div className="qr-code-form">
        <h1 className="header">QR Code Generator</h1>
        <form>
          <EventSection /> 
          <StampSection /> 
        </form>
    </div>
  );
}

export default QRCodeForm;