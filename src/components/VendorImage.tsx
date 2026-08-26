'use client'

interface VendorImageProps {
  src: string
  alt: string
  className?: string
  fallbackName?: string
}

export default function VendorImage({ src, alt, className = '', fallbackName = '' }: VendorImageProps) {
  return (
    <>
      <img
        src={src}
        alt={alt}
        className={className}
        onError={(e) => {
          const target = e.currentTarget
          target.style.display = 'none'
          const fallback = target.nextElementSibling as HTMLElement
          if (fallback) fallback.style.display = 'flex'
        }}
      />
      <div className="w-full h-full items-center justify-center bg-gradient-to-br from-brand-50 to-stone-100 hidden absolute inset-0">
        <div className="text-center">
          <span className="text-6xl block mb-2">🔥</span>
          {fallbackName && <span className="text-sm text-stone-400 font-medium">{fallbackName}</span>}
        </div>
      </div>
    </>
  )
}
