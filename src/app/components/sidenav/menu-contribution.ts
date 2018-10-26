export interface IMenuContribution {
    displayName: string;
    disabled?: boolean;
    iconName: string;
    route?: string;
    children?: IMenuContribution[];
  }
