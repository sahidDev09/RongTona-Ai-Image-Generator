// React import not required with modern JSX runtime

const Demo: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}>
      <video width="1080" height="620" controls>
        <source src="https://youtu.be/xOoAlRjTKTw" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default Demo;
