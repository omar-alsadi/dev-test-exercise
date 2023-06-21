"use client";
import { ChangeEvent, FC, useEffect, useState } from "react";

const Home: FC = () => {

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>): void => {
    // const emailText = e.target.value;
    setEmail(e.target.value);
    emailValidator(email);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
  }

  /**
  Validates an email address using a regular expression pattern.
  @param {string} email - The email address to be validated.
  @returns {boolean} - A boolean indicating whether the email is valid or not.
  */
  const emailValidator = (email: string): boolean => {

    // Regular expression pattern for email validation
    const emailPattern: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const isValid: boolean = emailPattern.test(email);

    // Check if the email value match the pattern and then set the error message if it does.
    setEmailError(!isValid ? "Invalid email address" : "");

    return isValid;
  };

  useEffect(() => {
    // Check if the emailValidator && passwordValidator are true
    // then the form is valid, this will help to make the submit button disabled or not
    if (emailValidator(email) && !!password) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false)
    }
  }, [email, password])

  return (
    <>
      <div className="login-container">
        <h1>Login</h1>
        <form>
          <div className="input-wrapper">
            <input
              className={`input ${emailError && email ? "invalid" : ""}`}
              type="email"
              placeholder="example@domain.com"
              value={email}
              // We can use onBlur if running the validation while user typing is noisy (for UX)
              onChange={handleEmailChange}
              required />
            {
              // To make sure that the invalid msg won't display if the input empty
              emailError && email &&
              <span className="invalid-text">Not a valid email!</span>
            }
          </div>

          <div className="input-wrapper">
            <input className="input"
              type="password"
              placeholder="********"
              value={password}
              onChange={handlePasswordChange}
              required />
          </div>

          <button
            className="btn"
            type="submit"
            disabled={!isFormValid}
          >Sign in</button>
        </form>
      </div>
    </>
  )
}

export default Home;
