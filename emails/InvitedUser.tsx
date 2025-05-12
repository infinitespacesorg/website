import {
  Html,
  Body,
  Container,
  Text,
  Link,
  Heading,
} from "@react-email/components";

export const ResendInvitedUserTemplate = ({
  confirmationUrl,
}: {
  confirmationUrl: string;
}) => {
  return (
    <Html>
      <Body>
        <Container>
          <Heading>You've Been Invited</Heading>
          <Text>A project administrator has invited you to collaborate on an Infinite Spaces project!</Text>
          <Text>
            Click the link below to sign up for an Infinite Spaces account and join the project:
          </Text>
          <Link href={confirmationUrl}>Sign Up</Link>
        </Container>
      </Body>
    </Html>
  );
};