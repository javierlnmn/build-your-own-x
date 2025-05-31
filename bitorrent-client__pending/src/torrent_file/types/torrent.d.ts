export type TorrentFileType = {
    announce: string;
    'announce-list'?: string[][];
    'created by'?: string;
    'creation date'?: number;
    encoding?: string;
    info: {
        files?: Array<{
            length: number;
            path: string[];
        }>;
        length?: number;
        name: string;
        'piece length': number;
        pieces: string;
        private?: number;
    };
    [key: string]: unknown;
};