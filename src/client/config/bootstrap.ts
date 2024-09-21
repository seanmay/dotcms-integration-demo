(() => {
  const import_path = "config/importmap.json";

  const set_importmap = (text: string) => {
    const script = document.createElement("script");
    script.type = "importmap";
    script.textContent = text;
    document.head.append(script);
  };

  const bootstrap_application = () => {
    // for raw build, just append importmap and import @main
    fetch(import_path).then(res => res.text())
      .then(set_importmap)
      .then(() => import("@main"));

    // for perf demo, perhaps consider ServiceWorker / caching?
  };
  
  bootstrap_application();
})();
