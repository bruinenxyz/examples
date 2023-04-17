"use client";
import { FormEventHandler, useState } from "react";
import { useRouter } from "next/navigation";
import { useUserContext } from "./context/state";
import axios from "axios";

// The starter app only uses basic email format checking
// For your app, you should authenticate your users before creating a Bruinen account with their email
export default function Login({ isPr }: any) {
  const { userId, userToken, addUser } = useUserContext();

  const [email, setEmail] = useState("");
  const [emailLoading, setEmailLoading] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const router = useRouter();

  const handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault();
    setEmailLoading(true);
    setInvalidEmail(false);
    setEmailError(false);
    // Checks for valid email format
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      try {
        const res = await axios.get(`/api/user/create?email=${email}`);
        addUser(res.data.userId, res.data.userToken);
        router.push('/connect');
      } catch (error) {
        setEmailLoading(false);
        setEmailError(true);
      }
    } else {
      setEmailLoading(false);
      setInvalidEmail(true);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <form onSubmit={handleSubmit}>
        <div>
          <input
            id="email-address"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {invalidEmail && (
            <p className="mt-2 text-center text-error">
              Please enter a valid email
            </p>
          )}
          {emailError && (
            <p className="mt-2 text-center text-error">
              An error occured, please try again later
            </p>
          )}
        </div>
        <div>
          {!emailLoading && (
            <button
              type="submit"
              onClick={handleSubmit}
              className="relative flex justify-center w-full"
            >
              Submit
            </button>
          )}
          {emailLoading && (
            <div className="flex flex-row items-center justify-center">
              <h2>Sending...</h2>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};