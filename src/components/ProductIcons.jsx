export function ProductIcon({ name, className = 'h-6 w-6' }) {
  const common = {
    className,
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '1.5',
    viewBox: '0 0 24 24',
    'aria-hidden': true,
  }

  if (name === 'document') {
    return (
      <svg {...common}>
        <path d="M7 3.75h7.5L19.25 8.5V20.25H7A1.25 1.25 0 0 1 5.75 19V5A1.25 1.25 0 0 1 7 3.75Z" />
        <path d="M14.25 3.75V8.5h5" />
        <path d="M8.75 12.5h6.5M8.75 16h4.5" />
      </svg>
    )
  }

  if (name === 'utensils') {
    return (
      <svg {...common}>
        <path d="M6 4.75v6.5M6 11.25V19.25M4.25 4.75v4.25a1.75 1.75 0 1 0 3.5 0V4.75" />
        <path d="M16.5 4.75c1.8 0 2.75 1.7 2.75 3.5 0 2.4-1.55 3.5-2.75 3.5V19.25M16.5 4.75V11.75" />
      </svg>
    )
  }

  if (name === 'store') {
    return (
      <svg {...common}>
        <path d="M4.75 10.25 6 5.75h12l1.25 4.5v8.5H4.75Z" />
        <path d="M4.75 10.25h14.5" />
        <path d="M9.25 18.75v-5h5.5v5" />
      </svg>
    )
  }

  return (
    <svg {...common}>
      <path d="M4.75 15.25V10.5h10.5v4.75" />
      <path d="M15.25 12.25h3.1l1.9 3v3H4.75v-3h3" />
      <circle cx="8" cy="18.25" r="1.35" />
      <circle cx="16.75" cy="18.25" r="1.35" />
      <path d="M7.5 7.75h5.25V10.5" />
    </svg>
  )
}
