/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useAxios } from "../helpers/useAxios";
import { routes } from "../helpers/constants";

function Task({ task }) {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isRunning) {
        setElapsedTime((prevTime) => prevTime + 1000);
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
      if (!interval.end) {
        return total + (Date.now() - Date.parse(interval.start + "Z"));
      }

      return total + (Date.parse(interval.end) - Date.parse(interval.start));
    }, 0);

    setElapsedTime(elapsedTime);
  }, [task]);

  const startClock = async () => {
    try {
      await useAxios.post(routes.workIntervalsRoute, {
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
      await useAxios.put(routes.workIntervalsRoute, { user_id: task.owner_id });
      setIsRunning(false);
    } catch (error) {
      console.error(error);
    }
  };

  function formatClock(elapsedTime) {
    const hours = Math.floor(elapsedTime / (1000 * 60 * 60))
      .toString()
      .padStart(2, "0");
    const minutes = Math.floor((elapsedTime / (1000 * 60)) % 60)
      .toString()
      .padStart(2, "0");
    const seconds = Math.floor((elapsedTime / 1000) % 60)
      .toString()
      .padStart(2, "0");

    return `${hours}:${minutes}:${seconds}`;
  }

  return (
    <div className="flex flex-row justify-between bg-white my-2 shadow h-20">
      <div className="h-full mx-4 max-h-12">
        <span>Owner:</span>
        <img
          title={task.owner.name}
          height={64}
          width={64}
          className="max-w-full h-full rounded-full my-0 mx-auto"
          src={task.owner.profile_picture_path ?? routes.emptyAvatar}
          alt="Owner"
        />
      </div>
      <div className="min-w-40 mx-2">
        <h2>{task.title}</h2>
      </div>
      <div className="min-w-48 w-full">
        <p>{task.description}</p>
      </div>
      <div className="flex flex-row">
        <div className="flex flex-row items-center m-4">
          {formatClock(elapsedTime)}
        </div>
        <div className="flex flex-row justify-between m-4">
          {isRunning ? (
            <button onClick={endClock}>⏸️</button>
          ) : (
            <button onClick={startClock}>▶️</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Task;
