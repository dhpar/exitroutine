
export const useTime = () => {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const currentDay = new Date().getDay();
    const todaySplitDate = new Date().toISOString().split("T")[0].split("-");
    
    return {
        today: daysOfWeek[currentDay],
        todaySplitDate,
        todayURLFormat: todaySplitDate.join('/'),
    };
};