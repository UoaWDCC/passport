import EventSection from "./eventsection";
import StampSection from "./stampsection";

function Form() {
  return (
    <div className="form">
        <form>
          <EventSection /> 
          <StampSection /> 
        </form>
    </div>
  );
}

export default Form;