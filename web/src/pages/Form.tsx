import { useEffect, useState } from "react"
import FormLogo from "../components/formcomponents/form-logo"
import QRCodeForm from "../components/formcomponents/qr-code-form"
import "../styles/page styles/form.css"

function Form() {
  const [event, setEvent] = useState<string>("")

  useEffect(() => {
    const url = window.location.href
    const id = url.split("/").pop()
    if (id) {
      setEvent(id)
    }
  }, [])
  return (
    <div className="form-outer background-form">
      <div className="form-inner">
        <FormLogo />
        <QRCodeForm id={event} />
      </div>
    </div>
  )
}

export default Form
