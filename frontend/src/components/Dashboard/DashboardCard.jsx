export default function DashboardCard({ title, children, className }) {
  return (
    <div
      className={`bg-white rounded-2xl shadow-md p-10 hover:shadow-xl transition-all duration-300 ${className}`}
    >
      <h3 className="text-2xl font-bold text-[#397C3C] mb-4">{title}</h3>
      {children}
    </div>
  );
}
