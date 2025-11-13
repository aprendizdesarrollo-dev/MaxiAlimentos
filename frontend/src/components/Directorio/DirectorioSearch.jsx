const DirectorioSearch = ({ filtro, setFiltro }) => {
  return (
    <div className="relative">
      <input
        type="text"
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
        placeholder="Buscar por nombre o área..."
        className="w-full px-4 py-2 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#397C3C] transition"
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
        />
      </svg>
    </div>
  );
};

export default DirectorioSearch;
