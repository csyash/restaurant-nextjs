"use client";
import { useState, useEffect } from "react";
import React from "react";
import Countdown from "react-countdown";

const date = new Date(2024, 0, 1, 11, 0, 0);
const CountDown = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return isLoaded && <Countdown date={date} />;
};

export default CountDown;
