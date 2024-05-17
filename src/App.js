import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
  NextUIProvider,
  TimeInput,
} from "@nextui-org/react";
import { Time } from "@internationalized/date";
import { useEffect, useState } from "react";

function App() {
  const [startTime, setStartTime] = useState(new Time(7, 0));
  const [lunchStart, setLunchStart] = useState(new Time(11, 30));
  const [lunchEnd, setLunchEnd] = useState(new Time(12, 30));
  const [endTime, setEndTime] = useState(new Time(16, 0));
  const [jaz, setJaZ] = useState(0);
  const [jazTime, setJazTime] = useState(0);

  useEffect(() => {
    let start = startTime.hour * 60 + startTime.minute;
    let lunchS = lunchStart.hour * 60 + lunchStart.minute;
    let lunchE = lunchEnd.hour * 60 + lunchEnd.minute;
    let end = endTime.hour * 60 + endTime.minute;

    let jazTime = (480 - (end - start - (lunchE - lunchS))) * -1;

    setJazTime(jazTime);
    setJaZ(formatMinutes(jazTime));
  }, [startTime, lunchStart, lunchEnd, endTime]);

  function formatMinutes(minutes) {
    const sign = minutes < 0 ? "-" : minutes > 0 ? "+" : "";
    minutes = Math.abs(minutes);

    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    const formattedHours = String(hours).padStart(2, "0");
    const formattedMinutes = String(remainingMinutes).padStart(2, "0");

    return `${sign}${formattedHours}:${formattedMinutes}`;
  }

  return (
    <NextUIProvider>
      <main className="dark text-foreground bg-background h-screen w-screen flex justify-center">
        <div className="w-3/4 md:w-[500px] flex flex-col items-center gap-4 mt-5">
          <Image src="/logo192.png" alt="JAZ" />
          <Card className="w-full items-center">
            <CardHeader className="flex justify-center text-2xl font-bold">
              <div>Calculate your JAZ</div>
            </CardHeader>
            <CardBody className="gap-4 w-2/3">
              <TimeInput
                label="Start time"
                hourCycle={24}
                value={startTime}
                onChange={setStartTime}
              />
              <TimeInput
                label="Lunch start"
                hourCycle={24}
                value={lunchStart}
                onChange={setLunchStart}
              />
              <TimeInput
                label="Lunch end"
                hourCycle={24}
                value={lunchEnd}
                onChange={setLunchEnd}
              />
              <TimeInput
                label="Leave time"
                hourCycle={24}
                value={endTime}
                onChange={setEndTime}
              />
            </CardBody>
            <CardFooter className="flex flex-col text-xl font-semibold gap-1 pb-5">
              <div>JAZ for today</div>
              {jazTime < 0 ? (
                <div className="text-red-500 text-2xl">{jaz}</div>
              ) : jazTime > 0 ? (
                <div className="text-green-500 text-2xl">{jaz}</div>
              ) : (
                <div className="text-2xl">{jaz}</div>
              )}
            </CardFooter>
          </Card>
        </div>
      </main>
    </NextUIProvider>
  );
}

export default App;
