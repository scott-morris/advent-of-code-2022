// Public

export default function runTimes(
  times: number,
  fn: (iteration: number) => void
): void {
  for (let i = 0; i < times; i += 1) {
    fn(i + 1);
  }
}
