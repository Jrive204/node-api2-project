import React, { useState, useEffect } from "react";
import "./App.scss";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import Axios from "axios";
import Loader from "react-loader-spinner";
import Data from "./Data";

function App() {
  const [user, setUser] = useState({ title: "", contents: "" });
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    Axios.get("http://localhost:5000/api/posts")
      .then(
        res =>
          console.log(res, "GET") &
          setData(res.data) &
          setTimeout(() => {
            setLoading(false);
          }, 1500)
      )
      .catch(err => console.log(err));
  }, [loading]);

  const handlesubmit = e => {
    e.preventDefault();
    Axios.post("http://localhost:5000/api/posts", user)
      .then(
        res =>
          console.log(res, "post") &
          setLoading(true) &
          setUser({ title: "", contents: "" })
      )
      .catch(err => console.log(err, "error"));
  };

  const handleEdit = id => {
    Axios.put(`http://localhost:5000/api/posts/${id}`, user)
      .then(
        res =>
          console.log(res, "post") &
          setLoading(true) &
          setUser({ title: "", contents: "" })
      )
      .catch(err => console.log(err, "post"));
  };
  const handleDelete = id => {
    Axios.delete(`http://localhost:5000/api/posts/${id}`)
      .then(
        res =>
          console.log(res, "delete") &
          setLoading(true) &
          setUser({ title: "", contents: "" })
      )
      .catch(err => console.log(err));
  };

  const handleChange = e => {
    e.preventDefault();
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div className='App'>
      <Form style={{ marginLeft: "8%" }} onSubmit={handlesubmit}>
        <FormGroup className='mb-2 mr-sm-2 mb-sm-0'>
          <Label className='mr-sm-2'>
            title:
            <Input
              type='text'
              name='title'
              placeholder='Name'
              value={user.title}
              onChange={handleChange}
            />
          </Label>
        </FormGroup>
        <FormGroup className='mb-2 mr-sm-2 mb-sm-0'>
          <Label className='mr-sm-2'>
            {console.log(user)}
            Info:
            <Input
              type='textarea'
              name='contents'
              placeholder='info'
              value={user.contents}
              onChange={handleChange}
            />
          </Label>
        </FormGroup>
        <Button>Submit</Button>
      </Form>
      <div
        style={{
          display: "flex",
          width: "50%",
          margin: "0 auto",
          flexWrap: "wrap"
        }}>
        {loading && (
          <div style={{ margin: "0 auto", marginTop: "10%" }}>
            <Loader
              type='Puff'
              color='#00BFFF'
              height={100}
              width={100}
              timeout={3000} //3 secs
            />
          </div>
        )}
        {data && !loading && (
          <>
            {data.map(ele => (
              <Data
                ele={ele}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                loading={loading}
                setLoading={setLoading}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
