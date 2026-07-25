export default function StatsBar() {
  const stats = [
    {
      num: "1 Lakh+",
      label: "Happy Customers",
    },
    {
      num: "500+",
      label: "Verified Drivers",
    },
    {
      num: "100+",
      label: "Cities Covered",
    },
    {
      num: "4.4 ★",
      label: "Average Rating",
    },
  ];

  return (
    <section>
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-16">
    {stats.map((stat) => (
      <div
        key={stat.label}
        className="bg-white rounded-xl p-4 md:p-6 text-center shadow-sm hover:shadow-md transition-shadow"
      >
        <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary">
          {stat.num}
        </div>

        <div className="mt-2 text-sm sm:text-base text-gray-600 leading-tight">
          {stat.label}
        </div>
      </div>
    ))}
  </div>
</div>
    </section>
  );
}