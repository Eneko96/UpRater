export function pipe<T>(arr: T, pipe): T {
  return pipe.reduce((result, stage) => {
    return result[stage.action](
      typeof stage.args === 'object' ? { ...stage.args } : stage.args,
    );
  }, arr);
}
