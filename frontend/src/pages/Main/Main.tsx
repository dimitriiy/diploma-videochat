import { AppLayout } from "@/components/AppLayout/AppLayout.tsx";
import classes from "./styles.module.scss";
import { Modal, ModalActions, ModalContent } from "@/components/Modal";
import { TextField } from "@/components/Form/Form.tsx";
import { Button } from "@/components/Button";
import { useToggle } from "../../hooks";
import { useNavigate } from "react-router-dom";
import { authService } from "@/services/AuthService.ts";
import { RegisterModal } from "@/pages/Main/RegisterModal.tsx";
import { roomService } from "@/services/RoomService.ts";

export const Main = () => {
  const navigate = useNavigate();

  const [isShowModal, toggleModal] = useToggle();
  const [isShowRegisterModal, toggelRegisterModal] = useToggle();

  const createMeet = async () => {
    toggelRegisterModal();
  };

  const onSuccessCreateUser = async () => {
    if (!authService.user?.id) return;

    const room = await roomService.createRoom({ hostId: authService.user.id });
    if (!room) return;

    navigate(`/meet/${room.id}`);
  };
  return (
    <AppLayout>
      <div className={classes.mainControl}>
        <div className={classes.buttonControl}>
          <button className={classes.buttonControlItem} onClick={createMeet}>
            <span>
              <img src="../../src/assets/icons/camera.svg" alt="" />
            </span>
            <span>Создать видеовстречу</span>
          </button>
          <button className={classes.buttonControlItem} onClick={() => toggleModal(true)}>
            <span>
              <img src="../../src/assets/icons/users.svg" alt="" />
            </span>
            <span>Подключиться</span>
          </button>
        </div>
      </div>

      {isShowModal && (
        <Modal title="Укажите номер встречи или вставьте ссылку" onClose={toggleModal}>
          <ModalContent>
            <TextField label={""} value={""} />
          </ModalContent>
          <ModalActions>
            <Button stretch={true}>Подключиться</Button>
          </ModalActions>
        </Modal>
      )}

      {isShowRegisterModal && <RegisterModal toggleModal={toggelRegisterModal} onSuccess={onSuccessCreateUser} />}
    </AppLayout>
  );
};
