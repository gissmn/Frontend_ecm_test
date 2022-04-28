// get time from objectid
function getTime(objectid) {
  const time = new Date(parseInt(objectid.substring(0, 8), 16) * 1000);
  const formatedTime =
    time.toLocaleDateString("mn", { year: "2-digit", month: "2-digit", day: "2-digit" }) +
    " " +
    time.toLocaleTimeString("mn", { hour: "numeric", minute: "2-digit", second: "2-digit", hour12: false });
  return formatedTime;
}
export default getTime;
