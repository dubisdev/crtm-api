export const CRTM_API = {
    BASE_URL: "https://crtm.es/widgets/api",
    ENDPOINTS: {
        STOP_INFORMATION: "GetStopsInformation.php",
        LINE_INFORMATION: "GetLines.php",
        STOP_TIMES: "GetStopsTimes.php",

        // Other endpoints that might be useful in the future
        TRANSPORT_MODES: "GetModes.php",
        MUNICIPALITIES: "GetMunicipalities.php",
        OFFICES: "https://crtm.es/widgets/Offices.json",
        INCIDENTS: "https://crtm.es/widgets/api/GetIncidentsAffectations.php?mode=6&codLine=6__M1___",
        FULL_ITINERARY: "https://crtm.es/widgets/api/GetLinesInformation.php?activeItinerary=1&codLine=6__M1___"
    }
} as const;
