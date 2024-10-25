import { mergeClasses } from '@nxenv/styleguide';

type Props = {
  className?: string;
};

nxenvrt function HandWaveIcon({ className }: Props) {
  return (
    <svg
      viewBox="0 0 15 16"
      className={mergeClasses('icon-sm stroke-icon-default', className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M5.964 2.335l.44-.333-.02-.025-.023-.024-.397.382zm0 0l.44-.333h0v.001l.002.003.01.013.037.049a72.92 72.92 0 00.66.854c.43.55 1.007 1.28 1.601 2 .596.72 1.199 1.42 1.682 1.914.217.223.397.39.533.498a.799.799 0 00.225-.397c.056-.227.043-.503-.004-.86l-.03-.22a6.239 6.239 0 01-.087-.91c.004-.408.097-.87.473-1.245.244-.243.617-.402.992-.409.405-.007.85.169 1.115.634l.102.18-.042.203c-.114.554-.08 1.446.007 2.108l.018.136c.2 1.52.431 3.27-.334 5.075-.404.953-1.255 2.002-2.356 2.622-1.126.635-2.545.83-3.972-.022-1.782-1.064-3.033-2.062-3.842-2.801-.405-.37-.7-.674-.895-.889a7.667 7.667 0 01-.271-.312 3.179 3.179 0 01-.464-.518 1.787 1.787 0 01-.295-.633 1.09 1.09 0 01.169-.879c.2-.283.462-.438.735-.504l-.802-.813-.01-.01a1.585 1.585 0 01-.131-.148 2.238 2.238 0 01-.262-.405C.798 5.977.654 5.435.96 4.87c.165-.303.402-.506.684-.602a2.496 2.496 0 01-.23-.646c-.077-.401-.031-.858.294-1.254.363-.44.863-.505 1.288-.42.335.067.661.23.942.407.056-.256.19-.51.46-.712.527-.396 1.083-.25 1.408-.089a2.132 2.132 0 01.537.383l.01.01.005.005.001.001h0l.001.001-.397.382z"
        strokeWidth={1.101}
      />
      <path
        d="M1.552 6.859l4.485 3.985M1.552 3.636L6.397 8.54M3.148 2.058l4.615 5.025"
        strokeWidth={0.826}
        strokeLinecap="round"
      />
    </svg>
  );
}
