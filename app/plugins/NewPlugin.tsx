import { Plugin } from '../../types/plugins'; // Importing the plugin interface type

const NewPlugin: Plugin = {
  name: 'New Plugin', // Unique name for the plugin
  componentName: 'NewPlugin',
  initialize() {
    console.log('New Plugin initialized!'); // Initialization logic, if any
  },
  addFields(post) {
    // Optionally add custom fields to posts/pages
    return (
      <div key="new-plugin-field">
        <label htmlFor="newCustomField">New Custom Field:</label>
        <input
          id="newCustomField"
          type="text"
          onChange={(e) => (post.newCustomField = e.target.value)}
        />
      </div>
    );
  },
  modifyContent(content) {
    // Modify the content of posts/pages (optional)
    return content.replace(/specificWord/g, 'replacement'); // Example content modification
  },
};

export default NewPlugin;
