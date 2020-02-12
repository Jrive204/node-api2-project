import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardTitle,
  CardText,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import Axios from "axios";

const Data = ({ ele, handleEdit, handleDelete, loading, setLoading }) => {
  const [comment, setcomment] = useState({ text: "" });
  const [state, setstate] = useState([]);

  useEffect(() => {
    Axios.get(`http://localhost:5000/api/posts/${ele.id}/comments`)
      .then(
        res =>
          console.log(res, "GET") &
          setstate(res.data) &
          setTimeout(() => {
            setLoading(false);
          }, 1500)
      )
      .catch(err => console.log(err));
  }, [loading, setLoading, ele.id]);

  const handleChange = e => {
    e.preventDefault();
    setcomment({ ...comment, [e.target.name]: e.target.value });
  };

  const handlesubmit = e => {
    e.preventDefault();
    Axios.post(`http://localhost:5000/api/posts/${ele.id}/comments`, comment)
      .then(
        res =>
          console.log(res, "post") & setLoading(true) & setcomment({ text: "" })
      )
      .catch(err => console.log(err, "error"));
  };

  return (
    <div className='comments-container' style={{ width: "100%" }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Form onSubmit={handlesubmit}>
          <FormGroup className='mb-2 mr-sm-2 mb-sm-0'>
            <Label className='mr-sm-2'>
              {console.log(comment)}
              Comment:
              <Input
                type='textarea'
                name='text'
                placeholder='Text here'
                value={comment.text}
                onChange={handleChange}
              />
            </Label>
          </FormGroup>
          <Button color='info' size='sm'>
            Submit
          </Button>
        </Form>
      </div>

      <Card
        key={ele.id}
        body
        inverse
        style={{ backgroundColor: "#333", borderColor: "#333" }}>
        {console.log(state, "state")}
        <CardTitle>
          <h3>{ele.title}</h3>
        </CardTitle>
        <CardText>
          <h5>{ele.contents}</h5>
        </CardText>
        {state.length === 0 ? (
          <h4 style={{ textDecoration: "underline", marginBottom: "3%" }}>
            No Comments
          </h4>
        ) : (
          <CardText>
            <br />
            Comments :
            {state.map(data => (
              <p>
                {data.text} {data.post_id}
              </p>
            ))}
          </CardText>
        )}
        <Button onClick={() => handleEdit(ele.id)} color='warning'>
          Edit
        </Button>
        <Button onClick={() => handleDelete(ele.id)} color='danger'>
          Delete
        </Button>
      </Card>
    </div>
  );
};

export default Data;
