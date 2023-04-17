"use client";
import { useRouter } from "next/navigation";
import { useUserContext } from "../context/state";
import Script from "next/script";

export default function ConnectEmbed({}) {
  const { userId, userToken, addUser } = useUserContext();
  const router = useRouter();

  function logout() {
    router.push("/");
  }

  function completed() {
    router.push("/venmo");
  }

  // Bruinen Connect should only be rendered once the script is ready and the window is available
  function renderConnect() {
    if (!userToken) {
      logout();
    }
    
    // Instantiate Bruinen Connect on the page — see the docs for more info:
    // https://docs.bruinen.co/api-reference/bruinen-connect
    // Since Connect is in a script, Typescript will complain that it can't find it on the window
    // The below line suppresses the warning: 
    //@ts-ignore
    new window.BruinenConnect({
      userToken: userToken,
      clientId: process.env.NEXT_PUBLIC_BRUINEN_CLIENT_ID,
      defaultRedirectUrl: window.location.host + "/success",
      sources: [
        { name: "venmo" },
      ],
      embedElementId: "connectContainer"
    });
  }

  return (
    <div>
      <div className="flex flex-col items-center justify-center w-screen h-screen">
        <div
          id="connectContainer"
          className="flex"
          style={{ height: "700px", width: "450px" }}
        />
        <div className="flex flex-row cursor-pointer" onClick={() => completed()}>
          <p>Continue</p>
        </div>
        <div className="flex flex-row cursor-pointer" onClick={() => logout()}>
          <p>Log out</p>
        </div>
      </div>
      <Script
        src="https://bruinen-connect-script.onrender.com/browser.js"
        onReady={() => renderConnect()}
      />
    </div>
  );
};