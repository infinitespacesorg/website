import {
  Html,
  Body,
  Container,
  Text,
  Link,
  Heading,
  Button,
  Preview,
  Section,
  Img,
} from "@react-email/components";

export const ResendInvitedUserTemplate = ({
  confirmationUrl,
}: {
  confirmationUrl: string;
}) => {
  return (
    <Html>
      <Body style={body}>
        <Preview>Infinite Spaces Project Invitation</Preview>
        <Container style={container}>
          <Section style={logoSection}>
            <Img
              alt="Infinite Spaces logo"
              style={imageStyle}
              height={80}
              src={
                "https://dkljmdqtvrkrnjdtdsjw.supabase.co/storage/v1/object/public/website-storage//og-image.jpg"
              }
            />
          </Section>
          <Section style={contentSection}>
            <Heading style={heading}>You've Been Invited</Heading>
            <Text style={text}>
              A project administrator has invited you to collaborate on an
              Infinite Spaces project!
            </Text>
            <Text style={text}>
              Click the link below to sign up for an Infinite Spaces account and
              join the project:
            </Text>
            <Button href={confirmationUrl} style={button}>
              Sign Up
            </Button>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

const background = "#ffffff";
const foreground = "#030712";
const primary = "#111827";
const secondary = "#f3f4f6";
const border = "#e5e7eb";

// Styles
const body = {
  backgroundColor: background,
  color: foreground,
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
};

const container = {
  margin: "0 auto",
  backgroundColor: primary,
  padding: "20px",
};

const logoSection = {
  backgroundColor: foreground,
  padding: "20px 0",
  textAlign: "center" as const,
};

const contentSection = {
  backgroundColor: secondary,
  padding: "30px",
  borderRadius: "5px",
};

const imageStyle = {
  height: "80px",
  width: "173px",
  margin: "0 auto",
};

const heading = {
  fontSize: "24px",
  fontWeight: "bold",
  margin: "0 auto 20px auto",
  textAlign: "center" as const,
};

const text = {
  fontSize: "16px",
  marginBottom: "20px",
};

const button = {
  display: "block",
  width: "100%",
  borderRadius: "0.5rem",
  backgroundColor: foreground,
  color: background,
  fontWeight: "600",
  textAlign: "center" as const,
  padding: "12px 0",
  textDecoration: "none",
};