import EventSection from "./event-section";
import StampSection from "./stamp-section";
import Submit from "./submit";

function QRCodeForm() {
  return (
    <div className="qr-code-form">
        <h1 className="header">QR Code Generator</h1>
        <form autoComplete="off" action="/submit-form" method="POST">
          <EventSection /> 
          <StampSection /> 
          <Submit />
        </form>
    </div>
  );
}

export default QRCodeForm;