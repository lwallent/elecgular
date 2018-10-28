export interface IMenuContribution {
    displayName?: string;
    displayKey?: string;
    disabled?: boolean;
    iconName: string;
    route?: string;

    action?: () => void;
    children?: IMenuContribution[];
  }
