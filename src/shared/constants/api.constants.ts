export const CRTM_API = {
    BASE_URL: "https://crtm.es/widgets/api",
    ENDPOINTS: {
        STOP_INFORMATION: "GetStopsInformation.php",
        LINE_INFORMATION: "GetLines.php",
        STOP_TIMES: "GetStopsTimes.php"
    }
} as const;
