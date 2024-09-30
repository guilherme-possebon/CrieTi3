import styles from "./App.module.css";
import { Header } from "./components/Header/Header";
import { Post } from "./components/Post/Post";
import { Sidebar } from "./components/Sidebar/Sidebar";
import "./global.css";

function App() {
  let posts = [
    {
      author: "Guilherme Possebon 1",
      content: "Ola mundo",
      authorRole: "Dev Junior",
      img: "https://github.com/guilherme-possebon.png",
    },
    {
      author: "Guilherme Possebon 2",
      content: "Ola mundo",
      authorRole: "Dev Junior",
      img: "https://github.com/guilherme-possebon.png",
    },
    {
      author: "Guilherme Possebon 3",
      content: "Ola mundo",
      authorRole: "Dev Junior",
      img: "https://github.com/guilherme-possebon.png",
    },
  ];
  return (
    <>
      <Header />

      <div className={styles.wrapper}>
        <Sidebar img="https://github.com/guilherme-possebon.png" />
        <main className={styles.post}>
          {posts.length > 0 &&
            posts.map((post) => (
              <>
                <Post
                  author={post.author}
                  content={post.content}
                  authorRole={post.authorRole}
                  img={post.img}
                />
              </>
            ))}
        </main>
      </div>
    </>
  );
}

export default App;
