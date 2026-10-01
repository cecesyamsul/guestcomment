import { useMemo, useState } from 'react';
import { CheckCircle2, MessageSquareText, Phone, Send, UserRound } from 'lucide-react';
import { supabase } from '../lib/supabase';
import StarRating from './StarRating';

const ratingLabels = {
  1: 'Sangat kurang',
  2: 'Kurang',
  3: 'Cukup',
  4: 'Puas',
  5: 'Sangat puas',
};

export default function GuestCommentForm() {
  const [form, setForm] = useState({
    guest_name: '',
    guest_phone: '',
    comment: '',
    rating: 0,
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const ratingText = useMemo(
    () => (form.rating ? ratingLabels[form.rating] : 'Pilih rating Anda'),
    [form.rating]
  );

  const update = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setError('');
  };

  const submit = async (event) => {
    event.preventDefault();
    setError('');

    if (!form.rating) {
      setError('Silakan pilih rating terlebih dahulu.');
      return;
    }

    if (!form.comment.trim()) {
      setError('Silakan tuliskan komentar atau saran Anda.');
      return;
    }

    if (form.comment.trim().length < 5) {
      setError('Komentar terlalu singkat. Mohon tuliskan sedikit lebih detail.');
      return;
    }

    setSubmitting(true);

    const payload = {
      guest_name: form.guest_name.trim() || null,
      guest_phone: form.guest_phone.trim() || null,
      comment: form.comment.trim(),
      rating: form.rating,
      is_published: true,
    };

    const { error: insertError } = await supabase
      .from('guest_comments')
      .insert(payload);

    setSubmitting(false);

    if (insertError) {
      console.error(insertError);
      setError(
        insertError.code === '42501'
          ? 'Feedback belum dapat dikirim. Periksa policy INSERT pada Supabase.'
          : 'Feedback gagal dikirim. Silakan coba lagi.'
      );
      return;
    }

    setSuccess(true);
  };

  if (success) {
    return (
      <div className="success-card">
        <div className="success-icon">
          <CheckCircle2 size={54} strokeWidth={1.8} />
        </div>
        <h2>Terima kasih!</h2>
        <p>
          Feedback Anda sudah kami terima. Masukan Anda sangat membantu kami
          memberikan pelayanan yang lebih baik.
        </p>
        <button
          type="button"
          className="primary-button"
          onClick={() => {
            setForm({
              guest_name: '',
              guest_phone: '',
              comment: '',
              rating: 0,
            });
            setSuccess(false);
          }}
        >
          Kirim Feedback Lagi
        </button>
      </div>
    );
  }

  return (
    <form className="comment-form" onSubmit={submit}>
      <div className="rating-section">
        <div className="section-label">Bagaimana pengalaman Anda?</div>
        <StarRating
          value={form.rating}
          onChange={(value) => update('rating', value)}
          size={38}
        />
        <div className={`rating-caption ${form.rating ? 'selected' : ''}`}>
          {ratingText}
        </div>
      </div>

      <div className="field-group">
        <label htmlFor="guest_name">
          <UserRound size={17} />
          Nama <span>(opsional)</span>
        </label>
        <input
          id="guest_name"
          value={form.guest_name}
          onChange={(e) => update('guest_name', e.target.value)}
          placeholder="Nama Anda"
          maxLength={100}
          autoComplete="name"
        />
      </div>

      <div className="field-group">
        <label htmlFor="guest_phone">
          <Phone size={17} />
          No. WhatsApp <span>(opsional)</span>
        </label>
        <input
          id="guest_phone"
          value={form.guest_phone}
          onChange={(e) => update('guest_phone', e.target.value)}
          placeholder="08xxxxxxxxxx"
          maxLength={30}
          inputMode="tel"
          autoComplete="tel"
        />
      </div>

      <div className="field-group">
        <label htmlFor="comment">
          <MessageSquareText size={17} />
          Komentar / Saran
        </label>
        <textarea
          id="comment"
          value={form.comment}
          onChange={(e) => update('comment', e.target.value)}
          placeholder="Ceritakan pengalaman Anda di restoran kami..."
          maxLength={1000}
          rows={5}
        />
        <div className="character-count">{form.comment.length}/1000</div>
      </div>

      {error && <div className="form-error">{error}</div>}

      <button className="primary-button submit-button" type="submit" disabled={submitting}>
        {submitting ? (
          <>
            <span className="spinner" />
            Mengirim...
          </>
        ) : (
          <>
            <Send size={18} />
            Kirim Feedback
          </>
        )}
      </button>

      <p className="privacy-note">
        Feedback Anda digunakan untuk membantu meningkatkan kualitas makanan dan pelayanan kami.
      </p>
    </form>
  );
}
