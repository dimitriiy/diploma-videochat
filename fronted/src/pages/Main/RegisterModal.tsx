import { Modal, ModalActions, ModalContent } from "@/components/Modal";
import { TextField } from "@/components/Form/Form.tsx";
import { Button } from "@/components/Button";
import React from "react";
import { authService } from "@/services/AuthService.ts";
import { OverlayLoader } from "@/components/OverlayLoader";

interface Props {
  toggleModal: () => void;
  onSuccess: () => void;
}
export function RegisterModal({ toggleModal, onSuccess }: Props) {
  const [isLoading, setLoading] = React.useState(false);

  const [name, setName] = React.useState("");

  const onSubmit = async () => {
    try {
      setLoading(true);
      await authService.createTempUser({ name });

      onSuccess();
    } catch (e) {
      console.log(e, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal title="Укажите имя" onClose={toggleModal}>
      <ModalContent>
        <TextField value={name} onChange={(e) => setName(e.target.value)} />
      </ModalContent>
      <ModalActions>
        <Button onClick={onSubmit} disabled={!name}>
          ОК
        </Button>
      </ModalActions>
      {isLoading && <OverlayLoader />}
    </Modal>
  );
}
