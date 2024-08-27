
// SVG 파일들을 컴포넌트로 사용하기 위해 선언함
declare module '*.svg' {
    export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    const src: string;
    export default src;
  }