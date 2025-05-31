import { AnnounceParams } from './types/announce';
import { TrackerResponse } from './types/tracker';

export interface TrackerClient {
    announce(params: AnnounceParams): Promise<TrackerResponse>;
}

export class HttpTrackerClient implements TrackerClient {
    constructor(private url: string) {
        this.url = 'http://vps02.net.orel.ru:80/announce';
    }

    async announce(params: AnnounceParams) {
        const queryParams: Record<string, string> = {};

        for (const [key, value] of Object.entries(params)) {
            if (value !== undefined) {
                queryParams[key] = String(value);
            }
        }

        const response = await fetch(this.url + '?' + new URLSearchParams(queryParams).toString());
        const data = await response.json();
        return data as TrackerResponse;
    }
}

// export class UdpTrackerClient implements TrackerClient {
//     constructor(private url: string) { }
//     async announce(params: AnnounceParams): Promise<TrackerResponse> {
//     }
// }
