import EventSection from "./eventsection";
import StampSection from "./stampsection";
import Submit from "./submit";

function QRCodeForm() {
  return (
    <div className="qr-code-form">
        <h1 className="header">QR Code Generator</h1>
        <form autoComplete="off">
          <EventSection /> 
          <StampSection /> 
          <Submit />
        </form>
    </div>
  );
}

export default QRCodeForm;