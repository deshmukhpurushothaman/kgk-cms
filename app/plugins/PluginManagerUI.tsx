'use client';
import { useState } from 'react';
import { pluginManager } from '@/app/plugins/PluginManager';

export default function PluginManagerUI() {
  const [availablePlugins, setAvailablePlugins] = useState(
    pluginManager.getAvailablePlugins()
  );
  const [enabledPlugins, setEnabledPlugins] = useState(
    pluginManager.getEnabledPlugins()
  );

  const handleRegisterPlugin = (pluginName: string) => {
    // pluginManager.register(pluginName);
    setAvailablePlugins(pluginManager.getAvailablePlugins());
  };

  const handleTogglePlugin = (pluginName: string) => {
    if (pluginManager.isEnabled(pluginName)) {
      pluginManager.disablePlugin(pluginName);
    } else {
      pluginManager.enablePlugin(pluginName);
    }
    setEnabledPlugins(pluginManager.getEnabledPlugins());
  };

  return (
    <div>
      <h2>Plugin Manager</h2>
      <div>
        <h3>Available Plugins</h3>
        {availablePlugins.length > 0 ? (
          <ul>
            {availablePlugins.map((plugin) => (
              <li key={plugin.id}>
                {plugin.name} -{' '}
                <button onClick={() => handleTogglePlugin(plugin.name)}>
                  {enabledPlugins.includes(plugin.name) ? 'Disable' : 'Enable'}
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No available plugins.</p>
        )}
      </div>
      {/* <div>
        <h3>Register New Plugin</h3>
        <input type="text" placeholder="Plugin Name" id="newPluginInput" />
        <button
          onClick={() => {
            const input = document.getElementById(
              'newPluginInput'
            ) as HTMLInputElement;
            if (input && input.value.trim()) {
              handleRegisterPlugin(input.value.trim());
              input.value = '';
            }
          }}
        >
          Register Plugin
        </button>
      </div> */}
    </div>
  );
}
