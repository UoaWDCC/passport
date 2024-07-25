import "../styles/page styles/Passport.css";

export default function PassportPage({ stamps }: { stamps: Array<any> }) {
    return (
        <div className="passport bg-white m-auto rounded-br-3xl">
            <div className="grid grid-cols-2 gap-4">
                {stamps.map((stamp, index) => (
                    <div key={index}>
                        <img
                            className="stamp-image"
                            src={stamp.stamp64}
                            alt={`Stamp $${index + 1}`}
                        ></img>
                    </div>
                ))}
            </div>
        </div>
    );
}
