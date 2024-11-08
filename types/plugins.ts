import NewPlugin from '@/app/plugins/NewPlugin';
import SamplePlugin from '@/app/plugins/SamplePlugin';

// types/plugins.ts
export interface Plugin {
  name: string;
  componentName: string;
  initialize?: () => void;
  addFields?: (post: any) => JSX.Element;
  modifyContent?: (content: string) => string;
}

export const availablePlugins = [
  {
    id: 1,
    name: 'Sample Plugin',
    description: 'A sample plugin for demonstration',
    instance: SamplePlugin,
    isEnabled: false,
  },
  {
    id: 2,
    name: 'New Plugin',
    description: 'This is a new custom plugin for the CMS.',
    instance: NewPlugin,
    isEnabled: false, // Default state
  },
];
