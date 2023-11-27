import { useToggle, upperFirst } from '@mantine/hooks';
// import { useForm } from '@mantine/form';
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  Divider,
  Checkbox,
  Anchor,
  Stack,
  Container,
} from '@mantine/core';
import { GoogleButton } from './GoogleButton';
import { TwitterButton } from './TwitterButton';
import LoginHooks from '../customHooks/Login';
import { useAppDispatch, useAppSelector } from '../../app/store';
import { useEffect } from 'react';
import { getUser } from '../../app/slice/User';
import { Navigate } from 'react-router-dom';

export function AuthenticationForm(props: PaperProps) {
  const { handleChange, handleSubmit, logins } = LoginHooks()
  const [type, toggle] = useToggle(['login', 'register']);
  const { user, loading, error } = useAppSelector(state => state.user)
  console.log("loading", loading)
  console.log("error", error)
  console.log("user", user)
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getUser())
  }, [dispatch])

  console.log("logins", logins)
  const token = localStorage.getItem("token")
  if (token) {
    return <Navigate to={'/'} />
  }

  return (
    <Container size={'xs'} my={40}>

      <Paper radius="md" p="xl" mx={"sm"} withBorder {...props}>
        <Text size="lg" fw={500}>
          Welcome to Mantine, {type} with
        </Text>

        <Group grow mb="md" mt="md">
          <GoogleButton radius="xl">Google</GoogleButton>
          <TwitterButton radius="xl">Twitter</TwitterButton>
        </Group>

        <Divider label="Or continue with email" labelPosition="center" my="lg" />

        <form onSubmit={handleSubmit}>
          <Stack>
            {type === 'register' && (
              <TextInput
                label="Name"
                name='name'
                placeholder="Your name"
                // value={form.values.name}
                onChange={
                  // (event) => {
                  // form.setFieldValue('name', event.currentTarget.value),
                  handleChange
                }
                radius="md"
              />
            )}

            <TextInput
              required
              label="Email"
              name='email'
              placeholder="hello@mantine.dev"
              // value={form.values.email}
              onChange={
                // (event) => {
                // form.setFieldValue('email', event.currentTarget.value),
                handleChange
                // }
              }
              // error={form.errors.email && 'Invalid email'}
              radius="md"
            />

            <PasswordInput
              required
              label="Password"
              name='password'
              type='password'
              placeholder="Your password"
              // value={form.values.password}
              onChange={
                // (event) => {
                // form.setFieldValue('password', event.currentTarget.value),
                handleChange
              }
              // error={form.errors.password && 'Password should include at least 6 characters'}
              radius="md"
            />

            {type === 'register' && (
              <Checkbox
                label="I accept terms and conditions"
              // checked={form.values.terms}
              // onChange={(event) => form.setFieldValue('terms', event.currentTarget.checked)}
              />
            )}
          </Stack>

          <Group justify="space-between" mt="xl">
            <Anchor component="button" type="button" c="dimmed" onClick={() => toggle()} size="xs">
              {type === 'register'
                ? 'Already have an account? Login'
                : "Don't have an account? Register"}
            </Anchor>
            <Button type="submit" radius="xl">
              {upperFirst(type)}
            </Button>
          </Group>
        </form>
      </Paper>
    </Container>

  );
}

