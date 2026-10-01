import React, { useMemo, useState } from "react";
import { CheckCircle2, MessageSquareText, Phone, Send, UserRound } from "lucide-react";
import { supabase } from "../lib/supabase";
import StarRating from "./StarRating";

const ratingLabels = {
  1: "Sangat kurang",
  2: "Kurang",
  3: "Cukup",
  4: "Puas",
  5: "Sangat puas",
};

export default function GuestCommentForm() {
  const [form, setForm] = useState({ guest_name: "", guest_phone: "", comment: "", rating: 0 });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const ratingText = useMemo(
    () => (form.rating ? ratingLabels[form.rating] : "Ketuk bintang untuk memberi penilaian"),
    [form.rating]
  );

  const update = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setError("");
  };

  const submit = async (event) => {
    event.preventDefault();
    setError("");

    if (!form.rating) return setError("Silakan pilih rating terlebih dahulu.");
    if (!form.comment.trim()) return setError("Silakan tuliskan komentar atau saran Anda.");
    if (form.comment.trim().length < 5) return setError("Komentar terlalu singkat. Mohon tuliskan sedikit lebih detail.");

    setSubmitting(true);
    const payload = {
      guest_name: form.guest_name.trim() || null,
      guest_phone: form.guest_phone.trim() || null,
      comment: form.comment.trim(),
      rating: form.rating,
      is_published: true,
    };

    const { error: insertError } = await supabase.from("guest_comments").insert(payload);
    setSubmitting(false);

    if (insertError) {
      console.error(insertError);
      setError(insertError.code === "42501"
        ? "Feedback belum dapat dikirim. Periksa policy INSERT pada Supabase."
        : "Feedback gagal dikirim. Silakan coba lagi.");
      return;
    }

    setSuccess(true);
  };

  if (success) {
    return (
      <section className="success-card" aria-live="polite">
        <div className="success-icon"><CheckCircle2 size={38} strokeWidth={1.7} /></div>
        <span className="success-kicker">FEEDBACK TERKIRIM</span>
        <h2>Terima kasih!</h2>
        <p>Masukan Anda sudah kami terima. Senang bisa mendengar cerita dari Anda.</p>
        <button
          type="button"
          className="secondary-button"
          onClick={() => {
            setForm({ guest_name: "", guest_phone: "", comment: "", rating: 0 });
            setSuccess(false);
          }}
        >
          Kirim Feedback Lagi
        </button>
      </section>
    );
  }

  return (
    <form className="comment-form" onSubmit={submit}>
      <div className="form-heading">
        <div>
          <span className="form-eyebrow">01 — YOUR THOUGHTS</span>
          <h2>Bagikan pengalaman</h2>
        </div>
        <span className="optional-note">± 1 menit</span>
      </div>

      <div className="rating-section">
        <div className="section-label">Seberapa puas Anda dengan kunjungan hari ini?</div>
        <StarRating value={form.rating} onChange={(value) => update("rating", value)} size={32} />
        <div className={`rating-caption ${form.rating ? "selected" : ""}`}>{ratingText}</div>
      </div>

      <div className="fields-grid">
        <div className="field-group">
          <label htmlFor="guest_name"><UserRound size={15} /> Nama <span>opsional</span></label>
          <input id="guest_name" value={form.guest_name} onChange={(e) => update("guest_name", e.target.value)} placeholder="Nama Anda" maxLength={100} autoComplete="name" />
        </div>

        <div className="field-group">
          <label htmlFor="guest_phone"><Phone size={15} /> WhatsApp <span>opsional</span></label>
          <input id="guest_phone" value={form.guest_phone} onChange={(e) => update("guest_phone", e.target.value)} placeholder="08xxxxxxxxxx" maxLength={30} inputMode="tel" autoComplete="tel" />
        </div>
      </div>

      <div className="field-group comment-field">
        <label htmlFor="comment"><MessageSquareText size={15} /> Komentar / Saran</label>
        <div className="textarea-wrap">
          <textarea id="comment" value={form.comment} onChange={(e) => update("comment", e.target.value)} placeholder="Apa yang paling Anda sukai? Atau apa yang bisa kami tingkatkan?" maxLength={1000} rows={4} />
          <div className="character-count">{form.comment.length}/1000</div>
        </div>
      </div>

      {error && <div className="form-error" role="alert">{error}</div>}

      <button className="primary-button submit-button" type="submit" disabled={submitting}>
        {submitting ? <><span className="spinner" /> Mengirim...</> : <><Send size={16} /> Kirim Feedback</>}
      </button>

      <p className="privacy-note">Masukan Anda digunakan untuk meningkatkan kualitas makanan dan pelayanan Saungjalu.</p>
    </form>
  );
}
