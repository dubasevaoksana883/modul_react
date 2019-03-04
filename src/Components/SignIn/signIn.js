import React, { Component } from 'react';

class SignIn extends Component {
  state= {
    signIn:{
      email:{
        value:'',
        valid: false,
        config:{
          type: 'email',
          name: 'email',
          placeholder: "Enter your email"
        }
      },
      password: {
       value: "",
       valid: false,
       config: {
         type: "password",
         name: "password",
         placeholder: "Enter your password"
       },
     }
   },
    isValid: false
  }
  validator = value => {
    let isValid = true;
    isValid = value.trim() !== "" && isValid;
    isValid = value.length >= 5 && isValid;

    return isValid;
  };

check= e =>{
  const {name, value} = e.target
  let valid = this.validator(value)
  const otherValid = Object.keys(this.state.signIn).every(el => this.state.signIn[el].valid)
    this.setState({
      signIn: {
        ...this.state.signIn,
        [name]:{
          ...this.state.signIn[name],
          value, valid
        }
      },
      isValid: valid && otherValid
    })

}

  render(){
    const {signIn, isValid} = this.state;
    console.log(signIn)
    console.log(isValid)
    return(
    <div>
        <form className='from_sign'>
          {Object.keys(signIn)
            .map((el, ind)=>(<input key={ind} value={signIn[el].value} className="inp" name={signIn[el].config.name}
            placeholder={signIn[el].config.placeholder} type={signIn[el].config.type}
            onChange= {this.check} />))}
          <button type="submit" disabled={!isValid}>Sign in</button>
        </form>
      </div>
    )
  }
}
export default SignIn
