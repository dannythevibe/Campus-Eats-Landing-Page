export default function StepCard({
  title,
  description,
  bgColor,
  textColor,
}: {
  title: string
  description: string
  bgColor: string
  textColor: string
}) {
  return (
    <div
      className={`${bgColor} p-8 rounded-3xl transition-all duration-500 hover:scale-105 hover:shadow-2xl cursor-pointer group min-h-[280px] flex flex-col justify-between`}
    >
      <div>
        <h3
          className={`${textColor} text-4xl font-bold mb-4 group-hover:translate-x-2 transition-transform duration-300`}
        >
          {title} &gt;
        </h3>
        <p className="text-white text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  )
}
