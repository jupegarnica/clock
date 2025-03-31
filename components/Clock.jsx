import React, { useState, useEffect } from "react";
import { styled } from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: ${(props) => props.color};
`;
const ClockStyled = styled.div`
  font-size: 7rem;
  margin-bottom: 1em;
  color: ${(props) => props.color};
`;
const Hours = styled.span``;
const Colon = styled.span`
  opacity: 0;
  animation: colon 6s alternate infinite;
  @keyframes colon {
    0% {
      opacity: 0.5;
    }
    30% {
      opacity: 0;
    }
    70% {
      opacity: 0;
    }
    100% {
      opacity: 0.5;
    }
  }
`;
const Minutes = styled.span``;
const Seconds = styled.span``;
const ColorStyled = styled.div`
  font-size: 1.4rem;
  font-family: 'Courier New', Courier, monospace;
  color: ${(props) => props.color};
  margin-top: 1rem;
`;

const Hashtag = styled.span`
  color: ${(props) => props.color};
  opacity: 0;
  margin-right: 0.5rem;
  animation: hashtag 6s alternate infinite;
  @keyframes hashtag {
    0% {
      opacity: 0;
    }
    30% {
      opacity: 0.5;
    }
    70% {
      opacity: 0.5;
    }
    100% {
      opacity: 0;
    }
  }
`;
const Clock = () => {
  const [time, setTime] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
      // setTime(new Date("2023-10-01T21:59:59Z"));
    }, 1000);

    return () => clearInterval(timer);
  }, []);
  const formattedTime =
    time &&
    new Intl.DateTimeFormat("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(time);
  const hours = time ? time.getHours() : 0;
  const minutes = time ? time.getMinutes() : 0;
  const seconds = time ? time.getSeconds() : 0;

  const backgroundColor = time ? colorFromTime(formattedTime) : "#000";
  const textColor = contrastTo(backgroundColor);
  const rgbColor = backgroundColor
    .replace("#", "")
    .match(/.{1,2}/g)
    .map((hex) => parseInt(hex, 16));
  const [r, g, b] = rgbColor;
  const hslColor = rgbColor.map((color) => color / 255);
  const h = Math.round(hslColor[0] * 360);
  const s = Math.round(hslColor[1] * 100);
  const l = Math.round(hslColor[2] * 100);

  return (
    <Container color={backgroundColor}>
      <ClockStyled color={textColor}>
        <Hashtag>#</Hashtag>
        <Hours>{String(hours).padStart(2, "0")}</Hours>
        <Colon>:</Colon>
        <Minutes>{String(minutes).padStart(2, "0")}</Minutes>
        <Colon>:</Colon>
        <Seconds>{String(seconds).padStart(2, "0")}</Seconds>
      </ClockStyled>
      <ColorStyled color={textColor}>rgb({r}, {g}, {b})</ColorStyled>
      <ColorStyled color={textColor}>hsl({h}, {s}, {l})</ColorStyled>
    </Container>
  );
};

function contrastTo(color) {
  const hex = color.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 128 ? "#000000" : "#FFFFFF";
}

function colorFromTime(time) {
  const [hours, minutes, seconds] = time
    .split(":")
    .map((unit) => String(unit).padStart(2, "0"));
  // Combine hours, minutes, and seconds into a hex color
  return `#${hours}${minutes}${seconds}`;
}

export default Clock;
