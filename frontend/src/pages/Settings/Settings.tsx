import { AppLayout } from "@/components/AppLayout/AppLayout.tsx";
import classes from "./styles.module.scss";
import { Form, FormField, TextField } from "@/components/Form/Form.tsx";
import { Select } from "@/components/Select";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/Button";

export const Settings = () => {
  const { id } = useParams<{ id: "user" | "video" }>();

  return (
    <AppLayout>
      <div className={classes.settings}>
        <div className={classes.settingsNav}>
          <ul className={classes.settingsTabs}>
            <li data-section="user" className={classes.settingsTabsItem}>
              <Link to="/settings/user">
                <img src="../../src/assets/icons/users.svg" alt="" /> Данные пользователя
              </Link>
            </li>
            <li data-section="settings" className={classes.settingsTabsItem}>
              <Link to="/settings/video">
                <img src="../../src/assets/icons/camera.svg" alt="" /> Настройки видео
              </Link>
            </li>
          </ul>
        </div>

        <div className={classes.settingsBlock}>
          {id === "user" && (
            <div className={classes.userSettings}>
              <div className={classes.userSettingsPic}>
                <img src="../../src/assets/avatar.png" alt="" />
                <Button>Загрузить</Button>
                <button className="button-base user-settings__pic-upload"></button>
              </div>
              <div className="user-settings__data">
                <form action="" className="form">
                  <Form>
                    <FormField>
                      <TextField value="Дмитрий" label="Имя" />
                    </FormField>
                    <FormField>
                      <TextField value="amsds@mail.ru" label="Email" />
                    </FormField>
                    <FormField>
                      <TextField value="" label="Старый пароль" />
                    </FormField>

                    <FormField>
                      <TextField value="" label="Новый пароль" />
                    </FormField>
                  </Form>
                  <Button>Сохранить</Button>
                </form>
              </div>
            </div>
          )}

          {id === "video" && (
            <div className={classes.deviceSettings}>
              <div className={classes.deviceSettingsRow}>
                <div className={classes.deviceSettingsLabel}>Микрофон</div>

                <Select
                  value=""
                  onChange={() => {}}
                  options={[
                    {
                      label: "Default - Внешние наушники (Built-in)",
                      value: "",
                    },
                    {
                      label: "Redmi 27 NU (DisplayPort)",
                      value: "",
                    },
                    {
                      label: "Microsoft Teams Audio Device (Virtual)",
                      value: "",
                    },
                  ]}
                />
              </div>
              <div className={classes.deviceSettingsRow}>
                <div className={classes.deviceSettingsLabel}>Вывод звука</div>

                <Select
                  value=""
                  onChange={() => {}}
                  options={[
                    {
                      label: "Default - Внешние наушники (Built-in)",
                      value: "",
                    },
                    {
                      label: "Redmi 27 NU (DisplayPort)",
                      value: "",
                    },
                    {
                      label: "Microsoft Teams Audio Device (Virtual)",
                      value: "",
                    },
                  ]}
                />
              </div>
              <div className="device-settings__row">
                <div className="device-settings__label">Камера</div>

                <Select
                  value=""
                  onChange={() => {}}
                  options={[
                    {
                      label: "Default - Внешние наушники (Built-in)",
                      value: "",
                    },
                    {
                      label: "Redmi 27 NU (DisplayPort)",
                      value: "",
                    },
                    {
                      label: "Microsoft Teams Audio Device (Virtual)",
                      value: "",
                    },
                  ]}
                />

                <div className="device-settings__camera-demo">
                  <video id="camera-stream" loop muted>
                    <source src="" />
                  </video>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
};
