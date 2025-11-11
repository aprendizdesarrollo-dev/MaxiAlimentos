import { useState } from "react";
import {
    User,
    GraduationCap,
    Link as LinkIcon,
    Pencil,
    PlusCircle,
    Trash2,
} from "lucide-react";
import { toast } from "react-toastify";
import api from "../../services/api";

/**
 * Módulo PERSONAL
 * - Información general
 * - Enlaces sociales
 * - Educación
 */
export default function Personal({ perfil, user, fetchPerfil }) {
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    // ✅ Evita renderizar si no hay perfil todavía
    if (!perfil) {
        return <p className="text-gray-500">Cargando datos del perfil...</p>;
    }

    // ✅ Estado inicial seguro (evita errores .map)
    const [formData, setFormData] = useState({
        segundo_nombre: perfil?.segundo_nombre || "",
        nombre_preferido: perfil?.nombre_preferido || "",
        fecha_nacimiento: perfil?.fecha_nacimiento || "",
        genero: perfil?.genero || "",
        estado_civil: perfil?.estado_civil || "",
        direccion: perfil?.direccion || "",
        barrio: perfil?.barrio || "",
        ciudad: perfil?.ciudad || "",
        departamento: perfil?.departamento || "",
        pais: perfil?.pais || "Colombia",
        telefono: perfil?.telefono || "",
        correo_personal: perfil?.correo_personal || "",
        sociales: Array.isArray(perfil?.sociales) ? perfil.sociales : [],
        educaciones: Array.isArray(perfil?.educaciones) ? perfil.educaciones : [],
    });

    // Manejo de inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // ====== Enlaces sociales dinámicos ======
    const addSocial = () =>
        setFormData((prev) => ({
            ...prev,
            sociales: [...prev.sociales, { nombre: "", url: "" }],
        }));

    const updateSocial = (i, field, value) => {
        const updated = [...formData.sociales];
        updated[i][field] = value;
        setFormData((prev) => ({ ...prev, sociales: updated }));
    };

    const removeSocial = (i) =>
        setFormData((prev) => ({
            ...prev,
            sociales: prev.sociales.filter((_, idx) => idx !== i),
        }));

    // ====== Educación dinámica ======
    const addEducation = () =>
        setFormData((prev) => ({
            ...prev,
            educaciones: [
                ...prev.educaciones,
                { institucion: "", programa: "", fecha_inicio: "", fecha_fin: "" },
            ],
        }));

    const updateEducation = (i, field, value) => {
        const updated = [...formData.educaciones];
        updated[i][field] = value;
        setFormData((prev) => ({ ...prev, educaciones: updated }));
    };

    const removeEducation = (i) =>
        setFormData((prev) => ({
            ...prev,
            educaciones: prev.educaciones.filter((_, idx) => idx !== i),
        }));

    // ====== Guardar cambios ======
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSaving(true);

        try {
            const token = localStorage.getItem("token");
            const response = await api.put("/perfil", formData, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.data.success) {
                toast.success("Perfil actualizado correctamente");
                setIsEditing(false);
                fetchPerfil?.(); // recarga los datos actualizados
            } else {
                toast.error(response.data.message || "Error al guardar");
            }
        } catch (err) {
            console.error("Error al guardar perfil:", err);
            toast.error("No se pudo guardar el perfil");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-8 text-[15px] text-gray-700"
        >
            {/* ======= Encabezado ======= */}
            <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                <h2 className="text-xl font-semibold text-[#397C3C] flex items-center gap-2">
                    <User size={20} /> Información personal
                </h2>

                {/* Botón Editar */}
                {!isEditing && (
                    <button
                        type="button"
                        onClick={() => setIsEditing(true)}
                        className="flex items-center gap-2 bg-[#397C3C] text-white text-sm font-medium px-4 py-2 rounded-lg shadow hover:bg-[#2f612f] transition"
                    >
                        <Pencil size={16} /> Editar
                    </button>
                )}

                {/* Botón Guardar */}
                {isEditing && (
                    <button
                        type="submit"
                        disabled={isSaving}
                        onClick={handleSubmit}
                        className={`flex items-center gap-2 bg-[#397C3C] text-white px-5 py-2 rounded-xl font-medium transition 
      ${isSaving ? "opacity-70 cursor-not-allowed" : "hover:bg-[#2f612f]"}`}
                    >
                        {isSaving ? (
                            <>
                                <svg
                                    className="animate-spin h-4 w-4 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    />
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                    />
                                </svg>
                                Guardando...
                            </>
                        ) : (
                            <>Guardar</>
                        )}
                    </button>
                )}
            </div>

            {/* ======= 1. Información General ======= */}
            <SectionCard title="Información general">
                {!isEditing ? (
                    <div className="grid md:grid-cols-2 gap-3">
                        <FieldView label="Nombre">
                            {user.nombre}{" "}
                            {formData.segundo_nombre ? formData.segundo_nombre + " " : ""}
                            {user.apellido}
                        </FieldView>
                        <FieldView label="Nombre preferido">
                            {formData.nombre_preferido || "—"}
                        </FieldView>

                        <FieldView label="Correo corporativo">{user.correo}</FieldView>
                        <FieldView label="Correo personal">
                            {formData.correo_personal || "—"}
                        </FieldView>

                        <FieldView label="Teléfono">{formData.telefono || "—"}</FieldView>
                        <FieldView label="Fecha de nacimiento">
                            {formData.fecha_nacimiento
                                ? new Date(formData.fecha_nacimiento).toLocaleDateString("es-CO", {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                })
                                : "—"}
                        </FieldView>

                        <FieldView label="Género">{formData.genero || "—"}</FieldView>
                        <FieldView label="Estado civil">{formData.estado_civil || "—"}</FieldView>
                        <FieldView label="Dirección">{formData.direccion || "—"}</FieldView>
                        <FieldView label="Barrio">{formData.barrio || "—"}</FieldView>
                        <FieldView label="Ciudad">{formData.ciudad || "—"}</FieldView>
                        <FieldView label="Departamento">{formData.departamento || "—"}</FieldView>
                        <FieldView label="País">{formData.pais || "—"}</FieldView>

                        <FieldView label="Cargo">{user.cargo || "—"}</FieldView>
                        <FieldView label="Área">{user.area || "—"}</FieldView>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 gap-4">
                        <InputField label="Segundo nombre" name="segundo_nombre" value={formData.segundo_nombre} onChange={handleChange} />
                        <InputField label="Nombre preferido" name="nombre_preferido" value={formData.nombre_preferido} onChange={handleChange} />
                        <InputField label="Correo corporativo" value={user.correo} disabled />
                        <InputField label="Correo personal" name="correo_personal" value={formData.correo_personal} onChange={handleChange} />
                        <InputField label="Teléfono" name="telefono" value={formData.telefono} onChange={handleChange} />
                        <InputField type="date" label="Fecha de nacimiento" name="fecha_nacimiento" value={formData.fecha_nacimiento} onChange={handleChange} />
                        <SelectField label="Género" name="genero" value={formData.genero} onChange={handleChange} options={["Masculino", "Femenino", "Otro"]} />
                        <SelectField label="Estado civil" name="estado_civil" value={formData.estado_civil} onChange={handleChange} options={["Soltero", "Casado", "Unión libre", "Divorciado", "Viudo"]} />
                        <InputField label="Dirección" name="direccion" value={formData.direccion} onChange={handleChange} />
                        <InputField label="Barrio" name="barrio" value={formData.barrio} onChange={handleChange} />
                        <InputField label="Ciudad" name="ciudad" value={formData.ciudad} onChange={handleChange} />
                        <InputField label="Departamento" name="departamento" value={formData.departamento} onChange={handleChange} />
                        <InputField label="País" name="pais" value={formData.pais} onChange={handleChange} />
                        <InputField label="Cargo" value={user.cargo || ""} disabled />
                        <InputField label="Área" value={user.area || ""} disabled />
                    </div>
                )}
            </SectionCard>

            {/* ======= 2. Enlaces Sociales ======= */}
            <SectionCard title="Enlaces sociales" icon={<LinkIcon size={18} />}>
                {!isEditing ? (
                    formData.sociales?.length ? (
                        <ul className="space-y-2">
                            {formData.sociales.map((s, i) => (
                                <li key={i}>
                                    <strong>{s.nombre || "Enlace"}:</strong>{" "}
                                    {s.url ? (
                                        <a
                                            href={s.url?.startsWith("http") ? s.url : `https://${s.url}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[#397C3C] hover:underline"
                                        >
                                            {s.url}
                                        </a>
                                    ) : (
                                        "—"
                                    )}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500">Sin enlaces registrados</p>
                    )
                ) : (
                    <div className="space-y-4">
                        {formData.sociales.map((s, i) => (
                            <div key={i} className="grid md:grid-cols-[1fr_1fr_50px] gap-3">
                                <InputField label="Nombre del enlace" value={s.nombre} onChange={(e) => updateSocial(i, "nombre", e.target.value)} />
                                <InputField label="URL del enlace" value={s.url} onChange={(e) => updateSocial(i, "url", e.target.value)} />
                                <button type="button" onClick={() => removeSocial(i)} className="flex justify-center items-center text-red-500 hover:text-red-700 mt-6">
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        ))}
                        <button type="button" onClick={addSocial} className="flex items-center gap-2 text-[#397C3C] font-medium hover:underline">
                            <PlusCircle size={18} /> Añadir enlace
                        </button>
                    </div>
                )}
            </SectionCard>

            {/* ======= 3. Educación ======= */}
            <SectionCard title="Educación" icon={<GraduationCap size={18} />}>
                {!isEditing ? (
                    formData.educaciones?.length ? (
                        <ul className="space-y-2">
                            {formData.educaciones.map((e, i) => (
                                <li key={i}>
                                    <strong>{e.institucion || "Institución"}</strong> — {e.programa || "Programa"}
                                    <br />
                                    <span className="text-sm text-gray-500">
                                        {e.fecha_inicio || "—"} – {e.fecha_fin || "—"}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500">Sin registros de educación</p>
                    )
                ) : (
                    <div className="space-y-4">
                        {formData.educaciones.map((e, i) => (
                            <div key={i} className="grid md:grid-cols-[1.3fr_1.3fr_1fr_1fr_50px] gap-3">
                                <InputField label="Institución" value={e.institucion} onChange={(ev) => updateEducation(i, "institucion", ev.target.value)} />
                                <InputField label="Programa" value={e.programa} onChange={(ev) => updateEducation(i, "programa", ev.target.value)} />
                                <InputField type="date" label="Inicio" value={e.fecha_inicio} onChange={(ev) => updateEducation(i, "fecha_inicio", ev.target.value)} />
                                <InputField type="date" label="Fin" value={e.fecha_fin} onChange={(ev) => updateEducation(i, "fecha_fin", ev.target.value)} />
                                <button type="button" onClick={() => removeEducation(i)} className="flex justify-center items-center text-red-500 hover:text-red-700 mt-6">
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        ))}
                        <button type="button" onClick={addEducation} className="flex items-center gap-2 text-[#397C3C] font-medium hover:underline">
                            <PlusCircle size={18} /> Añadir educación
                        </button>
                    </div>
                )}
            </SectionCard>
        </form>
    );
}

/* ===================== */
/*  Subcomponentes UI    */
/* ===================== */

function SectionCard({ title, icon, children }) {
    return (
        <div className="bg-white rounded-2xl shadow-sm p-7">
            <h3 className="text-lg font-semibold text-[#397C3C] mb-4 flex items-center gap-2">
                {icon} {title}
            </h3>
            {children}
        </div>
    );
}

function FieldView({ label, children }) {
    return (
        <p>
            <strong>{label}:</strong> {children}
        </p>
    );
}

function InputField({ label, name, value, onChange, type = "text", disabled }) {
    return (
        <label className="flex flex-col text-sm">
            <span className="font-semibold text-[#397C3C] mb-1">{label}</span>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                disabled={disabled}
                className={`rounded-lg border px-3 py-2 focus:outline-none ${disabled
                    ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                    : "border-gray-300 focus:ring-2 focus:ring-[#397C3C]/60"
                    }`}
            />
        </label>
    );
}

function SelectField({ label, name, value, onChange, options = [], disabled }) {
    return (
        <label className="flex flex-col text-sm">
            <span className="font-semibold text-[#397C3C] mb-1">{label}</span>
            <select
                name={name}
                value={value}
                onChange={onChange}
                disabled={disabled}
                className={`rounded-lg border px-3 py-2 focus:outline-none ${disabled
                    ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                    : "border-gray-300 focus:ring-2 focus:ring-[#397C3C]/60"
                    }`}
            >
                <option value="">Seleccionar...</option>
                {options.map((op) => (
                    <option key={op} value={op}>
                        {op}
                    </option>
                ))}
            </select>
        </label>
    );
}
