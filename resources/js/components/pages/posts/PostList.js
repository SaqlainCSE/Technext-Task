import axios from 'axios';
import React from 'react';
import { Container } from 'react-bootstrap';
import {Card, Button, Badge, Spinner} from 'react-bootstrap';

class PostList extends React.Component {
    state = { 
        PostList: [],
        isLoading: false,
     };

     componentDidMount() {

        this.setState({
            isLoading: true,
        });

         axios.get('http://127.0.0.1:8000/api/posts').then((res) => {

             const PostList = res.data.data;

             this.setState({
                 PostList,
                 isLoading: false,
             });
         });
     }

    render() { 
        console.log('coming render');
        return (
            <React.Fragment>
                <h2>
                    Post List <Badge variant="primary">{this.state.PostList.length}</Badge>
                </h2>
                <hr />

                {this.state.isLoading && 
                    <div className="text-center mt-5">
                        <Spinner animation="border" role="status" variant="primary">
                            <span className="sr-only">Loading...</span>
                        </Spinner>
                    </div> 
                }

                {this.state.PostList.map((post, index) => (
                    <Card className="mt-3" key={index}>
                        <Card.Header>
                            {post.name} <Badge variant="primary">{post.task_count}</Badge>
                        </Card.Header>

                        <Card.Body>
                            <Card.Text>
                                {post.description}
                            </Card.Text>

                            <Button variant="primary" className="ml-2">View</Button>
                            <Button variant="success" className="ml-2">Edit</Button>
                            <Button variant="danger" className="ml-2">Delete</Button>
                        </Card.Body>
                    </Card>
                ))}
            </React.Fragment>
        );
    }
}
 
export default PostList;