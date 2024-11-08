'use client';

import { availablePlugins } from '@/types/plugins';

// PluginManager.ts
export const pluginManager = {
  // availablePlugins: ['Sample Plugin', 'New Plugin'] as string[], // List of available plugins

  // Get all available plugins
  getAvailablePlugins() {
    return availablePlugins;
  },

  // Check if a plugin is enabled
  isEnabled(pluginName: string) {
    const enabledPlugins = JSON.parse(
      localStorage.getItem('enabledPlugins') || '{}'
    );
    return enabledPlugins[pluginName] === true;
  },

  // Enable a plugin
  enablePlugin(pluginName: string) {
    const enabledPlugins = JSON.parse(
      localStorage.getItem('enabledPlugins') || '{}'
    );
    enabledPlugins[pluginName] = true;
    localStorage.setItem('enabledPlugins', JSON.stringify(enabledPlugins));
  },

  // Disable a plugin
  disablePlugin(pluginName: string) {
    const enabledPlugins = JSON.parse(
      localStorage.getItem('enabledPlugins') || '{}'
    );
    enabledPlugins[pluginName] = false;
    localStorage.setItem('enabledPlugins', JSON.stringify(enabledPlugins));
  },

  // Get all enabled plugins
  getEnabledPlugins() {
    const enabledPlugins = JSON.parse(
      localStorage.getItem('enabledPlugins') || '{}'
    );
    return Object.keys(enabledPlugins).filter((key) => enabledPlugins[key]);
  },

  // Register a new plugin (adds to the list of available plugins)
  // register(pluginName: string) {
  //   if (!this.availablePlugins.includes(pluginName)) {
  //     this.availablePlugins.push(pluginName);
  //   }
  // },

  // Retrieve custom fields from enabled plugins (example logic)
  async getCustomFields(post: any, callback: Function) {
    const enabledPlugins = this.getEnabledPlugins(); // Retrieve enabled plugins
    const fields: any[] = [];

    for (const plugin of availablePlugins) {
      if (enabledPlugins.includes(plugin.name)) {
        try {
          const pluginModule = await import(
            `./${plugin.instance.componentName}`
          );
          if (pluginModule.default['addFields']) {
            fields.push(pluginModule.default['addFields'](post, callback)); // Call the function dynamically
          } else {
            console.warn(`Function addfields not found in ${plugin.instance}`);
          }
        } catch (error) {
          console.error(
            `Failed to load or call function addfields from ${plugin.name}`,
            error
          );
        }
      }
    }
    return fields;
  },
};
