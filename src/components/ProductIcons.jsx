export function ProductIcon({ name, className = 'h-6 w-6', strokeWidth = '1.5', ...rest }) {
  const common = {
    className,
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    viewBox: '0 0 24 24',
    'aria-hidden': true,
    ...rest,
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

  if (name === 'construction') {
    return (
      <svg {...common}>
        <path d="M5.5 16V14.5a6.5 6.5 0 0 1 13 0V16" />
        <path d="M10.5 8.25V6.25h3v2" />
        <path d="M3.75 16h16.5v2.25H3.75Z" />
      </svg>
    )
  }

  if (name === 'phone') {
    return (
      <svg {...common}>
        <path d="M8 3.75h8A1.25 1.25 0 0 1 17.25 5v14A1.25 1.25 0 0 1 16 20.25H8A1.25 1.25 0 0 1 6.75 19V5A1.25 1.25 0 0 1 8 3.75Z" />
        <path d="M10.75 6.25h2.5M11.25 17.5h1.5" />
      </svg>
    )
  }

  if (name === 'crm') {
    return (
      <svg {...common}>
        <circle cx="9" cy="9.25" r="2.75" />
        <path d="M4.5 18.5c.6-2.7 2.3-4 4.5-4s3.9 1.3 4.5 4" />
        <path d="M15.25 8h4.5M15.25 11.5h4.5M16.75 15h3" />
      </svg>
    )
  }

  if (name === 'mcp') {
    return (
      <svg {...common}>
        <path d="M9.25 3.75v4M14.75 3.75v4" />
        <path d="M6.75 7.75h10.5v3a5.25 5.25 0 0 1-10.5 0Z" />
        <path d="M12 16v4.25" />
      </svg>
    )
  }

  if (name === 'spark') {
    return (
      <svg {...common}>
        <path d="M12 3.75v4M12 16.25v4M3.75 12h4M16.25 12h4M6.2 6.2l2.6 2.6M15.2 15.2l2.6 2.6M6.2 17.8l2.6-2.6M15.2 8.8l2.6-2.6" />
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
