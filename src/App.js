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
    setWorkouts((workouts) => [...workouts, workout]);
  }
  function handleDeleteWorkout(id) {
    setWorkouts((workouts) => workouts.filter((workout) => workout.id !== id));
  }

  return (
    <div className="container">
      <Greeting />
      <div className="content">
        <Form onAddWorkout={handleAddWorkout} />
        <Workouts onDeleteWorkout={handleDeleteWorkout} workouts={workouts} />
      </div>
    </div>
  );
}

function Form({ onAddWorkout }) {
  const [selectedWorkout, setSelectedWorkout] = useState("push");
  const [selectedExercise, setSelectedExercise] = useState("Bench Press");
  const [selectedSets, setSelectedSets] = useState(0);
  const [selectedReps, setSelectedReps] = useState(0);
  const [weight, setWeight] = useState(0);
  function addWorkout(e) {
    e.preventDefault();

    const newItem = {
      id: crypto.randomUUID(),
      category: selectedWorkout,
      exercise: selectedExercise,
      sets: selectedSets,
      reps: selectedReps,
      completed: false,
      weight: weight,
    };

    onAddWorkout(newItem);
    setSelectedWorkout("push");
    setSelectedExercise("Bench Press");
    setSelectedSets(0);
    setSelectedReps(0);
    setWeight(0);
  }
  //Workout Form JSX
  return (
    <form onSubmit={addWorkout} className="form">
      <label>Splits:</label>
      <select
        className="select"
        value={selectedWorkout}
        onChange={(e) => setSelectedWorkout(e.target.value)}
      >
        {SPLITS.map((split) => (
          <option key={split} value={split}>
            {split.toUpperCase()}
          </option>
        ))}
      </select>

      <label>Exercise:</label>
      <select
        className="select"
        value={selectedExercise}
        onChange={(e) => setSelectedExercise(e.target.value)}
      >
        {EXERCISES[selectedWorkout].map((exercise) => (
          <option key={exercise} value={exercise}>
            {exercise}
          </option>
        ))}
      </select>

      <label>Sets:</label>
      <select
        className="select"
        value={selectedSets}
        onChange={(e) => setSelectedSets(Number(e.target.value))}
      >
        {Array.from({ length: 15 }, (_, i) => i + 1).map((num) => (
          <option key={num} value={num}>
            {num}
          </option>
        ))}
      </select>

      <label>Reps:</label>
      <select
        className="select"
        value={selectedReps}
        onChange={(e) => setSelectedReps(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option key={num} value={num}>
            {num}
          </option>
        ))}
      </select>

      <label>Weight:</label>
      <input
        className="input"
        value={weight}
        onChange={(e) => setWeight(Number(e.target.value))}
      />

      <button>Set Workout!</button>
    </form>
  );
}

function Workouts({ workouts, onDeleteWorkout }) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Category</th>
          <th>Exercise</th>
          <th>Sets</th>
          <th>Reps</th>
          <th>Completed</th>
          <th>Weight</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {workouts.map((item) => (
          <tr key={item.id}>
            <Workout onDeleteWorkout={onDeleteWorkout} item={item} />
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function Workout({ item, onDeleteWorkout }) {
  // I want to make a table here.
  return (
    <>
      <td>{item.category}</td>
      <td>{item.exercise}</td>
      <td>{item.sets}</td>
      <td>{item.reps}</td>
      <td>{item.completed ? "✅ Completed" : "⏳ Not Completed"}</td>
      <td>{item.weight}</td>
      <td>
        <button className="edit-btn">Edit</button>
      </td>
      <td>
        <button className="delete-btn" onClick={() => onDeleteWorkout(item.id)}>
          Delete
        </button>
      </td>
    </>
  );
}
