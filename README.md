# Guest Comment - React + Supabase

Form feedback pelanggan untuk tabel `public.guest_comments`.

## Kolom yang digunakan

Sesuai migration `20_guest_comment.sql`:

- `guest_name`
- `guest_phone`
- `comment`
- `rating`
- `is_published`

`id`, `created_at`, dan `updated_at` menggunakan default dari database.

Form publik sengaja tidak mengisi `order_id`. Jika nanti form dibuka dari QR per transaksi, `order_id` bisa ditambahkan dengan validasi khusus.

## 1. Install

```bash
npm install
```

## 2. Environment

Buat `.env.local`:

```env
VITE_SUPABASE_URL=https://PROJECT.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_xxxxxxxxx
```

Jangan gunakan `service_role` atau `sb_secret_...` di React/Vercel.

## 3. Supabase RLS

Migration `20_guest_comment.sql` saat ini hanya mempunyai policy SELECT untuk user authenticated.

Agar form publik bisa INSERT, jalankan:

```text
supabase/migrations/23_guest_comment_public_insert.sql
```

Policy tersebut hanya mengizinkan:

- rating 1-5
- komentar 5-1000 karakter
- nama maksimal 100 karakter
- nomor HP maksimal 30 karakter
- `is_published = true`
- `order_id` harus null

Frontend tidak diberi hak SELECT, UPDATE, atau DELETE.

## 4. Development

```bash
npm run dev
```

## 5. Build Vercel

```bash
npm run build
```

Vercel:

- Framework: Vite
- Build command: `npm run build`
- Output directory: `dist`

Environment Variables di Vercel:

```text
VITE_SUPABASE_URL
VITE_SUPABASE_PUBLISHABLE_KEY
```

## Logo

Saat ini header memakai icon restoran dari `lucide-react`.
Kalau ingin memakai logo restoran asli, letakkan file:

```text
public/logo.png
```

lalu ubah bagian `.brand-logo` pada `src/App.jsx` menjadi `<img src="/logo.png" ... />`.
