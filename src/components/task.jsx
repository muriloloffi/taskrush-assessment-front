/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useAxios } from "../helpers/useAxios";
import { workIntervalsRoute } from "../helpers/constants";

function Task({ task }) {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isRunning) {
        setElapsedTime((prevTime) => prevTime + 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
    const runningInterval = task.work_intervals.find(
      (interval) => !interval.end
    );
    if (runningInterval) {
      setIsRunning(true);
    }

    const elapsedTime = task.work_intervals.reduce((total, interval) => {
      if (interval.end) {
        return (
          total +
          (new Date(interval.end).getTime() -
            new Date(interval.start).getTime())
        );
      } else {
        return total + (Date.now() - new Date(interval.start).getTime());
      }
    }, 0);

    setElapsedTime(elapsedTime);
  }, [task]);

  const startClock = async () => {
    try {
      await useAxios.post(workIntervalsRoute, {
        user_id: task.owner_id,
        task_id: task.id,
      });
      setIsRunning(true);
    } catch (error) {
      console.error(error);
    }
  };

  const endClock = async () => {
    try {
      await useAxios.put(workIntervalsRoute, { user_id: task.owner_id });
      setIsRunning(false);
    } catch (error) {
      console.error(error);
    }
  };

  function formatClock(elapsedTime) {
    let date = new Date(elapsedTime);
    const seconds = date.getSeconds().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const hours = Math.floor(elapsedTime / (1000 * 60 * 60));

    return `${hours}:${minutes}:${seconds}`;
  }

  return (
    <div id={task.id} className="flex flex-row">
      <div>
        <img src={task.owner} alt="Owner" />
      </div>
      <h2>{task.title}</h2>
      <p>{task.description}</p>
      <div>{formatClock(elapsedTime)}</div>
      {isRunning ? (
        <button onClick={endClock}>Pause</button>
      ) : (
        <button onClick={startClock}>Start</button>
      )}
    </div>
  );
}

export default Task;
