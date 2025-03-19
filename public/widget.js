const widgetDisplay = () => {
  const scriptTag = document.currentScript;
  if (!scriptTag) {
    return;
  }
  const jobId = scriptTag.getAttribute("data-job-id");
  const containerId =
    scriptTag.getAttribute("data-container-id") || "job-widget";
  const container = document.getElementById(containerId);
  if (!container) {
    console.log("Container not found");
    throw new Error("Container not found");
  }
  fetch(`http://localhost:3000/api/widget/job/${jobId}`)
    .then((response) => response.json())
    .then((job) => {
      const widgetHtml = `<div style="border: 1px solid orange; padding: 16px; border-radius: 8px; font-family: Arial, sans-serif;">
      <h1>${job.title}</h1>
      <p>${job.description}</p>
      <p>${job.id}</p>
        <p>${job.company}</p>
        <p>${job.location}</p>
      </div>`;
      container.innerHTML = widgetHtml;
    })
    .catch((err) => {
      container.innerHTML = `<p style="color: red;">Failed to load job data.</p>`;
      console.error("Error fetching job data:", err);
    });
};
widgetDisplay();
