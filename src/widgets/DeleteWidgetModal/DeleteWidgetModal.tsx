import { useRecoilState, useRecoilValue } from "recoil";
import { Modal, Button } from "antd";
import { deleteWidgetDef, isMock } from "../../data-com/api";
import {
  widgetDefsState,
  deleteModalVisibleState,
  widgetDefState,
} from "../../store/atoms";

export default function DeleteWidgetModal() {
  const [modalVisible, setModalVisible] = useRecoilState(
    deleteModalVisibleState
  );
  const widgetDef = useRecoilValue(widgetDefState);
  const [widgetDefs, setWidgetDefs] = useRecoilState(widgetDefsState);

  const handleOk = (e: any) => {
    const newList = widgetDefs.filter((e) => e.id !== widgetDef.id);
    setWidgetDefs(newList);
    setModalVisible(false);

    if (!isMock()) {
      deleteWidgetDef(widgetDef).then((data: any) => {
        // console.log(data);
      });
    }
  };

  const handleCancel = (e: any) => {
    setModalVisible(false);
  };

  return (
    <Modal
      title="Title"
      visible={modalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button key="delete" type="primary" onClick={handleOk}>
          Delete
        </Button>,
      ]}
    ></Modal>
  );
}
