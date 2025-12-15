import { useState } from "react";
import BeneficiosCard from "../../../../../../components/Beneficios/BeneficiosCard";
import BeneficiosModal from "../../../../../../components/Beneficios/BeneficiosModal";
import { useEmpleadoData } from "../../hooks/useEmpleadoData";

export default function BeneficiosEmpleado() {
  const { beneficios } = useEmpleadoData();
  const [open, setOpen] = useState(false);

  return (
    <>
      <BeneficiosCard
        beneficios={beneficios}
        onVerMas={() => setOpen(true)}
        modoAdmin={false}
      />

      {open && (
        <BeneficiosModal
          data={beneficios}
          onClose={() => setOpen(false)}
          modoAdmin={false}
        />
      )}
    </>
  );
}
