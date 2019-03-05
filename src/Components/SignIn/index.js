import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import axios from "axios";
import {tokenAdd, store} from '../../store.js';
import {connect} from 'react-redux';
import {Redirect } from "react-router-dom";
import './index.css';

let mapDispatchToProps = {tokenAdd}
let mapStateToProps = state =>({token: state.tok.token})

const validate = values => {
  const errors = {}
  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  if (!values.password) {
    errors.password = 'Required'
  }
  return errors
}

const RenderField = ({
  input,
  label,
  type,
  meta: { touched, error}
}) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} />
      {touched &&
        (error && <span className='error'>{error}</span>)}
    </div>
  </div>
)

let SignInForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props
  return (
    <form onSubmit={handleSubmit}>
      <Field name="email" type="email" component={RenderField} label="Email" />
      <Field name="password" type="password" component={RenderField} label="password" />
      <div>
        <button type="submit" disabled={submitting}>
          Submit
        </button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </button>
      </div>
    </form>
  )
}

SignInForm = reduxForm({
  form: 'signin',
  validate
})(SignInForm)

class SignIn extends Component {
  submit = values => {
    console.log(values)
    axios({
  			url: "https://test-app-a-level.herokuapp.com/auth/login",
  			method: "POST",
  			headers: {
  				"Content-Type": "application/json"
  			},
  			data: values
  		})
  			.then(res => {
          console.warn(res);
          this.props.tokenAdd(res.data.token)
        })
  			.catch(err => console.error(err.response.data.message))
  }
  render(){
    if (this.props.token){
      return (
        <Redirect to='/to-do' />
      )
    }
    return(
      <div>
        <SignInForm onSubmit={this.submit} />
      </div>
    )
  }
}
SignIn = connect(mapStateToProps, mapDispatchToProps)(SignIn)

export default SignIn
