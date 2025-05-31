import bencode from 'bencode';

export const encode = (data: any) => {
    return bencode.encode(data);
}

export const decode = (buffer: Buffer, encoding = 'utf-8') => {
    return bencode.decode(buffer, encoding);
}