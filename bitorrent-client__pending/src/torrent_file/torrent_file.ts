import { Tracker, TrackerTierList } from 'src/trackers/types/tracker';
import { TorrentFileType } from './types/torrent';
import { decode, encode } from '../bencode/bencode.ts';
import { getFile } from '../bencode/get_file.ts';
import crypto from 'crypto';

export default class TorrentFile {
    private decodedFile: TorrentFileType;
    private encodedFile: Buffer;

    constructor(private fileName: string) {
        this.decodedFile = decode(getFile(fileName));
        this.encodedFile = getFile(fileName);
    }

    get getDecodedFile(): TorrentFileType {
        return this.decodedFile;
    }

    get getEncodedFile(): Buffer {
        return this.encodedFile;
    }

    getTrackers(): TrackerTierList {
        const mainTracker = this.decodedFile['announce'];
        const announceList = this.decodedFile['announce-list'] ?? [];

        const tiers: TrackerTierList = announceList.map((tier: string[]) =>
            tier.length > 1
                ? this.shuffleTier(tier.map(tracker => tracker as Tracker))
                : tier as Tracker[]
        );

        if (mainTracker) {
            tiers.unshift([mainTracker as Tracker]);
        }

        return tiers;
    }

    shuffleTier<T>(tier: T[]): T[] {
        const arr = [...tier];
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }

    getInfoHash(): Buffer {
        const bencodedInfo = encode(this.getDecodedFile['info']);
        const sha1Buffer = crypto.createHash('sha1').update(bencodedInfo).digest();
        return sha1Buffer;
    }

    getFileSize(): number {
        return this.getDecodedFile['info']['length'] ?
            this.getDecodedFile['info']['length']
            :
            this.getDecodedFile['info']['files'].reduce((acc, fInfo) => acc + fInfo.length, 0);
    }

}