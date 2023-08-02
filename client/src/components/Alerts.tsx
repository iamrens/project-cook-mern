import { useState } from "react";

interface AlertProps {
    type: string | null;
    message: string | null;
}

const Alerts = (props: AlertProps) => {
    const [color, setColor] = useState<string>("bg-gray-500");

    if (props.type === "success") { setColor("bg-green-500")}
    if (props.type === "error") { setColor("bg-red-500")}
    if (props.type === "info") { setColor("bg-blue-500")}

  return (
    <div className={`absolute z-50 top-2 right-2 py-1 px- rounded-lg ${color}`}>
        {props.message}
    </div>
  )
}

export default Alerts