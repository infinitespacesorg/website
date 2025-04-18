import {
  Html,
  Body,
  Container,
  Text,
  Link,
  Heading,
} from "@react-email/components";

export const ResendEmailConfirmationTemplate = ({
  confirmationUrl,
}: {
  confirmationUrl: string;
}) => {
  return (
    <Html>
      <Body>
        <Container>
          <Heading>Confirm your email</Heading>
          <Text>
            Thanks for signing up with Infinite Spaces! Click below to confirm
            your email:
          </Text>
          <Link href={confirmationUrl}>Confirm email address</Link>
        </Container>
      </Body>
    </Html>
  );
};
