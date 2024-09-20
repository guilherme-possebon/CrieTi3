import styles from "./App.module.css";
import { Header } from "./components/Header/Header";
import { Post } from "./components/Post/Post";
import { Sidebar } from "./components/Sidebar/Sidebar";
import "./global.css";

function App() {
  return (
    <>
      <Header />

      <div className={styles.wrapper}>
        <Sidebar img="https://github.com/guilherme-possebon.png" />
        <main>
          <Post
            autor="Teste"
            conteudo="AAAA"
            img="https://github.com/guilherme-possebon.png"
          />
        </main>
      </div>
    </>
  );
}

export default App;
