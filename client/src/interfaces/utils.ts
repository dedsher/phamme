export interface IconButtonProps {
  icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  label: string;
  isActive: boolean;
  handleClick: () => void;
  to?: string;
}
