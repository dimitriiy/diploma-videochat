import { AppLayout } from "@/components/AppLayout/AppLayout.tsx";
import classes from "./styles.module.scss";
import { Modal, ModalActions, ModalContent } from "@/components/Modal";
import { TextField } from "@/components/Form/Form.tsx";
import { Button } from "@/components/Button";
import React from "react";
import { useToggle } from "@/hook";
import { useNavigate } from "react-router-dom";

export const Main = () => {
  const navigate = useNavigate();

  const [isShowModal, toggleModal] = useToggle();

  const createMeet = () => {
    navigate("/meet");
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
          <button className={classes.buttonControlItem} onClick={toggleModal}>
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
    </AppLayout>
  );
};
