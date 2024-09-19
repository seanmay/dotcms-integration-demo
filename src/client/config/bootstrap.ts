const import_path = "config/importmap.json";

const bootstrap_application = () => {
  // for raw build, just append importmap and import @main
  fetch(import_path).then(res => res.text())
    .then((content) => {
      const script = document.createElement("script");
      script.type = "importmap";
      script.textContent = content;
      document.head.append(script);
    })
    .then(() => import("@main"));

  // for perf demo, perhaps consider ServiceWorker / caching?

};

bootstrap_application();
