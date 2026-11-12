export default function RiskBadge({ level }) {
  let className = "badge";

  if (level.includes("Verified")) {
    className += " low";
  } else if (level.includes("Medium")) {
    className += " medium";
  } else if (level.includes("High")) {
    className += " high";
  } else {
    className += " critical";
  }

  return <span className={className}>{level}</span>;
}