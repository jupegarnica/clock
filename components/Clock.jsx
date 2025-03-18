import React, { useState, useEffect } from "react";

function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.clock}>{time.toLocaleTimeString()}</div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#282c34",
  },
  clock: {
    fontSize: "5rem",
    color: "#61dafb",
    fontFamily: "monospace",
  },
};

export default Clock;
