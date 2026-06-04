import sys, os, glob, re

def snappy_decompress(data):
    pos = 0; length = 0; shift = 0
    while True:
        b = data[pos]; pos += 1
        length |= (b & 0x7f) << shift
        if not (b & 0x80): break
        shift += 7
    out = bytearray()
    while pos < len(data):
        tag = data[pos]; pos += 1
        t = tag & 0x03
        if t == 0:
            ln = tag >> 2
            if ln < 60:
                ln += 1
            else:
                nb = ln - 59
                ln = int.from_bytes(data[pos:pos+nb], 'little') + 1
                pos += nb
            out += data[pos:pos+ln]; pos += ln
        else:
            if t == 1:
                ln = ((tag >> 2) & 0x07) + 4
                off = ((tag >> 5) << 8) | data[pos]; pos += 1
            elif t == 2:
                ln = (tag >> 2) + 1
                off = int.from_bytes(data[pos:pos+2], 'little'); pos += 2
            else:
                ln = (tag >> 2) + 1
                off = int.from_bytes(data[pos:pos+4], 'little'); pos += 4
            start = len(out) - off
            for i in range(ln):
                out.append(out[start+i])
    return bytes(out)

def decode_iwa(path):
    raw = open(path,'rb').read()
    pos = 0; chunks = bytearray()
    while pos + 4 <= len(raw):
        ln = int.from_bytes(raw[pos+1:pos+4],'little')
        pos += 4
        comp = raw[pos:pos+ln]; pos += ln
        try:
            chunks += snappy_decompress(comp)
        except Exception:
            pass
    return bytes(chunks)

def strings(b, minlen=3):
    res = []; cur = bytearray(); i = 0
    while i < len(b):
        c = b[i]
        if c in (0xD0,0xD1) and i+1 < len(b):
            cur += b[i:i+2]; i += 2; continue
        if 32 <= c < 127:
            cur.append(c); i += 1; continue
        if len(cur) >= minlen:
            try: res.append(cur.decode('utf-8'))
            except Exception: pass
        cur = bytearray(); i += 1
    if len(cur)>=minlen:
        try: res.append(cur.decode('utf-8'))
        except Exception: pass
    return res

d = sys.argv[1]
allstr=[]
for f in sorted(glob.glob(os.path.join(d,'Index','Tables','*.iwa'))):
    b = decode_iwa(f)
    for s in strings(b,3):
        if re.search('[Ѐ-ӿ]', s):
            allstr.append(s.strip())
seen=set()
for s in allstr:
    if s not in seen and len(s)>2:
        seen.add(s); print(s)
