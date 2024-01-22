/** to be able to import and read directly the json file */

declare module '*.json' {
  const value: any;
  export default value;
}
