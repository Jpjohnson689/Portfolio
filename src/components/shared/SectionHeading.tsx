interface SectionHeadingProps {
  title: string
  subtitle?: string
  light?: boolean
}

export function SectionHeading({ title, subtitle, light }: SectionHeadingProps) {
  return (
    <div className="text-center mb-12">
      <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${light ? 'text-white' : 'text-forest'}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`text-lg max-w-2xl mx-auto ${light ? 'text-mint' : 'text-slate'}`}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
