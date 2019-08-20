import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Form, Field, withFormik, Formik } from 'formik';
import * as Yup from 'yup';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import { axiosWithAuth } from '../utils';

import Friends from './Friends';

const useStyles = makeStyles({
  card: {
    maxWidth: 500,
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    flexWrap: 'wrap'
  },
  media: {
    height: 200
  }
});

const FriendsList = ({ errors, touched, values, status }) => {
  const [friends, setFriends] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    axiosWithAuth()
      .get(`http://localhost:5000/api/friends`)
      .then(res => {
        setFriends(res.data);
        console.log('Get FriendsList', res.data);
      });
  }, [status]);

  return (
    <>
      <div className="container2">
        <Card className={classes.card}>
          <h2>Add New Friend</h2>
          <Form className="formCon">
            <Field type="text" name="name" placeholder="name..." />
            {touched.name && errors.name && (
              <p className="error">{errors.name}</p>
            )}
            <Field type="text" name="age" placeholder="age.." />
            {touched.age && errors.age && <p className="error">{errors.age}</p>}
            <Field type="email" name="email" placeholder="email.." />
            {touched.email && errors.email && (
              <p className="error">{errors.email}</p>
            )}

            <button className="button" type="submit">
              Add a new Friend!
            </button>
          </Form>
        </Card>
      </div>

      <div className="userCardCon">
        {friends.map(friend => (
          <Friends key={friend.id} props={friend} />
        ))}
      </div>
    </>
  );
};

//===== Time to use a Higher Order Component
const FormikFriendsList = withFormik({
  mapPropsToValues({ name, age, email }) {
    return {
      name: name || '',
      age: age || '',
      email: email || ''
    };
  },
  //=== ValidationSchema nice tool to inculde error messages

  validationSchema: Yup.object().shape({
    name: Yup.string().required('Please enter a name'),
    age: Yup.string().required('Please enter an age'),
    email: Yup.string().required('Please enter an email')
  }),
  handleSubmit(values, { resetForm, setStatus }) {
    axiosWithAuth()
      .post('http://localhost:5000/api/friends', values)
      .then(res => {
        console.log(res);
        console.log(values);
        setStatus(res.data);
        resetForm();
      })

      .catch(err => console.log(err));
  }
})(FriendsList);

export default FormikFriendsList;
