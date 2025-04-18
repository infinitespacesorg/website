import {
  Html,
  Body,
  Container,
  Text,
  Link,
  Heading,
} from "@react-email/components";

export const ResendResetPasswordTemplate = ({
  confirmationUrl,
}: {
  confirmationUrl: string;
}) => {
  return (
    <Html>
      <Body>
        <Container>
          <Heading>Reset your password</Heading>
          <Text>
            Click the link below to reset your Infinite Spaces account password:
          </Text>
          <Link href={confirmationUrl}>Reset Password</Link>
        </Container>
      </Body>
    </Html>
  );
};