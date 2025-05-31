import TorrentFile from './torrent_file/torrent_file.ts'
import { HttpTrackerClient } from './trackers/tracker_client.ts';
import { AnnounceParams } from './trackers/types/announce.ts';
import crypto from 'crypto';

const file = new TorrentFile('nomoreheroeswii.torrent');
const trackerClient = new HttpTrackerClient(file.getTrackers()[0][0]);

const peerId = (crypto.pseudoRandomBytes(20)).toString('hex');
const urlPeerId = encodeURIComponent(peerId);

const infoHash = (file.getInfoHash()).toString('hex');
const urlInfoHash = encodeURIComponent(infoHash);

const port = 6881;
const totalSize = file.getFileSize();


const announceParams: AnnounceParams = {
    info_hash: urlInfoHash,
    peer_id: urlPeerId,
    port: port,
    uploaded: 0,
    downloaded: 0,
    left: totalSize,
    event: 'started'
};


trackerClient.announce(announceParams).then((response) => {
    console.log('Tracker response:', response);
}).catch((err) => {
    console.error('Announce error:', err);
});
