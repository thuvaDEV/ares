import { useRecoilState } from "recoil";
import { Modal, Typography } from "antd";
import { putWidgetData } from "../../data-com/api";
import {
  widgetDefsState,
  editModalVisibleState,
  widgetDefState,
} from "../../store/atoms";
import { replaceItemAtIndex } from "../../shared/util";

const { Paragraph } = Typography;

export default function EditWidgetModal() {
  const [modalVisible, setModalVisible] = useRecoilState(editModalVisibleState);
  const [widgetDef, setWidgetDef] = useRecoilState(widgetDefState);
  const [widgetDefs, setWidgetDefs] = useRecoilState(widgetDefsState);

  const handleOk = (e:any) => {
    const index = widgetDefs.findIndex((e) => e.id === widgetDef.id);
    const newList = replaceItemAtIndex(widgetDefs, index, widgetDef);
    setWidgetDefs(newList);
    setModalVisible(false);
    putWidgetData(widgetDef).then((data) => {
      console.log(data);
    });
  };

  const handleCancel = (e:any) => {
    setModalVisible(false);
  };

  const editItemText = (value:any) => {
    setWidgetDef({
      ...widgetDef,
      title: value,
    });
  };

  return (
    <Modal
      title={
        <Paragraph editable={{ onChange: editItemText }}>
          {widgetDef ? widgetDef.title : ""}
        </Paragraph>
      }
      visible={modalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
    ></Modal>
  );
}
