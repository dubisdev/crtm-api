export type StopTime = {
    readonly lineCode: string;
    readonly lineShortDescription: string;
    readonly lineDescription: string;
    readonly direction: number;
    readonly destination: string;
    readonly time: string;
    readonly destinationStopCode: string;
    readonly destinationStopName: string;
};
