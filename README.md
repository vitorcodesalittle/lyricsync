# Projeto de Computação Musical (IF754) 2020.1

Integrantes:

- Gabriel Pessoa
- Luan
- Pedro
- Penélope
- Vitor

# Setup

1. Install [aeneas](https://github.com/readbeyond/aeneas/blob/master/wiki/INSTALL.md#all-in-one-installer-1)
2. Install [spleeter](https://github.com/deezer/spleeter)
3. Run `pip install -r requirements.txt` on this repo.

# Checkpoints

- [x] Sentences alignment
- [x] Words alignments
- [ ] Evaluation script
- [ ] Plotting script
- [ ] Erro quando tem \n no final das lyrics ( ou em outros lugares? ) Deixar mais robusto
- [ ] Highlight de algumas palavras não funciona
- [ ] Crawler para pegar letras automáticamente dependendo do nome da música / nome do arquivo
- [ ] Pegar áudio da internet
- [ ] ~~Syllable alignment~~

Words alignment

- [ ] ~~Syllable alignment~~

# Utility

- Convert .mp3 to .wav: `python conversion.py <path-to-song>`
- Break a file into words: `python -m text.breaksentences <path-to-lyrics>`
- Test word breaking: `python ./text/test_breaksentences.py`
- Play segments of the audion:
  - 1. Change `# CHANGE HERE` lines with file paths
  - 2. Run `python player.py`
- \[WIP\] Run Evaluation:
  - 1. `cd packages && python eval.py`

# Metrics and Plotting

We run the scripts `Plot.py` and `Evaluate.py` taken from [this repo](https://github.com/f90/jamendolyrics)

- [How to evaluate our alignment](https://github.com/f90/jamendolyrics#evaluating-your-own-models)
- [Plotting our own predictions](https://github.com/f90/jamendolyrics#visualising-model-predictions)
