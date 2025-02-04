declare module 'web-vitals' {
    export type ReportHandler = (metric: { name: string; value: number; delta: number; id: string }) => void;
    export function getCLS(onPerfEntry?: ReportHandler): void;
    export function getFID(onPerfEntry?: ReportHandler): void;
    export function getFCP(onPerfEntry?: ReportHandler): void;
    export function getLCP(onPerfEntry?: ReportHandler): void;
    export function getTTFB(onPerfEntry?: ReportHandler): void;
  }
  