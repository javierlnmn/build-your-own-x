export type Tracker = `http://${string}` | `udp://${string}`;

export type TrackerTierList = Array<Array<Tracker>>;

export interface PeerDict {
    'peer id'?: string;
    ip: string;
    port: number;
}

export interface TrackerResponse {
    'failure reason'?: string;
    'warning message'?: string;
    interval?: number;
    'min interval'?: number;
    'tracker id'?: string;
    complete?: number;
    incomplete?: number;
    peers?: PeerDict[] | string;
}