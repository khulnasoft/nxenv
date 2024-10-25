declare module '*.mdx' {
  let MDXComponent: (props: any) => JSX.Element;
  nxenvrt default MDXComponent;
}
