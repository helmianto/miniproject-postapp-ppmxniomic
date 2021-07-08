import React, { useState, useEffect } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Segment, Grid, Container, Input, Pagination } from 'semantic-ui-react';
import API from './services';
import FormComponent from './components/FormComponent';
import PostComponent from './components/PostComponent';
// State Management
import { useSelector, useDispatch } from 'react-redux';
import ActionType from './redux/reducer/globalActionType';

const App = () => {
  const posts = useSelector(state => state.posts);
  const dispatch = useDispatch();
  // state post using local state
  // const [post, setPost] = useState([]);
  const [formPost, setFormPost] = useState({
    userId: 1,
    id: 1,
    title: '',
    body: ''
  });
  const [isUpdate, setIsUpdate] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const dataPerPage = 10;
  const pagesVisited = (activePage - 1) * dataPerPage;
  const pageCount = Math.ceil(posts.length / dataPerPage);

  const handlePaginationChange = (e, { activePage }) => {
    setActivePage(activePage);
  }

  useEffect(() => {
    getPostAPI();
  }, [])

  const getPostAPI = () => {
    API.getData().then(result => {
        // global state
        dispatch({
          type: ActionType.SET_POSTS,
          data: result
        });
        // state biasa
        // setPost(result);
    })
  }
  
  const putDataToAPi = () => {
    API.updateData(formPost, formPost.id)
    .then((res) => {
        getPostAPI();
        setIsUpdate(false);
        setFormPost({
          userId: 1,
          id: 1,
          title: '',
          body: ''
        });
    })
  }
  
  const postDataToAPI = () => {
    API.postData(formPost).then((res) => {
        getPostAPI();
        setFormPost({
          userId: 1,
          id: 1,
          title: '',
          body: ''
        });
    });
  }
  
  const handleRemove = (id) => {
    API.deleteData(id).then((res) => {
      getPostAPI();
    })
  }
  
  const handleUpdate = (data) => {
    setFormPost(data);
    setIsUpdate(true);
  }
  
  const handleFormChange = (event) => {
    let formPostNew = {...formPost};
    const date = new Date();
    let timestamp = date.getTime();
    if(!isUpdate) formPostNew['id'] = timestamp;
    formPostNew[event.target.name] = event.target.value;
    setFormPost(formPostNew);
  }
  
  const handleSubmit = () => {
    if(isUpdate) {
      putDataToAPi();
    } else {
      postDataToAPI();
    }
  }

  const handleSearch = (event) => {
    let postNew = [];
    let search = event.target.value;
    if (search !== ""){
      posts.forEach((item, index) => {
        if (item.title.toLowerCase().includes(search.toLowerCase())){
          postNew.push(item);
        }
      });
      // store to global state
      dispatch({
        type: ActionType.SET_POSTS,
        data: postNew
      });
      setActivePage(1);
      //store to local state
      // setPost(postNew);
    } else {
      getPostAPI();
    }
  }

  return (
      <div>
        <br />
        <Container>
          <Grid>
            <Grid.Row>
              <Grid.Column mobile={16} tablet={8} computer={8}>
                <Segment textAlign='center' color='teal'>
                  <h4>Form Input Post</h4>                 
                </Segment>
                <Segment>
                  <FormComponent 
                    formPost={formPost}
                    onChange={handleFormChange}
                    onSubmit={handleSubmit}
                  />
                </Segment>
              </Grid.Column>
              <Grid.Column mobile={16} tablet={8} computer={8}>
                <Segment textAlign='center' color='teal'>
                  <h4>Data Post</h4>                 
                </Segment>
                <Segment>
                  <Input onChange={handleSearch} icon='search' placeholder='Cari Catatan' />
                  <br />
                  <br />                  
                  { posts.slice(pagesVisited, pagesVisited + dataPerPage).length > 0 ? 
                    posts.slice(pagesVisited, pagesVisited + dataPerPage).map(data => {
                      return (
                        <PostComponent 
                          data={data}
                          onUpdate={handleUpdate}
                          onRemove={handleRemove}
                        />
                      );
                    })
                  : 
                    (
                      <Segment textAlign='center' color='red'>
                        <p>Data Post Tidak Ditemukan</p>
                      </Segment>
                    )
                  }          
                </Segment>                
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
        <br />
        <Container>
          <Grid>
            <Grid.Row>
              <Grid.Column mobile={16} tablet={8} computer={8}></Grid.Column>
              <Grid.Column mobile={16} tablet={8} computer={8}>
                <Segment>
                  <Pagination
                    activePage={activePage}
                    onPageChange={handlePaginationChange}
                    totalPages={pageCount}
                  />       
                </Segment>                
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
        <br />
        <br />
      </div>
    );
}

export default App;
