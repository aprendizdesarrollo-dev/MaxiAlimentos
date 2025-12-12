export default function EmpleadoLayout({
  sidebar,
  header,
  children,
  isOpen,
}) {
  return (
    <div className="min-h-screen bg-[#f6f6f6] overflow-hidden">
      {/* SIDEBAR */}
      {sidebar}

      {/* CONTENIDO */}
      <main
        className={`
          transition-all duration-300
          ${isOpen ? "ml-[260px]" : "ml-[110px]"}
          p-10
        `}
      >
        {/* HEADER SOLO SI SE ENVÍA */}
        {header && <div className="mb-8">{header}</div>}

        {/* CONTENIDO DEL MÓDULO */}
        {children}
      </main>
    </div>
  );
}
