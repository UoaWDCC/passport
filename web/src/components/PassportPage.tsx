import { useState, useEffect } from "react";
import "../styles/page styles/Passport.css";

interface Stamp {
    stamp64: string;
}

interface PassportPageProps {
    stamps: Array<Stamp>;
}

export default function PassportPage({ stamps }: PassportPageProps) {
    const [highlightedIndex, setHighlightedIndex] = useState<number | null>(
        null
    );
    const [positions, setPositions] = useState<{ x: number; y: number }[]>([]);
    const [clickedIndex, setClickedIndex] = useState<number | null>(null);
    const [randomStartAngle, setRandomStartAngle] = useState<number>(0);

    useEffect(() => {
        // generate a random start angle when the component mounts
        setRandomStartAngle(Math.random() * 360);
    }, []);

    useEffect(() => {
        // calculate positions based on the random start angle
        const newPositions = stamps.map((_, index) => getRandomPosition(index));
        setPositions(newPositions);
    }, [stamps, randomStartAngle]);

    const handleStampClick = (index: number) => {
        setHighlightedIndex(index);
        setClickedIndex(index);
    };

    // generate a random direction for a stamp
    const getRandomPosition = (index: number) => {
        const numSections = 4;
        const radius = 80;

        // calculate the angle for the current stamp position
        const sectionAngle = (index % numSections) * (360 / numSections);
        const angle = randomStartAngle + sectionAngle;

        // convert angle to radians
        const angleInRadians = angle * (Math.PI / 180);

        // calculate x and y positions for stamp
        const x = radius * Math.cos(angleInRadians) + 100;
        const y = radius * Math.sin(angleInRadians) + 180;

        return { x, y };
    };

    return (
        <div className="passport bg-white m-auto rounded-br-3xl">
            {stamps.map((stamp, index) => {
                const position = positions[index] || { x: 0, y: 0 };
                return (
                    <div
                        key={index}
                        className={`stamp-container ${
                            highlightedIndex === index ? "highlighted" : ""
                        } ${clickedIndex === index ? "clicked" : ""}`}
                        style={{
                            left: `${position.x}px`,
                            top: `${position.y}px`,
                        }}
                        onClick={() => handleStampClick(index)}
                    >
                        <img
                            className="stamp-image"
                            src={stamp.stamp64}
                            alt={`Stamp ${index + 1}`}
                        />
                    </div>
                );
            })}
        </div>
    );
}
