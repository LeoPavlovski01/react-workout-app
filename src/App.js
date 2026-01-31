import Greeting from "./Greeting";
import { useState } from "react";

// Data
//1. Display the options ( SPLITS data ) after that based on the selection pick the exercise.
const SPLITS = ["push", "pull", "legs"];

const EXERCISES = {
  push: ["Bench Press", "Incline DB Press", "Overhead Press", "Dips"],
  pull: ["Pull-ups", "Barbell Row", "Lat Pulldown", "Face Pull"],
  legs: ["Squat", "Leg Press", "Romanian Deadlift", "Calf Raises"],
};

const WORKOUTS = [
  {
    id: crypto.randomUUID(),
    category: "legs",
    exercise: "Romanian Deadlift",
    sets: 4,
    reps: 12,
    completed: false,
    weight: 100,
  },
  {
    id: crypto.randomUUID(),
    category: "push",
    exercise: "Bench Press",
    sets: 4,
    reps: 12,
    completed: false,
    weight: 80,
  },
  {
    id: crypto.randomUUID(),
    category: "pull",
    exercise: "Barbell Row",
    sets: 4,
    reps: 12,
    completed: false,
    weight: 80,
  },
];

export default function App() {
  const [workouts, setWorkouts] = useState(WORKOUTS);

  function handleAddWorkout(workout) {
    setWorkouts((workout) => [...workouts, workout]);
  }

  return (
    <div>
      <Greeting />
      <Form onAddWorkout={handleAddWorkout} />
      <Workouts workouts={workouts} />
    </div>
  );
}

function Form({ onAddWorkout }) {
  const [selectedWorkout, setSelectedWorkout] = useState("push");
  const [selectedExercise, setSelectedExercise] = useState("");
  function addWorkout(e) {
    e.preventDefault();

    const newItem = {
      id: crypto.randomUUID(),
      category: selectedWorkout,
      exercise: selectedExercise,
    };

    onAddWorkout(newItem);
  }
  //Workout Form JSX
  return (
    <form>
      <div>
        <label>Splits:</label>
        <select
          value={selectedWorkout}
          onChange={(e) => setSelectedWorkout(e.target.value)}
        >
          <option value="push">{SPLITS[0].toUpperCase()}</option>
          <option value="pull">{SPLITS[1].toUpperCase()}</option>
          <option value="legs">{SPLITS[2].toUpperCase()}</option>
        </select>
        <label>Exercise:</label>
        <select
          value={selectedExercise}
          onChange={(e) => setSelectedExercise(e.target.value)}
        >
          {selectedWorkout &&
            EXERCISES[selectedWorkout].map((exercise) => (
              <option key={exercise} value={exercise}>
                {exercise}
              </option>
            ))}
        </select>
        {/*    Sets  & REPS needs to be displayed*/}
      </div>
      <button>Set Workout!</button>
    </form>
  );
}

function Workouts({ workouts }) {
  return (
    <div>
      <h1>Your Workouts Here:</h1>
      <ul>
        {workouts.map((workout) => (
          <Workout item={workout} />
        ))}
      </ul>
    </div>
  );
}
function Workout({ item }) {
  return (
    <li key={item.id}>
      <span>{item.category} </span>
      <span>{item.exercise} </span>
      <span>{item.sets} </span>
      <span>{item.reps} </span>
      <span>{item.completed} </span>
      <span>{item.weight} </span>
    </li>
  );
}
