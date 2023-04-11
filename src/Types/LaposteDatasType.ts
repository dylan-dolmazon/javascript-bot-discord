export interface TrackingResponse {
    lang: string;
    scope: string;
    returnCode: number;
    returnMessage?: string;
    idShip?: string;
    shipment?: {
        idShip: string;
        urlDetail: string;
        holder: number;
        product: string;
        isFinal: boolean;
        entryDate: string;
        deliveryDate?: string;
        event: Array<{
            date: string;
            label: string;
            code: string;
        }>;
        timeline: Array<{
            id: number;
            shortLabel: string;
            longLabel: string;
            status: boolean;
        }>;
    }
}
