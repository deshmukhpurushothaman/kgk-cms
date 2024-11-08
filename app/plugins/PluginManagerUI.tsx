'use client';
import { useState } from 'react';
import { pluginManager } from '@/app/plugins/PluginManager';
import Switch from '@mui/joy/Switch';

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
  console.log('enabledplugins ', enabledPlugins);
  return (
    <div>
      <h2 className="text-xl font-bold mt-4">Plugin Manager</h2>
      <div className="mt-6">
        <h3 className="font-bold mb-6">Available Plugins</h3>
        {availablePlugins.length > 0 ? (
          <ul>
            {availablePlugins.map((plugin) => (
              <li key={plugin.id} className="border rounded-md px-3 py-4 mb-3">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-lg ">{plugin.name} </span>

                    <div>{plugin.description}</div>
                  </div>

                  <div>
                    <Switch
                      checked={enabledPlugins.includes(plugin.name)}
                      onChange={() => handleTogglePlugin(plugin.name)}
                      endDecorator={
                        enabledPlugins.includes(plugin.name)
                          ? 'Active'
                          : 'Inactive'
                      }
                    />
                  </div>
                </div>
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
