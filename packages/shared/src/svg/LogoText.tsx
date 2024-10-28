import React, { ReactElement } from 'react';

interface LogoTextProps {
  className?: {
    container?: string;
    group?: string;
  };
}

export default function LogoText({ className }: LogoTextProps): ReactElement {
  return (
    <svg
      viewBox="0 0 72 18"
      xmlns="http://www.w3.org/2000/svg"
      className={className?.container}
    >
      <g fill="none" fillRule="evenodd">
        <path
          d="M2.636 5.892v5.827h3.201l.678 1.943H2.636A1.94 1.94 0 01.7 11.719V5.892A1.94 1.94 0 012.636 3.95h3.201v1.942h.678V2.007a.97.97 0 01.97-.971h.969v11.655a.97.97 0 01-.97.97h-.969V5.893H2.636zm9.692 7.77a1.94 1.94 0 01-1.936-1.943V9.777a1.94 1.94 0 011.936-1.942h3.201v1.942h.678V5.892h-5.33v-.971a.97.97 0 01.967-.971h4.363c1.071 0 1.939.87 1.939 1.942v6.799a.97.97 0 01-.97.97h-.969V9.778h-3.879v1.942h3.201l.678 1.943h-3.879zm7.756 0V4.92a.97.97 0 01.968-.971h.968v8.74a.97.97 0 01-.968.972h-.968zM22.02 2.014c0 .27-.093.499-.278.685a.927.927 0 01-.683.28c-.27 0-.5-.094-.69-.28a.923.923 0 01-.285-.685c0-.28.095-.513.285-.699.19-.186.42-.279.69-.279.27 0 .497.093.683.28a.95.95 0 01.278.698zm1.941 11.648V2.007a.97.97 0 01.968-.971h.968v11.655a.97.97 0 01-.968.97h-.968zm6.532.004l-2.613-8.22a.976.976 0 01.65-1.212l.92-.284 2.132 6.98 1.92-6.293a.96.96 0 011.201-.645l.888.284L32.3 15.201c-.248.816-1 1.374-1.85 1.374h-1.601a.97.97 0 01-.968-.97v-.972h1.609c.533 0 1.002-.432 1.004-.967z"
          fill="var(--theme-text-primary)"
          className={className?.group}
        />
        <path
          d="M38.75 13.788v-1.372h-1.408v1.372h1.407zm4.21.09c.683 0 1.261-.17 1.735-.513.473-.342.804-.8.992-1.372v1.795h1.165V4.297h-1.165v4.245a2.674 2.674 0 00-.992-1.372c-.474-.342-1.052-.513-1.734-.513-.623 0-1.178.145-1.664.436-.487.29-.869.71-1.146 1.257-.277.547-.416 1.189-.416 1.924 0 .735.139 1.374.416 1.917.277.543.66.96 1.146 1.251.486.29 1.04.436 1.664.436zm.333-1.026c-.716 0-1.29-.229-1.721-.686-.431-.458-.647-1.088-.647-1.892 0-.804.216-1.434.647-1.892.43-.457 1.005-.686 1.721-.686.461 0 .873.105 1.235.314.363.21.647.511.852.904.204.394.307.847.307 1.36 0 .513-.103.964-.307 1.353a2.23 2.23 0 01-.852.904c-.362.214-.774.321-1.235.321zm8.525 1.026c.589 0 1.118-.107 1.587-.32.47-.214.851-.514 1.146-.898a2.96 2.96 0 00.57-1.309h-1.242a1.777 1.777 0 01-.698 1.148c-.38.287-.851.43-1.414.43-.623 0-1.15-.201-1.581-.603-.431-.402-.66-1.005-.685-1.808h5.62c.033-.18.05-.394.05-.642a3.29 3.29 0 00-.403-1.616 3 3 0 00-1.165-1.167c-.507-.29-1.103-.436-1.785-.436-.674 0-1.272.145-1.792.436-.52.29-.928.71-1.222 1.257-.295.547-.442 1.189-.442 1.924 0 .735.147 1.374.442 1.917.294.543.701.96 1.222 1.251.52.29 1.118.436 1.792.436zm2.176-3.925H49.5c.034-.77.269-1.353.704-1.75.435-.398.973-.597 1.613-.597.4 0 .772.086 1.113.257.342.17.61.431.807.782.196.35.281.787.256 1.308zm6.105 3.835l2.752-7.041h-1.254l-2.176 5.797-2.202-5.797h-1.254l2.752 7.041h1.382z"
          fillOpacity={0.64}
          fill="var(--theme-text-primary)"
          fillRule="nonzero"
          className={className?.group}
        />
      </g>
    </svg>
  );
}