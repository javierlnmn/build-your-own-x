export interface AnnounceParams {
  info_hash: string
  peer_id: string
  port: number
  uploaded: number
  downloaded: number
  left: number
  compact?: 0 | 1
  no_peer_id?: 0 | 1
  event?: 'started' | 'completed' | 'stopped';
  ip?: string
  numwant?: number
  key?: string
  trackerid?: string
}
