from os import path

def getfileinfo(p):
    nodes = path.split(p)
    filename = nodes[-1]
    name, ext = filename.split('.')
    result = { 'name': name, 'extension': ext, 'path': p, 'directory': "".join(nodes[0:-1]) }
    return result

