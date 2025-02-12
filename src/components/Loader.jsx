import { motion } from 'framer-motion';
import React from 'react';
import styled from 'styled-components';

import isLogo from "../assets/Svgs/isLogo.svg";
import isText from "../assets/Svgs/isText.svg";

const Container = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  touch-action: none;
  overflow: hidden;
  width: 100vw;
  height: 100vh;

  z-index: 6;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-color: black;

  width: 100%;

  @media (max-width: 48em) {
    svg{
      width: 20vw;
    }
  }

  svg {
    width: 10vw;

    height: auto;
    overflow: visible;
    stroke-linejoin: round;
    stroke-linecap: round;
    g {
      path {
        stroke: #fff;
      }
    }
  }
`;

const Loader = () => {
  return (
    <Container
      initial={{ y: 0, opacity: 1 }}
      exit={{ y: '100%', opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <img
        width="300"
        height="300"
        src={isLogo}
        alt="Logo"
        data-scroll
        data-scroll-speed="2"
      />
      
      <img
        width="400"
        src={isText}
        alt="Logo Text"
        data-scroll
        data-scroll-speed="2"
        initial="hidden" 
        animate="visible"
      />
    </Container>
  );
};

export default Loader;
