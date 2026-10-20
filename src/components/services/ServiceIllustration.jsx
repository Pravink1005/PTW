/**
 * Bespoke, meaningful vector illustrations for each of the 11 clinic services.
 * Uses Palette 2 tokens (marine slate, seafoam teal, warm sunbeam, sage green, blush terracotta).
 */

export default function ServiceIllustration({ slug, className = 'w-full h-36' }) {
  switch (slug) {
    case 'child-counselling':
      return (
        <svg viewBox="0 0 280 140" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
          <defs>
            <linearGradient id="childGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#EBF4F6" />
              <stop offset="100%" stopColor="#DFEDF1" />
            </linearGradient>
            <linearGradient id="sunGold" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FEF3C7" />
              <stop offset="100%" stopColor="#FDE68A" />
            </linearGradient>
          </defs>
          <rect width="280" height="140" rx="16" fill="url(#childGrad)" />
          {/* Gentle sun and glowing aura */}
          <circle cx="210" cy="40" r="32" fill="url(#sunGold)" fillOpacity="0.7" />
          <circle cx="210" cy="40" r="22" fill="#FDE68A" />
          {/* Soft rolling hills */}
          <path d="M 0 140 Q 70 95 150 115 Q 220 135 280 105 L 280 140 Z" fill="#D2E5EA" />
          <path d="M 0 140 Q 80 110 170 125 Q 230 135 280 120 L 280 140 Z" fill="#BED9DF" />
          {/* Playful wooden blocks of growth */}
          <rect x="50" y="85" width="26" height="26" rx="6" fill="#1E6B7B" />
          <text x="63" y="103" textAnchor="middle" fill="#FFFFFF" fontSize="13" fontWeight="bold" fontFamily="system-ui">A</text>
          <rect x="80" y="70" width="28" height="28" rx="6" fill="#F1A388" />
          <text x="94" y="89" textAnchor="middle" fill="#FFFFFF" fontSize="13" fontWeight="bold" fontFamily="system-ui">B</text>
          <rect x="70" y="40" width="24" height="24" rx="6" fill="#439CAE" />
          <text x="82" y="57" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="bold" fontFamily="system-ui">C</text>
          {/* Sprouting seedling representing young mind thriving */}
          <path d="M 175 110 Q 172 80 185 65" stroke="#123F49" strokeWidth="3" strokeLinecap="round" />
          <path d="M 185 65 Q 170 55 165 70 C 175 75 185 68 185 65 Z" fill="#2A8395" />
          <path d="M 185 65 Q 200 55 205 70 C 195 75 185 68 185 65 Z" fill="#439CAE" />
        </svg>
      );

    case 'pre-marital-counselling':
      return (
        <svg viewBox="0 0 280 140" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
          <defs>
            <linearGradient id="preMaritalGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#F9F6F0" />
              <stop offset="100%" stopColor="#EDE6D8" />
            </linearGradient>
          </defs>
          <rect width="280" height="140" rx="16" fill="url(#preMaritalGrad)" />
          {/* Rising partnership sun */}
          <circle cx="140" cy="70" r="44" fill="#FEF3C7" fillOpacity="0.8" />
          {/* Intersecting rings of commitment & dialogue */}
          <circle cx="122" cy="70" r="32" stroke="#1E6B7B" strokeWidth="4.5" fill="none" />
          <circle cx="158" cy="70" r="32" stroke="#F1A388" strokeWidth="4.5" fill="none" />
          {/* Gentle spark of shared future */}
          <circle cx="140" cy="70" r="7" fill="#123F49" />
          {/* Gentle dialogue soundwave */}
          <path d="M 50 115 Q 140 95 230 115" stroke="#CBDCE0" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );

    case 'marital-counselling':
      return (
        <svg viewBox="0 0 280 140" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
          <defs>
            <linearGradient id="maritalGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#EBF4F6" />
              <stop offset="100%" stopColor="#DFEDF1" />
            </linearGradient>
          </defs>
          <rect width="280" height="140" rx="16" fill="url(#maritalGrad)" />
          {/* Reconnecting hands / bridge to heart */}
          <path d="M 60 95 Q 105 80 140 75 Q 175 80 220 95" stroke="#CBDCE0" strokeWidth="3" strokeLinecap="round" fill="none" />
          {/* Central Heart of empathy and repair */}
          <path
            d="M 140 50 C 130 35 105 40 105 60 C 105 80 140 100 140 100 C 140 100 175 80 175 60 C 175 40 150 35 140 50 Z"
            fill="#1E6B7B"
          />
          {/* Inner warmth heart */}
          <path
            d="M 140 60 C 134 50 118 53 118 66 C 118 78 140 90 140 90 C 140 90 162 78 162 66 C 162 53 146 50 140 60 Z"
            fill="#F1A388"
          />
          {/* Peaceful olive branch */}
          <path d="M 80 55 Q 95 62 105 60" stroke="#439CAE" strokeWidth="2" strokeLinecap="round" />
          <path d="M 200 55 Q 185 62 175 60" stroke="#439CAE" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'family-counselling':
      return (
        <svg viewBox="0 0 280 140" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
          <defs>
            <linearGradient id="familyGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FAF7F2" />
              <stop offset="100%" stopColor="#EFE8DD" />
            </linearGradient>
          </defs>
          <rect width="280" height="140" rx="16" fill="url(#familyGrad)" />
          {/* Sheltering tree canopy representing family generations */}
          <path d="M 140 120 L 140 65" stroke="#9A7B62" strokeWidth="6" strokeLinecap="round" />
          <circle cx="140" cy="50" r="38" fill="#1E6B7B" />
          <circle cx="110" cy="62" r="26" fill="#2A8395" />
          <circle cx="170" cy="62" r="26" fill="#439CAE" />
          <circle cx="140" cy="38" r="22" fill="#F1A388" fillOpacity="0.85" />
          {/* Family figures beneath canopy */}
          <circle cx="115" cy="105" r="7" fill="#123F49" />
          <path d="M 105 125 C 105 116 125 116 125 125" fill="#123F49" />
          <circle cx="165" cy="105" r="7" fill="#123F49" />
          <path d="M 155 125 C 155 116 175 116 175 125" fill="#123F49" />
          <circle cx="140" cy="110" r="5" fill="#F1A388" />
          <path d="M 132 125 C 132 119 148 119 148 125" fill="#F1A388" />
        </svg>
      );

    case 'old-age-counselling':
      return (
        <svg viewBox="0 0 280 140" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
          <defs>
            <linearGradient id="oldAgeGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFF9F2" />
              <stop offset="100%" stopColor="#F5ECE1" />
            </linearGradient>
          </defs>
          <rect width="280" height="140" rx="16" fill="url(#oldAgeGrad)" />
          {/* Golden Sunset over gentle waves - representing peace, dignity and life wisdom */}
          <circle cx="140" cy="68" r="38" fill="#FDE68A" />
          <path d="M 30 100 Q 140 85 250 100 L 250 140 L 30 140 Z" fill="#DCEAE8" />
          <path d="M 20 112 Q 140 100 260 112 L 260 140 L 20 140 Z" fill="#BED9DF" />
          {/* Comfortable rocking chair silhouette */}
          <path d="M 125 80 Q 138 60 145 80" stroke="#123F49" strokeWidth="3" strokeLinecap="round" fill="none" />
          <line x1="130" y1="80" x2="122" y2="105" stroke="#9A7B62" strokeWidth="3" strokeLinecap="round" />
          <line x1="145" y1="80" x2="152" y2="105" stroke="#9A7B62" strokeWidth="3" strokeLinecap="round" />
          <path d="M 115 106 Q 138 110 160 106" stroke="#9A7B62" strokeWidth="3.5" strokeLinecap="round" fill="none" />
          {/* Sunbeams of gratitude */}
          <line x1="140" y1="20" x2="140" y2="12" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="105" y1="35" x2="98" y2="28" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="175" y1="35" x2="182" y2="28" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );

    case 'occupational-therapy':
      return (
        <svg viewBox="0 0 280 140" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
          <defs>
            <linearGradient id="otGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#EBF4F6" />
              <stop offset="100%" stopColor="#D8ECF0" />
            </linearGradient>
          </defs>
          <rect width="280" height="140" rx="16" fill="url(#otGrad)" />
          {/* Puzzle piece connection symbolizing fine motor and skill building */}
          <g transform="translate(105, 32)">
            <path
              d="M 10 10 H 35 C 35 18 45 18 45 10 H 70 V 35 C 62 35 62 45 70 45 V 70 H 45 C 45 62 35 62 35 70 H 10 V 45 C 18 45 18 35 10 35 Z"
              fill="#1E6B7B"
            />
            <path
              d="M 45 10 H 70 V 35 C 62 35 62 45 70 45 V 70 H 45 Z"
              fill="#2A8395"
            />
          </g>
          {/* Supportive open hand guiding dexterity */}
          <path d="M 60 105 Q 85 85 105 80" stroke="#F1A388" strokeWidth="4.5" strokeLinecap="round" fill="none" />
          <circle cx="195" cy="55" r="8" fill="#F1A388" />
          <circle cx="215" cy="75" r="12" fill="#FEF3C7" />
          <circle cx="75" cy="50" r="10" fill="#439CAE" />
        </svg>
      );

    case 'speech-therapy':
      return (
        <svg viewBox="0 0 280 140" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
          <defs>
            <linearGradient id="speechGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FAF8F5" />
              <stop offset="100%" stopColor="#EFECE6" />
            </linearGradient>
          </defs>
          <rect width="280" height="140" rx="16" fill="url(#speechGrad)" />
          {/* Speech bubble with joyful soundwaves and words */}
          <path
            d="M 60 30 C 60 22 68 15 78 15 H 170 C 180 15 188 22 188 30 V 75 C 188 83 180 90 170 90 H 105 L 80 108 V 90 H 78 C 68 90 60 83 60 75 Z"
            fill="#1E6B7B"
          />
          {/* Active soundwaves of clear communication */}
          <line x1="88" y1="52" x2="88" y2="52" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" />
          <line x1="104" y1="42" x2="104" y2="62" stroke="#FFFFFF" strokeWidth="4.5" strokeLinecap="round" />
          <line x1="120" y1="32" x2="120" y2="72" stroke="#FDE68A" strokeWidth="5" strokeLinecap="round" />
          <line x1="136" y1="40" x2="136" y2="64" stroke="#FFFFFF" strokeWidth="4.5" strokeLinecap="round" />
          <line x1="152" y1="48" x2="152" y2="56" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />
          {/* Dialogue response bubble */}
          <circle cx="210" cy="55" r="18" fill="#F1A388" />
          <circle cx="228" cy="80" r="10" fill="#439CAE" />
          <circle cx="236" cy="98" r="6" fill="#FDE68A" />
        </svg>
      );

    case 'special-education':
      return (
        <svg viewBox="0 0 280 140" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
          <defs>
            <linearGradient id="spedGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#EBF4F6" />
              <stop offset="100%" stopColor="#DFEDF1" />
            </linearGradient>
          </defs>
          <rect width="280" height="140" rx="16" fill="url(#spedGrad)" />
          {/* Open illuminated book */}
          <path d="M 85 92 Q 140 82 140 100 Q 140 82 195 92 L 190 60 Q 140 50 140 70 Q 140 50 90 60 Z" fill="#FFFFFF" />
          <path d="M 140 70 L 140 102" stroke="#1E6B7B" strokeWidth="3" />
          {/* Rising spark of individualized learning & discovery */}
          <path d="M 140 60 L 140 28" stroke="#F1A388" strokeWidth="3" strokeDasharray="3 3" />
          <circle cx="140" cy="24" r="12" fill="#FDE68A" />
          <path d="M 140 18 L 140 30 M 134 24 L 146 24" stroke="#D97706" strokeWidth="2" strokeLinecap="round" />
          {/* Stepping stones / ladder of growth */}
          <rect x="52" y="98" width="22" height="6" rx="3" fill="#1E6B7B" />
          <rect x="56" y="86" width="22" height="6" rx="3" fill="#2A8395" />
          <rect x="60" y="74" width="22" height="6" rx="3" fill="#439CAE" />
        </svg>
      );

    case 'behavioral-management':
      return (
        <svg viewBox="0 0 280 140" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
          <defs>
            <linearGradient id="behavGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#F9F6F0" />
              <stop offset="100%" stopColor="#ECE5D7" />
            </linearGradient>
          </defs>
          <rect width="280" height="140" rx="16" fill="url(#behavGrad)" />
          {/* Navigational compass symbolizing calm guidance and emotional regulation */}
          <circle cx="140" cy="70" r="42" fill="#FFFFFF" stroke="#DAE6E9" strokeWidth="2.5" />
          <circle cx="140" cy="70" r="32" stroke="#CBDCE0" strokeWidth="1.5" strokeDasharray="3 3" fill="none" />
          {/* Compass needle pointing toward balance and harmony */}
          <polygon points="140,36 148,70 140,66 132,70" fill="#1E6B7B" />
          <polygon points="140,104 148,70 140,74 132,70" fill="#F1A388" />
          <circle cx="140" cy="70" r="4" fill="#FFFFFF" />
          {/* Calming gentle horizon waves */}
          <path d="M 40 110 Q 90 102 140 110 Q 190 118 240 110" stroke="#1E6B7B" strokeWidth="2" strokeLinecap="round" fill="none" />
        </svg>
      );

    case 'cognitive-management':
      return (
        <svg viewBox="0 0 280 140" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
          <defs>
            <linearGradient id="cogGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#EBF4F6" />
              <stop offset="100%" stopColor="#D2E5EA" />
            </linearGradient>
          </defs>
          <rect width="280" height="140" rx="16" fill="url(#cogGrad)" />
          {/* Luminous neural network / brain pathways representing focus, memory and thinking */}
          <circle cx="140" cy="70" r="38" fill="#FFFFFF" fillOpacity="0.85" />
          {/* Interconnected neural nodes */}
          <circle cx="120" cy="55" r="7" fill="#1E6B7B" />
          <circle cx="160" cy="55" r="7" fill="#1E6B7B" />
          <circle cx="140" cy="72" r="9" fill="#F1A388" />
          <circle cx="115" cy="85" r="6" fill="#2A8395" />
          <circle cx="165" cy="85" r="6" fill="#439CAE" />
          <circle cx="140" cy="42" r="5" fill="#FDE68A" />
          {/* Neural spark lines */}
          <line x1="120" y1="55" x2="140" y2="72" stroke="#1E6B7B" strokeWidth="2.5" />
          <line x1="160" y1="55" x2="140" y2="72" stroke="#1E6B7B" strokeWidth="2.5" />
          <line x1="115" y1="85" x2="140" y2="72" stroke="#2A8395" strokeWidth="2.5" />
          <line x1="165" y1="85" x2="140" y2="72" stroke="#439CAE" strokeWidth="2.5" />
          <line x1="120" y1="55" x2="140" y2="42" stroke="#CBDCE0" strokeWidth="2" />
          <line x1="160" y1="55" x2="140" y2="42" stroke="#CBDCE0" strokeWidth="2" />
        </svg>
      );

    case 'adl-training':
      return (
        <svg viewBox="0 0 280 140" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
          <defs>
            <linearGradient id="adlGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FAF7F2" />
              <stop offset="100%" stopColor="#EFE8DD" />
            </linearGradient>
          </defs>
          <rect width="280" height="140" rx="16" fill="url(#adlGrad)" />
          {/* Welcoming home threshold symbolizing independent daily living skills */}
          <path d="M 140 32 L 85 70 L 95 70 L 95 115 L 185 115 L 185 70 L 195 70 Z" fill="#FFFFFF" stroke="#CBDCE0" strokeWidth="2" />
          {/* Welcoming front door */}
          <rect x="125" y="75" width="30" height="40" rx="3" fill="#1E6B7B" />
          <circle cx="132" cy="95" r="2.5" fill="#FDE68A" />
          {/* Window of warmth */}
          <rect x="105" y="75" width="14" height="14" rx="2" fill="#FDE68A" />
          <rect x="161" y="75" width="14" height="14" rx="2" fill="#FDE68A" />
          {/* Key to daily routine and self-care */}
          <path d="M 45 95 L 65 95 M 60 90 L 60 95 M 65 90 L 65 95" stroke="#F1A388" strokeWidth="3" strokeLinecap="round" />
          <circle cx="45" cy="95" r="6" stroke="#F1A388" strokeWidth="3" fill="none" />
          {/* Cheerful morning sun */}
          <circle cx="225" cy="45" r="16" fill="#FDE68A" />
        </svg>
      );

    default:
      return (
        <svg viewBox="0 0 280 140" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
          <rect width="280" height="140" rx="16" fill="#EBF4F6" />
          <circle cx="140" cy="70" r="32" fill="#1E6B7B" />
        </svg>
      );
  }
}

