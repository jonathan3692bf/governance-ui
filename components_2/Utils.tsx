import { useMediaQuery } from 'react-responsive'

export function useIsExtensionWidth({ width }) {
  return useMediaQuery({ query: `(max-width: ${width}px)` })
}

export default function useIsSmallScreen() {
  return useMediaQuery({ query: `(max-width: 768px)` })
}
