"use client";

import { Tabs } from "@chakra-ui/react";
import { useState } from "react";
import LoginForm from "@/components/auth/LoginForm";
import SingnUpForm from "@/components/auth/SignupForm";

export default function Home() {
    const [value, setValue] = useState('loginForm');

    return (
        <Tabs.Root value={value} onValueChange={(e) => setValue(e.value)}>
        {/* <center> */}
            <Tabs.List>
            <Tabs.Trigger width='50%' value="loginForm">Login Up</Tabs.Trigger>
            <Tabs.Trigger width='50%'  value="signUpForm">Sign Up</Tabs.Trigger>
            </Tabs.List>
        {/* </center> */}
        <Tabs.Content value="loginForm">
          <LoginForm />
        </Tabs.Content>
        <Tabs.Content value="signUpForm">
          <SingnUpForm />
        </Tabs.Content>
      </Tabs.Root>
    );
};

//     const [value, setValue] = useState("login");

//   return (
//     <Tabs.Root value={value} onValueChange={(e) => setValue(e.value)}>
//       <Tabs.List>
//         <Tabs.Trigger value="login">
//           <LoginForm />
//         </Tabs.Trigger>
//         <Tabs.Trigger value="signUp">
//           <SingnUpForm />
//         </Tabs.Trigger>
//       </Tabs.List>

//       <Tabs.Content value="login">Login</Tabs.Content>
//       <Tabs.Content value="signUp">SignUp</Tabs.Content>
//     </Tabs.Root>
//   );