import {
  Html,
  Body,
  Container,
  Text,
  Link,
  Heading,
} from "@react-email/components";

export const ResendConfirmUpdatedEmailTemplate = ({
  confirmationUrl,
}: {
  confirmationUrl: string;
}) => {
  return (
    <Html>
      <Body>
        <Container>
          <Heading>Confirm your updated email address</Heading>
          <Text>
            Click below to confirm new your email address:
          </Text>
          <Link href={confirmationUrl}>Confirm</Link>
        </Container>
      </Body>
    </Html>
  );
};