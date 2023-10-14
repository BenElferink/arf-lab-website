import Link from 'next/link'
import { useRouter } from 'next/router'

export interface SingleLinkProps {
  label: string
  path?: string
  url?: string
  onClick?: () => void
}

const SingleLink = (props: SingleLinkProps) => {
  const { label, path, url, onClick } = props
  const router = useRouter()
  const selected = router.asPath === path // || router.pathname === path

  return (
    <Link
      scroll={false}
      onClick={() => (onClick ? onClick() : null)}
      href={url || path || ''}
      target={!!url ? '_blank' : ''}
      rel={!!url ? 'noopener noreferrer' : ''}
      className={
        (selected ? 'text-white underline' : 'text-zinc-300 hover:text-white hover:underline') +
        ' block py-2 px-3 lg:p-0 w-full lg:w-auto text-start lg:text-center text-sm rounded truncate hover:bg-zinc-700 lg:hover:bg-transparent'
      }
    >
      {label}
    </Link>
  )
}

export default SingleLink
