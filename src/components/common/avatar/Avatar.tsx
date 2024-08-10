import styles from "./avatar.module.css";

// Component to display gmail like user avatar based on the name
const Avatar: React.FC<{
  title: string;
  size?: number;
}> = ({ title, size = 0 }) => {
  return (
    <div
      style={{
        minWidth: size ? `${size}px` : "20px",
        minHeight: size ? `${size}px` : "20px",
        maxWidth: size ? `${size}px` : "20px",
        maxHeight: size ? `${size}px` : "20px",
        fontSize: size ? size * (30 / 100) : "16px",
      }}
      className={styles.avatar}
    >
      {title.split(" ")[0].charAt(0)}
      {title.split(" ")[1].charAt(0)}
    </div>
  );
};

export default Avatar;
