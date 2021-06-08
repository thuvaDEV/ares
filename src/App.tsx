import { RecoilRoot } from "recoil";
import AppLayout from "./AppLayout";
import './App.less';


function App() {
  return (
    <RecoilRoot>
      <AppLayout />
    </RecoilRoot>
  );
}

export default App;
