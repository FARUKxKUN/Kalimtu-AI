"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import styled from "styled-components";

interface SendButtonProps {
  isLoading?: boolean;
  disabled?: boolean;
  type?: "button" | "submit";
}

const StyledButton = styled.button`
  font-family: inherit;
  font-size: 16px;
  background: #C1FF00;
  color: #0A0A0F;
  padding: 0.6875rem 2.2rem;
  padding-left: 1.2rem;
  display: flex;
  align-items: center;
  gap: 0.3em;
  border: none;
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.2s;
  cursor: pointer;
  font-weight: 600;
  height: fit-content;

  span {
    display: block;
    transition: all 0.3s ease-in-out;
  }

  svg {
    display: block;
    transform-origin: center center;
    transition: transform 0.3s ease-in-out;
    width: 20px;
    height: 20px;
  }

  .svg-wrapper-1 {
    display: flex;
    align-items: center;
  }

  .svg-wrapper {
    display: flex;
    align-items: center;
  }

  &:hover:not(:disabled) .svg-wrapper {
    animation: fly-1 0.6s ease-in-out infinite alternate;
  }

  &:hover:not(:disabled) svg {
    transform: translateX(1.2em) rotate(45deg) scale(1.1);
  }

  &:hover:not(:disabled) span {
    transform: translateX(5em);
  }

  &:active:not(:disabled) {
    transform: scale(0.95);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  @keyframes fly-1 {
    from {
      transform: translateY(0.1em);
    }
    to {
      transform: translateY(-0.1em);
    }
  }
`;

export const SendButton = ({ isLoading = false, disabled = false, type = "submit" }: SendButtonProps) => {
  return (
    <StyledButton type={type} disabled={disabled || isLoading}>
      <div className="svg-wrapper-1">
        <div className="svg-wrapper">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z" />
          </svg>
        </div>
      </div>
      <span>{isLoading ? "Sending..." : "Join Waitlist"}</span>
    </StyledButton>
  );
};
