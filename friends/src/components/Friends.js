import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';


const Friends = ({props}) => {
console.log(props)

  return(
    <>
    <Card>
    <p>{props.name}</p>
     <p>{props.age}</p>
     <p>{props.email}</p>
  </Card>

    </>

  )





}

export default Friends;
