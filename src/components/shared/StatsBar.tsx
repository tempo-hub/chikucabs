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
      <div className="max-w-5xl mx-auto px-4">
        <div className="stats-grid">
          {stats.map((stat) => (
            <div key={stat.label} className="stat-item">
              <div className="stat-number">{stat.num}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}