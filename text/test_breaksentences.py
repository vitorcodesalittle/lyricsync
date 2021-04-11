import os
from breaksentences import getwords

current   = os.path.realpath(__file__)
directory = os.path.join('data', 'test')
lyrics    = [ p for p in os.listdir(directory) if not p.endswith('.words.txt') ]
expecteds = [ p for p in os.listdir(directory) if p.endswith('.words.txt') ]
tests = zip(lyrics, expecteds)

def test(lyricspath, wordspath):
    with open(lyricspath, 'r') as f, open(wordspath) as e:
        try:
            content = f.read()
            expected_len = len(e.readlines())
            words = getwords(content)
            print(len(words), expected_len)
            broken = len(words) != expected_len
            if broken:
                print("Wrong word separation for file {} (annotation {})".format(lyricspath, wordspath))
                # print(words)
            # assert(len(words) == expected_len)
        except UnicodeDecodeError as e:
            print("Error decoding {} content as utf-8".format(lyricspath))
for lyric, expected in list(tests):
    test(os.path.join(directory, lyric), os.path.join(directory, expected))
