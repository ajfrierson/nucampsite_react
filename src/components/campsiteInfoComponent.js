import React from "react";
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

//Functional Campsite component for rendering campsite information
function RenderCampsite({campsite}){
    return (
        <div className="col-md-5 m-1">
                <Card>
                    <CardImg top src={campsite.image} alt={campsite.name} />
                    <CardBody>
                        <CardTitle>{campsite.name}</CardTitle>
                        <CardText>{campsite.description}</CardText>
                    </CardBody>
                </Card>
        </div>
    );
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
                    <RenderCampsite campsite={props.campsite}/>
                    <RenderComments comments={props.campsite.comments}/>
                </div>
            </div>
        );
    }
    return <div />;
}



export default CampsiteInfo; 