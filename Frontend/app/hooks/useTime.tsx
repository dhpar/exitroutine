
export const useTime = () => {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const currentDay = new Date().getDay();
    const todayURLFormat = new Date().toISOString().split("T")[0].split("-").join("/");
    
    return {
        today: daysOfWeek[currentDay],
        todayURLFormat
    };
};