import React from "react";
import styled from "styled-components";

const Section = styled.section`
  
  background-color: ${(props) => props.theme.body};
  color: ${(props) => props.theme.text};
  min-height: 50vh;

  margin: 0 auto;

  position: relative;

  display: flex;
  @media (max-width: 48em) {
    width: 90vw;
  }

  @media (max-width: 30em) {
    width: 100vw;
  }
`;

const Left = styled.div`
  width: 50%;
  font-size: ${(props) => props.theme.fontlg};
  font-weight: 300;
  position: relative;
  z-index: 5;
  margin-top: 15%;
  margin-left: 10%;

  @media (max-width: 64em) {
    width: 80%;

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) !important;
    margin: 0 auto;

    padding: 2rem;
    font-weight: 600;

    backdrop-filter: blur(2px);
    background-color: ${(props) => `rgba(${props.theme.textRgba},0.4)`};
    border-radius: 20px;
  }
  @media (max-width: 48em) {
    font-size: ${(props) => props.theme.fontmd};
  }
  @media (max-width: 30em) {
    font-size: ${(props) => props.theme.fontsm};
    padding: 2rem;
    width: 70%;
  }
`;


const Title = styled.h1`
  font-size: ${(props) => props.theme.fontxxxl};
  font-family: "Kaushan Script";
  font-weight: 200;
  /* text-transform: capitalize; */

  position: absolute;
  top: 1rem;
  left: 0%;
  z-index: 5;

  span {
    display: inline-block;
  }

  @media (max-width: 64em) {
    font-size: ${(props) => `calc(${props.theme.fontBig} - 5vw)`};
    top: 0;
    left: 0%;
  }
  @media (max-width: 48em) {
    font-size: ${(props) => props.theme.fontxxxl};
  }
`;

const Mission = () => {
  return (
    <Section id="fixed-target" className="mission">

      <Title>
        About Us
      </Title>
  
      <Left>
      We are spatial entertainment architects pursuing an ambitious mission to pioneer new forms of experience
      with cutting edge technology and interactive media.  We develop spatial stages for musicians, 
      visual artists and audiences to play together and experiences designed for live mass participation.
      </Left>

    </Section>
  );
};

export default Mission;
