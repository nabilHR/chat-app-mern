import {
  Button,
  Field,
  Fieldset,
  For,
  Input,
  NativeSelect,
  Stack,
} from "@chakra-ui/react"

import {
  PasswordInput,
  PasswordStrengthMeter,
} from "@/components/ui/password-input"

export default function LoginForm() {
  function submitHandler(e)
  {
      e.preventDefault();
      const fd = new FormData(e.target);
      console.log({
        email: fd.get("email"),
        password: fd.get("password"),
      });
  }
  return (
    <form onSubmit={submitHandler}>
      <Fieldset.Root size="lg" maxW="md">
        <Stack>
          <center>
            <Fieldset.Legend color="blackAlpha.950">
              Welcome Back
            </Fieldset.Legend>
            <Fieldset.HelperText color="blackAlpha.600">
              Please provide your credentials.
            </Fieldset.HelperText>
          </center>
        </Stack>

        <Fieldset.Content>
          <Field.Root required>
            <Field.Label>
              Email
              <Field.RequiredIndicator />
            </Field.Label>
            <Input name="email" type="email" />
          </Field.Root>

          <Field.Root required>
            <Field.Label>
              Password
              <Field.RequiredIndicator />
            </Field.Label>
            <PasswordInput name="password" placeholder="password" size="md" />
          </Field.Root>
        </Fieldset.Content>

        <Button type="submit" alignSelf="flex-start">
          Log in
        </Button>
      </Fieldset.Root>
    </form>
  );
}
