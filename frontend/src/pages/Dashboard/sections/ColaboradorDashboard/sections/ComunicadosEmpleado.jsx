import { useEmpleadoData } from "../hooks/useEmpleadoData";
import ComunicadosDashboard from "../../../../Comunicados/ComunicadosDashboard";

export default function ComunicadosEmpleado() {
    const { comunicados, loading } = useEmpleadoData();

    if (loading) return <p>Cargando...</p>;

    return (
        <ComunicadosDashboard
            soloLectura
            data={comunicados}
        />
    );
}
