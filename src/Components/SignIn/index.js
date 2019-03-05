import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form'

let SignInForm = props => {
  const { handleSubmit } = props
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email</label>
        <Field name="email" component="input" type="email" />
      </div>
      <div>
        <label>Password</label>
        <Field name="password" component="input" type="password" />
      </div>
      <button type="submit">Submit</button>
    </form>
  )
}

SignInForm = reduxForm({

  form: 'signin'
})(SignInForm)

class SignIn extends Component {
  submit = (values) => {
    console.log("values",values)
  }
  render(){
    return(
      <div>
        <SignInForm handleSubmit={this.submit} />
      </div>
    )
  }
}
export default SignIn
