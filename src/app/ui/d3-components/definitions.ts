export interface HorizontalBarProps {
  values: Array<{
    label: string;
    value: number;
  }>;
  values_symbol: string;
  x_label: string;
  y_label: string;
}