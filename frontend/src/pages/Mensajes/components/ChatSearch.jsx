import { Search } from "lucide-react";

export default function ChatSearch({ value, onChange }) {
    return (
        <div className="w-full mb-4 px-1">
            <div className="
                flex items-center gap-3
                bg-white
                px-4 py-2.5
                rounded-2xl
                shadow-sm
                border border-gray-200
                focus-within:ring-2 focus-within:ring-[#397C3C]/30
                transition-all
            ">
                <Search size={18} className="text-gray-400" />

                <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="Buscar chat..."
                    className="
                        w-full
                        bg-transparent
                        outline-none
                        text-gray-700
                        placeholder-gray-400
                    "
                />
            </div>
        </div>
    );
}
