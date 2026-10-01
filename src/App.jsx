import React from "react";
import { Leaf, Sparkles } from "lucide-react";
import GuestCommentForm from "./components/GuestCommentForm";

export default function App() {
  return (
    <main className="page">
      <div className="grain" />
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <section className="app-shell">
        <header className="brand-header">
          <div className="brand-mark">
            <img className="brand-logo-image" src="/logo.png" alt="Saungjalu" />
          </div>
          <div className="brand-caption">
            <span className="caption-line" />
            <Leaf size={13} strokeWidth={1.7} />
            <span>GUEST EXPERIENCE</span>
            <span className="caption-line" />
          </div>
        </header>

        <section className="hero">
          <div className="hero-copy">
            <div className="hero-kicker"><Sparkles size={12} /> YOUR EXPERIENCE MATTERS</div>
            <h1>Bagaimana pengalaman Anda di Saungjalu?</h1>
            <p>Luangkan satu menit untuk berbagi cerita. Setiap masukan membantu kami menyajikan pengalaman yang lebih hangat.</p>
          </div>
          <div className="hero-badge">
            <Leaf size={17} strokeWidth={1.7} />
            <span>One step closer to nature</span>
          </div>
        </section>

        <GuestCommentForm />

        <footer className="footer">
          <span>Terima kasih sudah berkunjung</span>
          <span className="footer-dot" />
          <span>Saungjalu</span>
        </footer>
      </section>
    </main>
  );
}
