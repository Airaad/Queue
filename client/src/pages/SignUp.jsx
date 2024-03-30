import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { IoIosInfinite } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null); //state for errors
  const [loading, setLoading] = useState(false); // state for loading
  const navigate = useNavigate();
  function handleChange(event){
    setFormData({...formData, [event.target.id]: event.target.value.trim()});
  }

  async function handleSubmit(event){
    event.preventDefault();
    if(!formData.username || !formData.email || !formData.password){
      return setErrorMessage("Please fill out all fields");
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json(); //waits for the respones from the server and then parses it as json
      if (data.success === false) {
        return setErrorMessage(data.message);
      }
      setLoading(false);
      //res.ok indicates whether the HTTP response status code is in the range of 200 to 299, inclusive. This property is useful for checking whether the request was successful.
      if(res.ok){
        navigate("/sign-in");
      }
    } catch (error) {
      setErrorMessage(error.message); //error from the client side example if they dont have internet connection
      setLoading(false);
    }

  }
  return (
    <div className="min-h-screen mt-32   px-5 md:px-48">
    <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-6 max-w-lg mx-auto">
        <IoIosInfinite className=" self-center text-5xl fill-customGreen mr-1 pt-1  h-12"/>
          <h2 className="self-center font-semibold">Sign up with your email and password or with Google</h2>
          
          <div>
          <Label value="Your username"/>
            <TextInput type="text" placeholder="Username" id="username" onChange={handleChange}></TextInput>
          </div>

          <div>
            <Label value="Your email"/>
            <TextInput type="email" placeholder="name@company.com" id="email" onChange={handleChange}></TextInput>
          </div>

          <div>
          <Label value="Your password"/>
            <TextInput type="password" placeholder="Password" id="password" onChange={handleChange}></TextInput>
          </div>
          <Button type="submit" disabled={loading}>
          {
            loading ? (
                <>
                  <Spinner size='sm' />
                  <span className='pl-3'>Loading...</span>
                </>
              ) : (
                'Sign Up'
              )
          }
          </Button>
      
        </div>
    </form>
      <div className="mt-5 mx-auto max-w-lg text-sm">
        <span className="text-gray-500">Have an account? </span>
        <Link to="/sign-in" className="text-blue-500">Sign In</Link>
      </div>

      <div>
      {
        errorMessage && (
          <Alert className="mt-5" color="failure">{errorMessage}</Alert>
        )
      }
      </div>
    </div>
  )
}

