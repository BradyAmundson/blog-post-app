import React, {useState, useEffect} from "react";
import {Container, Row, Col} from 'react-bootstrap'
import PostForm from './PostForm'
import PostList from './PostList'
import PostModal from './PostModal'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const [show, setShow] = useState(false)
  const [postId, setPostId] = useState('')

  useEffect(() => {
    setLoading(true)
    fetch('https://jsonplaceholder.typicode.com/posts')
  .then(response => response.json())
  .then(json => {
    setPosts(json)
    setLoading(false)
   })
  },[setLoading, setPosts])

  useEffect(() => {
    document.title = "Brady Blog App"
 }, [])

  function addPostToList(newPost) {
    setPosts([newPost, ...posts])
  }
  function deletePost(postId){
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId))
  }
  function displayPostInModal(postId){
    setPostId(postId)
    setShow(true)
  }
  function closePostModal(){
    setShow(false)
  }
  function Home() {
    return (
    <Container>
      <h2 style={{ textAlign: 'center', fontWeight: "bold"}}>Home</h2>
    <Row className="justify-content-md-center" style={{ marginTop: 60 }}>
    <Col xs lg="12">
      <h1 style={{ textAlign: 'center', backgroundColor: '#184a45ff', color: '#FFF', padding: '10px' , borderRadius: '25px' }}>Brady's Notes</h1>
    </Col>
  </Row>
  <Row className="justify-content-md-center" style={{ marginTop: 20 }}>
    <Col xs lg="12">
      <PostForm addPostToList={addPostToList} />
    </Col>
  </Row>
  <Row className="justify-content-md-center" style={{ marginTop: 20 }}>
    <Col xs lg="12">
      <PostList posts={posts} deletePost = {deletePost} displayPostInModal={displayPostInModal}/>
    </Col>
  </Row>
  <PostModal closePostModal={closePostModal} show={show} postId={postId} />
</Container>);
  }
  
  function About() {
    return (
      <Container>
    <h2 style={{ textAlign: 'center', fontWeight: "bold"}}>About</h2>
    </Container>);
  }
  
  function Users() {
    return (<h2 style={{ textAlign: 'center', fontWeight: "bold"}}>Users</h2>);
  }

  return (
<Container style={{ backgroundColor: '#FEA2A2', fontFamily: 'charcoal' }}>
  <Row>
  <Router>
      <div>
        <nav>
          <row>
              <h1 style={{ textAlign: 'center', display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
              <Link to="/" style={{ backgroundColor: '#182a45ff',color: '#FFF', padding: '10px' , borderRadius: '25px' }}>Home</Link>
              <Link to="/about" style={{ backgroundColor: '#182a45ff',color: '#FFF', padding: '10px' , borderRadius: '25px' }}>About</Link>
              <Link to="/users" style={{ backgroundColor: '#182a45ff',color: '#FFF', padding: '10px' , borderRadius: '25px' }}>Users</Link>
              </h1>
          </row>
        </nav>
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  </Row>
</Container>
  );
}

export default App;
