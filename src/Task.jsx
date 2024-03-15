/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import axios from 'axios';

function Task({ task }) {
    const [isRunning, setIsRunning] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            if (isRunning) {
                setElapsedTime(prevTime => prevTime + 1);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [isRunning]);

    useEffect(() => {
        const runningInterval = task.workIntervals.find(interval => !interval.stop);
        if (runningInterval) {
            setIsRunning(true);
        }

        const elapsedTime = task.workIntervals.reduce((total, interval) => {
            if (interval.stop) {
                return total + (interval.stop - interval.start);
            } else {
                return total + (Date.now() - interval.start);
            }
        }, 0);

        setElapsedTime(elapsedTime);
    }, [task]);

    const startClock = async () => {
        try {
            await axios.post('/api/work-interval', { ownerId: task.ownerId, taskId: task.id });
            setIsRunning(true);
        } catch (error) {
            console.error(error);
        }
    };

    const stopClock = async () => {
        try {
            await axios.put('/api/work-interval', { ownerId: task.ownerId });
            setIsRunning(false);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <img src={task.ownerIcon} alt="Owner" />
            <h2>{task.title}</h2>
            <p>{task.description}</p>
            <div>{elapsedTime}</div>
            {isRunning ? (
                <button onClick={stopClock}>Pause</button>
            ) : (
                <button onClick={startClock}>Start</button>
            )}
        </div>
    );
}

export default Task;