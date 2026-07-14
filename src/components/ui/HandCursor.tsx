interface HandCursorProps {
  className?: string
}

export function HandCursor({ className = '' }: HandCursorProps) {
  return (
    <svg
      viewBox="0 0 24 28"
      className={`inline-block w-5 h-6 shrink-0 ${className}`}
      aria-hidden="true"
    >
      <path
        d="M8 2 L8 16 L5 16 L5 19 L8 19 L8 22 L11 22 L11 25 L14 25 L14 22 L17 22 L17 19 L20 19 L20 14 L17 14 L17 8 L14 8 L14 5 L11 5 L11 2 Z"
        fill="#fff"
        stroke="#888"
        strokeWidth="0.5"
      />
      <path d="M9 3 L9 15 L6 15 L6 18 L9 18 L9 21 L12 21 L12 24 L13 24 L13 21 L16 21 L16 18 L19 18 L19 14 L16 14 L16 9 L13 9 L13 6 L10 6 L10 3 Z" fill="#f0f0f0" />
    </svg>
  )
}
