export function Background(props: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg width="100%" height="100%" {...props}>
      <defs>
        <pattern
          id="circle"
          x="0"
          y="0"
          width="1200"
          height="3000"
          patternUnits="userSpaceOnUse"
          className={"text-cyan-950"}
        >
          <circle fill="currentColor" cx="500" cy="500" r="600"></circle>
        </pattern>
      </defs>

      <rect x="0" y="0" width="100%" height="100%" fill="url(#circle)"></rect>
    </svg>
  );
}
