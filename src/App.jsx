import { Utensils } from 'lucide-react';
import GuestCommentForm from './components/GuestCommentForm';

export default function App() {
  return (
    <main className="page">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <section className="app-shell">
        <header className="brand">
          <div className="brand-logo" aria-label="Logo restoran">
            <Utensils size={28} strokeWidth={1.8} />
          </div>
          <div>
            <div className="brand-name">RESTO POS</div>
            <div className="brand-subtitle">Guest Comment</div>
          </div>
        </header>

        <div className="hero">
          <span className="eyebrow">YOUR VOICE MATTERS</span>
          <h1>Bagaimana pengalaman Anda?</h1>
          <p>
            Luangkan waktu sebentar untuk berbagi pengalaman.
            Setiap masukan dari Anda sangat berarti bagi kami.
          </p>
        </div>

        <GuestCommentForm />

        <footer className="footer">
          <span>Terima kasih sudah berkunjung</span>
          <span className="footer-dot">•</span>
          <span>Resto POS</span>
        </footer>
      </section>
    </main>
  );
}
