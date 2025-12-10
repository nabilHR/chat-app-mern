import { Fieldset, Field, Input, Button } from "@chakra-ui/react";
export default function Login({className}) {
  return (
    <Fieldset.Root size="lg" maxW="md" className={className}>
      <Fieldset.Legend>Login</Fieldset.Legend>

      <Fieldset.Content>
        <Field.Root>
          <Field.Label>Email</Field.Label>
          <Input name="email" type="email" />
        </Field.Root>

        <Field.Root>
          <Field.Label>Password</Field.Label>
          <Input name="password" type="password" />
        </Field.Root>
      </Fieldset.Content>

      <Button type="submit">Login</Button>
    </Fieldset.Root>
  );
}
