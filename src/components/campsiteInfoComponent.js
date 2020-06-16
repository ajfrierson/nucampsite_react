import React, { Component } from "react";
import { Card, CardImg, CardText, CardBody, BreadcrumbItem, Breadcrumb, Button, ModalHeader, Modal, ModalBody,
Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from "react-redux-form";

const maxLength = len => val => !val || (val.length <= len);
const minLength = len => val => val && (val.length >= len);


//Functional Campsite component for rendering campsite information
function RenderCampsite({campsite}){
    return (
        <div className="col-md-5 m-1">
                <Card>
                    <CardImg top src={campsite.image} alt={campsite.name} />
                    <CardBody>
                        <CardText>{campsite.description}</CardText>
                    </CardBody>
                </Card>
        </div>
    );
}

class CommentForm extends Component {
    constructor(props){
        super(props);

        this.state = {
            isModalOpen: false,
        }
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values){
        this.toggleModal();
        console.log('Author: ' + (values.author) +" " + 'Comment: ' + (values.text));
        alert('Author: ' + (values.author) +" " +"," + 'Comment: ' + (values.text)  +"," + 'Rating: ' + (values.rating));
    }

   render(){
       return (
        <React.Fragment>
         <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={values => this.handleSubmit(values)}>
                            <div className="form-group ml-auto">
                            <Label md={4}>Rating</Label>
                                <Control.select model=".rating" id="rating" name="rating">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>
                            </div>
                            <div className="form-group ml-auto">
                                <Label htmlFor="author" md={8}>Your Name</Label>
                                <Control.text model=".author" id="author" name="author"
                                validators = {{
                                    maxLength: maxLength(15),
                                    minLength: minLength(2)
                                }}
                                />
                                <Errors 
                                    className="text-danger"
                                    model='.author'
                                    component = "div"
                                    messages = {{
                                        required: "Required",
                                        minLength: "Must be at least 2 characters",
                                        maxLength: "Must be 15 characters or less"
                                    }}
                                />
                            </div>
                            <div className="form-group ml-auto">
                                <Label md={8}>Comment</Label>
                                <Control.textarea model=".text" id="text" name="text" />
                            </div>
                            <Button type="submit" value="submit" color="primary">Submit</Button>
                        </LocalForm>
                    </ModalBody>
                </Modal>
        <Button outline isOpen={this.state.isModalOpen} onClick={this.toggleModal}><i class="fa fa-pencil" aria-hidden="true"></i>{" "}Submit Comments</Button>
       </React.Fragment> 
       );
   }
}


//Functional component to render comments and date
function RenderComments({comments}){
    if(comments) {
        return (
            <div className="col-md-5 m-1">
                <h3>Comments</h3>
                {comments.map(comment => {
                return (
                    <div key={comment.id}>
                        <p>{comment.text}<br />
                        --{comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))} 
                        </p>
                    </div>
                )})}
                <CommentForm />
            </div>
        );
    }
    return <div />
}
//The following code return comments and campsites to the DOM
function CampsiteInfo(props) {
    if (props.campsite) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <h2>{props.campsite.name}</h2>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <RenderCampsite campsite={props.campsite} />
                    <RenderComments comments={props.comments} />
                </div>
            </div>
        );
    }
    return <div />;
}



export default CampsiteInfo; 