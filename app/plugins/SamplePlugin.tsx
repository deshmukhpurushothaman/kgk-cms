// SamplePlugin.ts
import { Plugin } from '../../types/plugins';

const SamplePlugin: Plugin = {
  name: 'Sample Plugin',
  componentName: 'SamplePlugin',
  initialize() {
    console.log('Sample Plugin initialized!');
  },
  addFields(post) {
    return (
      <div key="sample-plugin" className="flex flex-col gap-y-3 w-full">
        <div>
          <label className="text-2xl font-bold">Sample Plugin:</label>
        </div>
        <div>
          <input
            type="text"
            onChange={(e) => (post.samplePlugin = e.target.value)}
            className="bg-transparent border border-gray-300 rounded-md min-h-12 w-full"
            placeholder="Sample Plugin"
          />
        </div>
      </div>
    );
  },
  modifyContent(content) {
    return content.replace(/badword/g, '****'); // Example content modification
  },
};

export default SamplePlugin;
