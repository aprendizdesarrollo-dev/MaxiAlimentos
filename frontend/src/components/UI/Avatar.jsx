export default function Avatar({
    src = null,
    size = "md",          // sm | md | lg
    showStatus = false,   // muestra punto verde si está en línea
    online = false,       // estado real
}) {

    // Tamaños de avatar
    const sizes = {
        sm: "w-10 h-10",
        md: "w-12 h-12",
        lg: "w-14 h-14",
    };

    const sizeClass = sizes[size] || sizes.md;

    return (
        <div className="relative">
            {/* FOTO */}
            {src ? (
                <img
                    src={`http://127.0.0.1:8000/storage/${src}`}
                    className={`${sizeClass} rounded-full object-cover shadow-sm border`}
                />
            ) : (
                /* SIN FOTO */
                <div
                    className={`
                        ${sizeClass}
                        rounded-full 
                        flex flex-col items-center justify-center
                        border border-dashed border-gray-400
                        bg-gray-100 text-gray-500
                        text-[10px] font-medium
                        select-none
                    `}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4 mb-[2px] opacity-60"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-9A2.25 2.25 0 002.25 5.25v9A2.25 2.25 0 004.5 16.5h3m1.5-7.5l3 3 3-3m-3 3V3"
                        />
                    </svg>
                    Sin foto
                </div>
            )}

            {/* ESTADO EN LÍNEA (OPCIONAL) */}
            {showStatus && (
                <span
                    className={`
                        absolute bottom-0 right-0
                        w-3 h-3 rounded-full border-2 border-white
                        ${online ? "bg-green-500" : "bg-gray-400"}
                    `}
                ></span>
            )}
        </div>
    );
}
