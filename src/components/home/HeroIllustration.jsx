export default function HeroIllustration({ className = '' }) {
  return (
    <div
      className={`relative flex items-center justify-center ${className}`}
      role="img"
      aria-label="MindCare therapy sanctuary: welcoming room with comfortable armchair, natural indoor plant, sunlit window, and trusted care badges"
    >
      <svg
        viewBox="0 0 540 460"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto max-w-[520px] select-none transition-transform duration-500 ease-out hover:scale-[1.01]"
        style={{ overflow: 'visible' }}
      >
        <defs>
          {/* Card Border Clip Path to guarantee perfectly rounded corners without any overflow */}
          <clipPath id="cardClip">
            <rect x="20" y="16" width="500" height="428" rx="36" />
          </clipPath>

          {/* Background Wall Gradient */}
          <linearGradient id="wallGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#EBF4F6" />
            <stop offset="60%" stopColor="#DFEDF1" />
            <stop offset="100%" stopColor="#D2E5EA" />
          </linearGradient>

          {/* Warm Sunbeam Gradient */}
          <linearGradient id="sunGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF7ED" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#FEF3C7" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#EBF4F6" stopOpacity="0" />
          </linearGradient>

          {/* Chair Main Gradient */}
          <linearGradient id="chairTeal" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#257A8B" />
            <stop offset="100%" stopColor="#123F49" />
          </linearGradient>

          {/* Chair Shadow Gradient */}
          <linearGradient id="chairDark" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1C5E6C" />
            <stop offset="100%" stopColor="#0E2F37" />
          </linearGradient>

          {/* Plant Leaf Gradient */}
          <linearGradient id="leafTeal" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2A8395" />
            <stop offset="100%" stopColor="#164A55" />
          </linearGradient>

          <linearGradient id="leafLight" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#439CAE" />
            <stop offset="100%" stopColor="#1E6B7B" />
          </linearGradient>

          {/* Ceramic Pot Gradient */}
          <linearGradient id="potGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FAF5EE" />
            <stop offset="100%" stopColor="#DCE4E6" />
          </linearGradient>

          {/* Floating Card & Badges Soft Drop Shadow */}
          <filter id="cardShadow" x="-10%" y="-10%" width="120%" height="125%">
            <feDropShadow dx="0" dy="12" stdDeviation="16" floodColor="#123F49" floodOpacity="0.08" />
          </filter>

          <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="6" stdDeviation="10" floodColor="#123F49" floodOpacity="0.10" />
          </filter>
        </defs>

        {/* --- MAIN SANCTUARY CARD (CLIPPED WITH PURE TRANSPARENT EDGES) --- */}
        {/* Soft Shadow Base */}
        <rect x="20" y="16" width="500" height="428" rx="36" fill="url(#wallGradient)" filter="url(#cardShadow)" />

        {/* Clipped Room Elements */}
        <g clipPath="url(#cardClip)">
          {/* Wall Gradient Base */}
          <rect x="20" y="16" width="500" height="428" fill="url(#wallGradient)" />

          {/* Soft Sunbeam Horizon */}
          <circle cx="390" cy="110" r="110" fill="url(#sunGlow)" />

          {/* Large Architectural Window Arch */}
          <path
            d="M 170 380 L 170 190 C 170 118 228 60 300 60 C 372 60 430 118 430 190 L 430 380 Z"
            fill="#FFFFFF"
            fillOpacity="0.65"
          />
          {/* Window Panes Grid */}
          <path d="M 300 70 L 300 375" stroke="#DAE6E9" strokeWidth="2.5" strokeDasharray="4 4" />
          <path d="M 180 200 L 420 200" stroke="#DAE6E9" strokeWidth="2.5" />
          <path d="M 180 290 L 420 290" stroke="#DAE6E9" strokeWidth="2.5" />

          {/* Floor Line & Soft Floor Zone */}
          <path d="M 20 380 L 520 380" stroke="#CBDCE0" strokeWidth="2" />
          <rect x="20" y="380" width="500" height="64" fill="#E4F0F3" fillOpacity="0.75" />

          {/* Area Rug */}
          <ellipse cx="270" cy="385" rx="190" ry="26" fill="#D2E6EB" fillOpacity="0.6" />

          {/* --- COMFORTABLE THERAPY ARMCHAIR --- */}
          {/* Chair Floor Shadow */}
          <ellipse cx="300" cy="385" rx="85" ry="18" fill="#123F49" fillOpacity="0.14" />

          {/* Chair Wooden Legs */}
          <line x1="240" y1="355" x2="225" y2="385" stroke="#9A7B62" strokeWidth="4.5" strokeLinecap="round" />
          <line x1="360" y1="355" x2="375" y2="385" stroke="#9A7B62" strokeWidth="4.5" strokeLinecap="round" />
          <line x1="265" y1="350" x2="258" y2="380" stroke="#7A5E48" strokeWidth="4" strokeLinecap="round" />
          <line x1="335" y1="350" x2="342" y2="380" stroke="#7A5E48" strokeWidth="4" strokeLinecap="round" />

          {/* Chair Backrest (Welcoming Curved Shell) */}
          <path
            d="M 225 310 C 215 220 250 170 300 170 C 350 170 385 220 375 310 Z"
            fill="url(#chairTeal)"
          />
          {/* Subtle Tufting / Backrest Contour */}
          <path d="M 270 210 Q 300 230 330 210" stroke="#439CAE" strokeWidth="2.5" strokeLinecap="round" strokeOpacity="0.5" />
          <path d="M 265 245 Q 300 265 335 245" stroke="#439CAE" strokeWidth="2.5" strokeLinecap="round" strokeOpacity="0.4" />

          {/* Plush Seat Cushion */}
          <path
            d="M 215 310 C 215 295 240 290 300 290 C 360 290 385 295 385 310 C 385 335 365 348 300 348 C 235 348 215 335 215 310 Z"
            fill="url(#chairDark)"
          />

          {/* Soft Lumbar Accent Cushion */}
          <ellipse cx="300" cy="310" rx="42" ry="16" fill="#FAF5EE" />
          <path d="M 272 310 Q 300 316 328 310" stroke="#DAE2D6" strokeWidth="1.5" />

          {/* Chair Armrests */}
          <path
            d="M 210 270 C 210 255 228 255 228 275 L 226 322 C 226 332 210 330 210 320 Z"
            fill="#1C5E6C"
          />
          <path
            d="M 390 270 C 390 255 372 255 372 275 L 374 322 C 374 332 390 330 390 320 Z"
            fill="#1C5E6C"
          />

          {/* --- LUSH BOTANICAL CORNER PLANT (GROWTH & LIFE) --- */}
          {/* Pot Shadow */}
          <ellipse cx="125" cy="385" rx="34" ry="9" fill="#123F49" fillOpacity="0.12" />
          {/* Planter Pot */}
          <path d="M 102 335 L 148 335 L 142 385 L 108 385 Z" fill="url(#potGrad)" />
          <ellipse cx="125" cy="335" rx="23" ry="5" fill="#C5D3D6" />

          {/* Graceful Stems & Multi-toned Leaves */}
          <path d="M 125 335 Q 100 290 65 295 C 60 270 95 270 120 310 Z" fill="url(#leafTeal)" />
          <path d="M 125 330 Q 90 250 80 200 C 105 195 130 230 125 300 Z" fill="url(#leafLight)" />
          <path d="M 125 330 Q 120 220 135 160 C 155 170 155 210 132 290 Z" fill="url(#leafTeal)" />
          <path d="M 125 330 Q 150 260 195 240 C 205 260 170 285 130 315 Z" fill="url(#leafLight)" />
          <path d="M 125 320 Q 140 285 165 285 C 160 305 140 308 125 320 Z" fill="url(#leafTeal)" />

          {/* --- SMALL WOODEN ACCENT TABLE WITH STEAMING TEA --- */}
          {/* Table top */}
          <ellipse cx="435" cy="330" rx="32" ry="9" fill="#B39276" />
          <path d="M 405 330 Q 435 338 465 330 L 465 334 Q 435 342 405 334 Z" fill="#917258" />
          {/* Table Leg */}
          <line x1="435" y1="335" x2="435" y2="385" stroke="#7A5E48" strokeWidth="4" strokeLinecap="round" />
          <line x1="435" y1="380" x2="415" y2="390" stroke="#7A5E48" strokeWidth="3" strokeLinecap="round" />
          <line x1="435" y1="380" x2="455" y2="390" stroke="#7A5E48" strokeWidth="3" strokeLinecap="round" />

          {/* Warm Ceramic Teacup */}
          <rect x="427" y="316" width="16" height="12" rx="4" fill="#FFFFFF" />
          <ellipse cx="435" cy="316" rx="8" ry="2.5" fill="#DFEDF1" />
          {/* Gentle Steam Curves */}
          <path d="M 433 311 Q 431 303 434 298" stroke="#1E6B7B" strokeWidth="1.4" strokeLinecap="round" strokeOpacity="0.45" />
          <path d="M 437 310 Q 439 302 436 296" stroke="#1E6B7B" strokeWidth="1.4" strokeLinecap="round" strokeOpacity="0.35" />
        </g>

        {/* --- FLOATING TRUST BADGES (WARM & BESPOKE) --- */}
        {/* Badge 1: Top Right "A Safe Space / 100% Confidential" */}
        <g filter="url(#softShadow)">
          <rect x="300" y="38" width="195" height="52" rx="26" fill="#FFFFFF" />
          <circle cx="326" cy="64" r="16" fill="var(--color-primary-soft)" />
          {/* Shield Icon */}
          <path d="M 326 55 L 333 58 V 64 C 333 68.5 330 72 326 73 C 322 72 319 68.5 319 64 V 58 Z" fill="#1E6B7B" />
          <text x="350" y="58" fontFamily="system-ui, sans-serif" fontSize="12" fontWeight="700" fill="#16282E">A Safe Space</text>
          <text x="350" y="73" fontFamily="system-ui, sans-serif" fontSize="10.5" fill="#4E646B">100% Confidential</text>
        </g>

        {/* Badge 2: Left "Gentle Guidance / No rushed decisions" */}
        <g filter="url(#softShadow)">
          <rect x="35" y="115" width="185" height="48" rx="24" fill="#FFFFFF" fillOpacity="0.98" />
          <circle cx="59" cy="139" r="15" fill="var(--color-primary-soft)" />
          {/* Gentle Pin/Heart Icon */}
          <path d="M 59 131 C 55 131 52 134 52 138 C 52 143 59 148 59 148 C 59 148 66 143 66 138 C 66 134 63 131 59 131 Z" fill="#1E6B7B" />
          <text x="82" y="133" fontFamily="system-ui, sans-serif" fontSize="11.5" fontWeight="700" fill="#16282E">Gentle Guidance</text>
          <text x="82" y="147" fontFamily="system-ui, sans-serif" fontSize="10" fill="#4E646B">No rushed decisions</text>
        </g>
      </svg>
    </div>
  );
}

