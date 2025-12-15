import { useState } from "react";
import CumpleaniosCard from "../../../../../../components/Cumpleanios/CumpleaniosCard";
import CumpleaniosModal from "../../../../../../components/Cumpleanios/CumpleaniosModal";

export default function CumpleaniosEmpleado({ data }) {

  const [open, setOpen] = useState(false);

  return (
    <>
      <CumpleaniosCard
        data={data}
        onVerMas={() => setOpen(true)}
      />

      {open && (
        <CumpleaniosModal
          data={data}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}
