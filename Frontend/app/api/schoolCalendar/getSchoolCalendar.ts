import { pad } from "@/utils/pad";

export const fetchMenuItems = async (yyyy: string, mm: string, dd: string) => {
    const dateHyphenFormat = `${yyyy}-${pad(mm)}-${pad(dd)}`;
    
    return await fetch(`https://lakeconference.org/public/genie/23/school/2/date/2025-05-23/view/week/`, {
        "credentials": "include",
        "headers": {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:138.0) Gecko/20100101 Firefox/138.0",
            "Accept": "*/*",
            "Accept-Language": "en-US,en;q=0.5",
            "X-Requested-With": "XMLHttpRequest",
            "Sec-GPC": "1",
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Site": "same-origin"
        },
        "referrer": "https://lakeconference.org/public/genie/23/school/2/date/2025-05-23/view/week/",
        "method": "GET",
        "mode": "cors"
    });
}