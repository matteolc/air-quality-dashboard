import { dateTimeFormat } from "~/utils";

export const Clock = ({ date }: { date?: Date }) => {
  const parts = dateTimeFormat().formatToParts(date);

  const getPartValue = (part: string) => {
    return parts.find((p) => p.type === part)?.value;
  };

  return (
    <div className="flex text-4xl text-cornflower-400">
      <div className="mr-6">
        {getPartValue("month")} {getPartValue("day")} {getPartValue("weekday")}{" "}
      </div>
      <div className="text-right">
        {getPartValue("hour")} :{getPartValue("minute")}{" "}
        <span className="text-xl align-top font-bold">
          {" "}
          {getPartValue("dayPeriod")}{" "}
        </span>
        <span className="-ml-10 text-xs">{getPartValue("timeZoneName")}</span>
      </div>
    </div>
  );
};
