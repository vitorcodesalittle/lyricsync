import pandas
import numpy as np

inpath = '.\\results\\Avercage_-_Embers_align.csv'
outpath = '.\\results\\Avercage_-_Embers_align.csv'

df = pandas.read_csv(inpath)
onlytimestamps = df.values[:, 1:3]
np.savetxt(outpath, onlytimestamps, delimiter=',')
