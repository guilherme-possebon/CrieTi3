import { Button } from "./components/Button";
import "./global.css";

function App() {
  return (
    <>
      <h1>Hello world</h1>
      <Button name={"Enviar"} style={"success"} />
      <Button name={"Deletar"} style={"danger"} />
      <Button name={"Restaurar"} style={"primary"} />
    </>
  );
}

export default App;
