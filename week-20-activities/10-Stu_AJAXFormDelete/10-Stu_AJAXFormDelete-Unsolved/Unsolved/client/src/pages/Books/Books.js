import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import DeleteBtn from "../../components/DeleteBtn";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";

class Books extends Component {
  state = {
    books: [],
    title: "",
    author: "",
    synopsis: ""
  };

  componentDidMount() {
    this.loadBooks();
  }


  loadBooks = () => {
    API.getBooks()
      .then(res =>
        this.setState({ books: res.data, title: "", author: "", synopsis: "" })
      )
      .catch(err => console.log(err));
  };
  
  handleInputChange = event => {
    event.preventDefault();
    const { name, value} = event.target;
    //const name = event.target.name;
    //const value = event.target.value;

    //dynamic key definitions.
    //computed propert keys.
    this.setState({
      [name]: value
    })
  }

  deleteBook = id => {
    API.deleteBook(id)
    .then(res => this.loadBooks())
    .catch(err => console.log('Error: ', err));    
  }

  }

  handleFormSubmission = event => {
    event.preventDefault();

    if(this.state.title && this.state.author) {
      API.saveBook({
        title: this.state.title,
        author: this.state.author,
        synopsis: this.state.synopsis
      })
      .then(res => this.loadBooks())
      .catch(err => console.log('Error: ', err));    
      }
  }



  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>What Books Should I Read?</h1>
            </Jumbotron>
            <form>
              <Input name="title" value={this.state.title} onChange={this.handleInputChange} placeholder="Title (required)" />
              <Input name="author" value={this.state.author} onChange={this.handleInputChange} placeholder="Author (required)" />
              <TextArea name="synopsis" value={this.state.synopsis} onChange={this.handleInputChange} placeholder="Synopsis (Optional)" />
              <FormBtn disabled={!(this.state.author && this.state.title)} onClick={this.handleFormSubmission}>Submit Book</FormBtn>
            </form>
          </Col>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Books On My List</h1>
            </Jumbotron>
            {this.state.books.length ? (
              <List>
                {this.state.books.map(book => {
                  return (
                    <ListItem key={book._id}>
                      <a href={"/books/" + book._id}>
                        <strong>
                          {book.title} by {book.author}
                        </strong>
                      </a>
                      <DeleteBtn onClick={() => { this.deleteBook(book._id); }}/>
                    </ListItem>
                  );
                })}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Books;
