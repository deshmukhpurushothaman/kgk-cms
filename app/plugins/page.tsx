import PluginManagerUI from './PluginManagerUI';

export default function Plugins() {
  return (
    <div className="w-full p-4 mx-auto flex max-w-screen-xl flex-col">
      <div className="text-2xl font-bold">Plugins</div>
      <div>
        <PluginManagerUI />
      </div>
    </div>
  );
}
