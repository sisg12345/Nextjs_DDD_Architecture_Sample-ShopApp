import { theme } from '@/styles/themes'

/**
 * Appのロゴ
 */
export default function AppLogo() {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      data-testid="app-logo"
    >
      <rect width="40" height="40" rx="6" fill="url(#paint0_linear)" />
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="20"
        fontWeight="bold"
        fill="white"
      >
        S
      </text>
      <defs>
        <linearGradient
          id="paint0_linear"
          x1="0"
          y1="20"
          x2="40"
          y2="20"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={theme.colors.primary} />
          <stop offset="1" stopColor={theme.colors.primaryLight} />
        </linearGradient>
      </defs>
    </svg>
  )
}
