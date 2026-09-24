# Misi Petani Muda

Game web statis siap dipublikasikan melalui GitHub Pages.

## Struktur

- `index.html` — file utama game
- `assets/` — gambar, sprite, audio fallback, dan aset lain
- `.nojekyll` — memastikan GitHub Pages menyajikan file statis apa adanya

## GitHub Pages

1. Upload seluruh isi folder ini ke root repository GitHub.
2. Buka **Settings → Pages**.
3. Pada **Build and deployment**, pilih **Deploy from a branch**.
4. Pilih branch `main` dan folder `/ (root)`.
5. Simpan dan tunggu deployment selesai.

Jangan memindahkan folder `assets`, karena `index.html` memakai path relatif `assets/...`.
