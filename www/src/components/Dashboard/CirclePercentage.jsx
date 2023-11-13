import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const CirclePercentage = ({ percentage, textColor, circleColor, progressColor }) => {
  return (
    <div style={{ width: '100px', height: '100px' }}>
      <CircularProgressbar
        value={percentage}
        text={`${percentage}%`}
        strokeWidth={6}
        styles={buildStyles({
          textColor: textColor,
          pathColor: progressColor,
          trailColor: circleColor,
        })}
      />
    </div>
  );
};

export default CirclePercentage;