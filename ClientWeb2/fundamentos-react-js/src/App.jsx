import { Post } from "./components/Post/Post";
import "./styles.css";

function App() {
  return (
    <>
      <Post autor="Bruno faller" conteudo="Text 01" />
      <Post autor="Gabriel" conteudo="Text 02" />
      <Post autor="João" conteudo="Text 03" />
      <Post autor="Marcelo" conteudo="Text 04" />
      <Post autor="Juca Bala" conteudo="Text 05" />
      <Post autor="Timelo" conteudo="Text 06" />
    </>
  );
}

export default App;
