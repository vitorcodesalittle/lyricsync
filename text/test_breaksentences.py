import os
import string
from breaksentences import getwords

current   = os.path.realpath(__file__)
directory = os.path.join('data', 'test')
lyrics    = [ p for p in os.listdir(directory) if not p.endswith('.words.txt') ]
expecteds = [ p for p in os.listdir(directory) if p.endswith('.words.txt') ]
tests = zip(lyrics, expecteds)

def remove_punctuation(s):
    return ''.join(ch for ch in s if ch not in string.punctuation)

def test(lyricspath, wordspath):
    with open(lyricspath, 'r',encoding='utf-8') as f, open(wordspath,encoding='utf-8') as e:
        content = f.read()
        expected_lines = e.readlines()
        expected_len = len(expected_lines)
        words = getwords(content)
        broken = len(words) != expected_len
        if broken:
            print("Wrong word separation for file {} (annotation {})".format(lyricspath, wordspath))
            for i in range(0, len(expected_lines)):
                expct = remove_punctuation(expected_lines[i].rstrip('\n').lower())
                got = remove_punctuation(words[i].rstrip('\n').lower())
                if got != expct:
                    print("expected {}, got {}".format(expct, got))
                    print('linha ' + str(i) )
                    break

        assert(len(words) == expected_len)
      
for lyric, expected in list(tests):
    test(os.path.join(directory, lyric), os.path.join(directory, expected))

print('Separation of words ok!')