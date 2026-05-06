
import './css/App.css'
import MovieCard from "./components/MovieCard"
import Favorites from "./pages/Favorites"
import Home from "./pages/Home"
import {Routes, Route} from "react-router-dom"
import NavBar from "./components/NavBar"
import BlogList from "./pages/BlogList";
import Post from "./components/Post";
import CreateBlog from "./pages/CreateBlog";
import { initialBlogData } from "./data/blogData";

function App() {
  const [blogs, setBlogs] = useState(() => {
    const saved = localStorage.getItem("movie-blog-data");
    return saved ? JSON.parse(saved) : initialBlogData;
    useEffect(() => {
    localStorage.setItem("movie-blog-data", JSON.stringify(blogs));
  }, [blogs]);
    const addBlog = (newPost) => {
    setBlogs([newPost, ...blogs]);
  };
const deleteBlog = (id) => {
    setBlogs(blogs.filter((blog) => blog.blogID !== id));
  };
  return (
    <div>
      <NavBar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={ <Home />}/>
          <Route path="/favorites" element={ <Favorites/>}/>
          <Route path="/blog" element={<BlogList blogs={blogs} />} />
          <Route path="/blog/new" element={<CreateBlog addBlog={addBlog} />} />
          <Route 
            path="/blog/:id" 
            element={<Post blogs={blogs} deleteBlog={deleteBlog} />}
        </Routes>
      </main>
    </div>
  );
}


export default App
