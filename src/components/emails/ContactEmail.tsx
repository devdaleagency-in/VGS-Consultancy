import * as React from 'react';
import {
  Html,
  Body,
  Head,
  Heading,
  Hr,
  Container,
  Preview,
  Section,
  Text,
  Img,
  Link,
  Row,
  Column,
} from '@react-email/components';

interface EmailTemplateProps {
  name: string;
  email: string;
  phone: string;
  country: string;
  course: string;
  visaType: string;
  message: string;
}

export const AdminEmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  name, email, phone, country, course, visaType, message
}) => (
  <Html>
    <Head />
    <Preview>New Lead: {name} - {country}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <Heading style={headerText}>VGS GLOBAL</Heading>
          <Text style={tagline}>Beyond Boundaries • Beyond Limits</Text>
        </Section>
        
        <Section style={content}>
          <Heading style={h1}>New Inquiry Received</Heading>
          <Text style={paragraph}>
            Hi Team, a new consultation request has been submitted through the website.
          </Text>
          
          <Section style={infoCard}>
            <Text style={sectionTitle}>CANDIDATE DETAILS</Text>
            <Hr style={hr} />
            <Row style={row}>
              <Column style={labelCol}><Text style={label}>Name:</Text></Column>
              <Column><Text style={value}>{name}</Text></Column>
            </Row>
            <Row style={row}>
              <Column style={labelCol}><Text style={label}>Email:</Text></Column>
              <Column><Link href={`mailto:${email}`} style={link}>{email}</Link></Column>
            </Row>
            <Row style={row}>
              <Column style={labelCol}><Text style={label}>Phone:</Text></Column>
              <Column><Link href={`tel:${phone}`} style={link}>{phone}</Link></Column>
            </Row>
            <Row style={row}>
              <Column style={labelCol}><Text style={label}>Target:</Text></Column>
              <Column><Text style={value}>{country}</Text></Column>
            </Row>
            <Row style={row}>
              <Column style={labelCol}><Text style={label}>Interest:</Text></Column>
              <Column><Text style={value}>{course}</Text></Column>
            </Row>
            <Row style={row}>
              <Column style={labelCol}><Text style={label}>Visa Type:</Text></Column>
              <Column><Text style={value}>{visaType}</Text></Column>
            </Row>
          </Section>

          <Section style={messageBox}>
            <Text style={sectionTitle}>MESSAGE</Text>
            <Hr style={hr} />
            <Text style={messageText}>{message}</Text>
          </Section>

          <Link href="https://vgs.ind.in/admin" style={button}>
            View in Dashboard
          </Link>
        </Section>

        <Section style={footerSection}>
          <Text style={footerText}>
            © 2024 VGS Global. All rights reserved. <br />
            Musheerabad, Hyderabad, Telangana 500020
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export const UserEmailTemplate: React.FC<Readonly<{ name: string }>> = ({ name }) => (
  <Html>
    <Head />
    <Preview>Your study abroad journey begins with VGS Global</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <Heading style={headerText}>VGS GLOBAL</Heading>
        </Section>

        <Section style={content}>
          <Heading style={h1}>Hello {name},</Heading>
          <Text style={paragraph}>
            Thank you for choosing <strong>VGS Global</strong> for your study abroad journey. We've successfully received your inquiry!
          </Text>
          
          <Text style={paragraph}>
            Our expert counselor will review your requirements and reach out to you within 24 hours to book your free one-on-one consultation.
          </Text>

          <Section style={nextSteps}>
            <Text style={sectionTitle}>WHAT HAPPENS NEXT?</Text>
            <Hr style={hr} />
            <Text style={listItem}>• Profile evaluation by senior counselors</Text>
            <Text style={listItem}>• Personalized university recommendations</Text>
            <Text style={listItem}>• Complete visa & scholarship guidance</Text>
          </Section>

          <Text style={paragraph}>
            In the meantime, you can explore our latest success stories on Instagram.
          </Text>

          <Link href="https://vgs.ind.in" style={button}>
            Visit Our Website
          </Link>
        </Section>

        <Section style={footerSection}>
          <Text style={footerText}>
            VGS Global - Study Abroad Consultancy <br />
            Beyond Boundaries Beyond Limits
          </Text>
          <Hr style={hr} />
          <Text style={footerTextSmall}>
            If you have urgent queries, call us at +91 80968 32850
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

// --- STYLING ---

const main = {
  backgroundColor: '#f4f7f9',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif',
  padding: '40px 0',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  width: '600px',
  borderRadius: '12px',
  overflow: 'hidden',
  boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
};

const header = {
  backgroundColor: '#2563EB',
  padding: '30px',
  textAlign: 'center' as const,
};

const headerText = {
  color: '#ffffff',
  fontSize: '24px',
  letterSpacing: '2px',
  margin: '0',
  fontWeight: '800',
};

const tagline = {
  color: '#a0c4ff',
  fontSize: '10px',
  textTransform: 'uppercase' as const,
  letterSpacing: '1.5px',
  marginTop: '5px',
};

const content = {
  padding: '40px',
};

const h1 = {
  color: '#1a1a1a',
  fontSize: '22px',
  fontWeight: 'bold',
  marginBottom: '20px',
};

const paragraph = {
  color: '#444444',
  fontSize: '16px',
  lineHeight: '1.6',
  marginBottom: '20px',
};

const infoCard = {
  backgroundColor: '#f9f9f9',
  borderRadius: '8px',
  padding: '20px',
  marginBottom: '20px',
  border: '1px solid #eeeeee',
};

const sectionTitle = {
  color: '#2563EB',
  fontSize: '12px',
  fontWeight: 'bold',
  letterSpacing: '1px',
  marginBottom: '10px',
};

const hr = {
  borderColor: '#e5e5e5',
  margin: '10px 0 20px',
};

const row = {
  marginBottom: '10px',
};

const labelCol = {
  width: '100px',
};

const label = {
  color: '#777777',
  fontSize: '13px',
  fontWeight: 'bold',
  margin: '0',
};

const value = {
  color: '#1a1a1a',
  fontSize: '15px',
  margin: '0',
  fontWeight: '500',
};

const link = {
  color: '#0066cc',
  textDecoration: 'none',
  fontSize: '15px',
};

const messageBox = {
  backgroundColor: '#fffdf0',
  borderRadius: '8px',
  padding: '20px',
  marginBottom: '30px',
  border: '1px solid #f9e8a2',
};

const messageText = {
  color: '#333333',
  fontSize: '15px',
  lineHeight: '1.6',
  fontStyle: 'italic',
};

const button = {
  backgroundColor: '#2563EB',
  borderRadius: '6px',
  color: '#ffffff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  padding: '15px',
  margin: '20px 0',
};

const nextSteps = {
  backgroundColor: '#f0f7ff',
  borderRadius: '8px',
  padding: '20px',
  marginBottom: '30px',
  border: '1px solid #d0e3ff',
};

const listItem = {
  color: '#1a1a1a',
  fontSize: '14px',
  marginBottom: '8px',
};

const footerSection = {
  backgroundColor: '#f4f7f9',
  padding: '30px',
  textAlign: 'center' as const,
  borderTop: '1px solid #eeeeee',
};

const footerText = {
  color: '#777777',
  fontSize: '14px',
  lineHeight: '1.5',
  marginBottom: '15px',
};

const footerTextSmall = {
  color: '#aaaaaa',
  fontSize: '11px',
};
