import { Star } from 'lucide-react';

export default function StarRating({ value, onChange, size = 32 }) {
  return (
    <div className="rating-stars" role="radiogroup" aria-label="Rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className={`star-button ${star <= value ? 'active' : ''}`}
          onClick={() => onChange(star)}
          aria-label={`${star} bintang`}
          aria-checked={star === value}
          role="radio"
        >
          <Star size={size} strokeWidth={1.8} fill={star <= value ? 'currentColor' : 'none'} />
        </button>
      ))}
    </div>
  );
}
