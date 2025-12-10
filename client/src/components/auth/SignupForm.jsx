import {
  Button,
  Field,
  Fieldset,
  For,
  Input,
  NativeSelect,
  Stack,
} from "@chakra-ui/react";

import {
  PasswordInput,
  PasswordStrengthMeter,
} from "@/components/ui/password-input"


export default  function SingnUpForm(){
  return (
    <Fieldset.Root size="lg" maxW="md">
        <Stack>
            <center>
                <Fieldset.Legend>Welcome</Fieldset.Legend>
                <Fieldset.HelperText>        
                    Please provide your infos below.
                </Fieldset.HelperText>
            </center>
      </Stack>

      <Fieldset.Content>
        <Field.Root>
          <Field.Label>First Name</Field.Label>
          <Input name="first_name" />
        </Field.Root>

        <Field.Root>
          <Field.Label>Last Name</Field.Label>
          <Input name="last_name" />
        </Field.Root>
        <Field.Root required>
          <Field.Label>
            Email <Field.Root required></Field.Root>
          </Field.Label>
          <Input name="email" type="email" />
        </Field.Root>
        <Field.Root required>
          <Field.Label>
            Password
            <Field.RequiredIndicator />
          </Field.Label>
          <PasswordInput placeholder="md" size="md" />
        </Field.Root>
        <Field.Root required>
          <Field.Label>
            Confirm Password
            <Field.RequiredIndicator />
          </Field.Label>
          <PasswordInput placeholder="md" size="md" />
        </Field.Root>
      </Fieldset.Content>

      <Button type="submit" alignSelf="flex-start">
        Sign Up
      </Button>
    </Fieldset.Root>
  );
};
