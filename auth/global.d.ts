export interface global {}
declare global {
  var signin: () => Promise<string[]>;
}
