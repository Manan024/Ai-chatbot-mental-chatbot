import { useState } from "react";
import { motion } from "framer-motion";

export default function BreathingModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [time, setTime] = useState(4);
  const steps = ["Inhale", "Hold", "Exhale"];
  const durations = [4, 7, 8]; // 4 seconds inhale, 7 hold, 8 exhale

  const startExercise = () => {
    setIsOpen(true);
    setStep(0);
    setTime(durations[0]);
    let count = durations[0];

    const interval = setInterval(() => {
      if (count <= 1) {
        let nextStep = (step + 1) % steps.length;
        setStep(nextStep);
        count = durations[nextStep];
      } else {
        count--;
      }
      setTime(count);
    }, 1000);

    setTimeout(() => clearInterval(interval), 19000); // Total cycle time
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <button
        onClick={startExercise}
        className="px-4 py-2 bg-indigo-500 text-white rounded-lg shadow-md hover:bg-indigo-600"
      >
        Start Breathing Support
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="bg-white p-6 rounded-lg shadow-lg text-center"
          >
            <h2 className="text-2xl font-semibold">{steps[step]}</h2>
            <p className="text-lg font-medium text-gray-600">{time}s</p>
            <button
              onClick={() => setIsOpen(false)}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Close
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
}
