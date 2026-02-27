export default function FeatureCard({
  icon,
  title,
  description,
}: { icon: string; title: string; description: string }) {
  return (
    <div className="relative bg-black text-white p-8 rounded-2xl transition-all duration-500 hover:shadow-2xl hover:scale-105 hover:-translate-y-2 group cursor-pointer overflow-hidden">
      <div className="absolute top-4 right-4 w-12 h-12 opacity-20">
        <svg viewBox="0 0 50 50" className="w-full h-full stroke-white stroke-2 fill-none">
          <line x1="0" y1="50" x2="50" y2="0" />
          <line x1="10" y1="50" x2="50" y2="10" />
        </svg>
      </div>
      <div className="absolute bottom-4 right-4 w-12 h-12 opacity-20">
        <svg viewBox="0 0 50 50" className="w-full h-full stroke-white stroke-2 fill-none">
          <line x1="0" y1="0" x2="50" y2="50" />
          <line x1="0" y1="10" x2="40" y2="50" />
        </svg>
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl group-hover:scale-110 transition-transform duration-300">{icon}</span>
          <h3 className="text-xl font-bold">{title}</h3>
        </div>
        <p className="text-gray-300 text-sm leading-relaxed group-hover:text-white transition-colors duration-300">
          {description}
        </p>
      </div>
    </div>
  )
}
