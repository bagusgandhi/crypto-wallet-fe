const options: Intl.DateTimeFormatOptions | undefined = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: '2-digit',
    minute: '2-digit',
    second: "numeric",
    hourCycle: 'h23',
    timeZone: "UTC", // Set the time zone to UTC
  };

export const dateFormat = (timestamp: string) => new Intl.DateTimeFormat("us-US", options).format(new Date(timestamp))