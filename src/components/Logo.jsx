//import { motion } from 'framer-motion';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import isLogoText from "../assets/Svgs/isLogoText.svg";

const Container = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
  z-index: 6;

  width: 100%;
  width: fit-content;

  a {
    width: 100%;
    display: flex;
    align-items: flex-end;
  }

  svg {
    width: 4rem;

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
/*
const Text = styled(motion.span)`
  font-size: ${(props) => props.theme.fontlg};
  color: ${(props) => props.theme.text};
  padding-bottom: 0.5rem;
`;

const pathVariants = {
  hidden: {
    opacity: 0,
    pathLength: 0,
  },
  visible: {
    opacity: 1,
    pathLength: 1,

    transition: {
      duration: 2,
      delay: 3, // 0
      ease: 'easeInOut',
    },
  },
};
const textVariants = {
  hidden: {
    opacity: 0,
    x: -50,
  },
  visible: {
    opacity: 1,
    x: -5,

    transition: {
      duration: 2,
      delay: 5, // 2
      ease: 'easeInOut',
    },
  },
};
*/
const Logo = () => {
  return (
    <Container>
      <Link to="/">
        <img src={isLogoText} height="48px" alt="Infinite Spaces" /> 
        {/*}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          enableBackground="new 0 0 24 24"
          height="48px"
          viewBox="0 0 24 24"
          width="48px"
          fill="none"
        >
          <g>
            <motion.path
              variants={pathVariants}
              initial="hidden"
              animate="visible"
              d="M12,17.27L18.18,21l-1.64-7.03L22,9.24l-7.19-0.61L12,2L9.19,8.63L2,9.24l5.46,4.73L5.82,21L12,17.27z"
            />
          </g>
        </svg>
        */}
        {/*
        <svg width="48px" height="48p" viewBox="0 0 311 301" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g>
        <path d="M255.318 68.804L161.927 0L-1.19209e-07 219.793L93.3917 288.597L255.318 68.804Z" fill="#CCCCCC"/>
        <path d="M234.989 300.755C276.742 300.755 310.589 266.907 310.589 225.155C310.589 183.402 276.742 149.555 234.989 149.555C193.236 149.555 159.389 183.402 159.389 225.155C159.389 266.907 193.236 300.755 234.989 300.755Z" fill="#789BDE"/>
        </g>
        </svg>
        
        <Text variants={textVariants} initial="hidden" animate="visible">
          Infinite Spaces
        </Text>
        */}
      </Link>
    </Container>
  );
};

export default Logo;
