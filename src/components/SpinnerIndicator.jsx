const SpinnerIndicator = ({ width = 24, height = 24 }) => {
  return (
    <div
      className="border-2 border-gray-300 rounded-full animate-spin mb-2"
      style={{
        width,
        height,
        borderTopColor: "#003d28",
      }}
    ></div>
  );
};

export default SpinnerIndicator;
