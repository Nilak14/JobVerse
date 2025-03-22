(function () {
  const scriptTag = document.currentScript;
  if (!scriptTag) return;

  const configParams = new URLSearchParams(
    scriptTag.getAttribute("data-config")
  );

  const jobId = configParams.get("jobId");
  const primaryColor = configParams.get("primaryColor") || "#3498db";
  const secondaryColor = configParams.get("secondaryColor") || "#2ecc71";
  const accentColor = configParams.get("accentColor") || "#f1f1f1";
  let borderRadius = configParams.get("borderRadius") || "8";
  if (!borderRadius.endsWith("px")) {
    borderRadius = borderRadius + "px";
  }
  const showLogo = configParams.get("showLogo") === "true";
  const showApplyButton = configParams.get("showApplyButton") === "true";
  const note = configParams.get("note") || "";
  const showBranding = configParams.get("showBranding") === "true";
  const productionURL = "https://jobverse.me";
  const developmentURL = "http://localhost:3000";

  const containerId =
    scriptTag.getAttribute("data-container-id") || "job-widget";

  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`Container with id "${containerId}" not found.`);
    return;
  }

  // Display a loading skeleton until data is loaded.
  container.innerHTML = `
    <div style="margin: 0 auto; background-color: #f0f0f0; border-radius: ${borderRadius}; box-shadow: 0 2px 10px rgba(0,0,0,0.1); padding: 20px; text-align: center;">
      <p style="color: ${secondaryColor}; font-family: Arial, sans-serif;">Loading job details...</p>
    </div>
  `;

  fetch(`${productionURL}/api/widget/job/${jobId}`)
    .then((response) => {
      if (!response.ok) throw new Error("Network response was not ok");
      return response.json();
    })
    .then(({ job, subscription }) => {
      if (subscription === "FREE") {
        container.innerHTML = `<p style="color: red;">
        ERROR FROM JOBVERSE:
        Upgrade Your Subscription Level to use this feature</p>`;
        return;
      }
      if (subscription === "PRO") {
        if (
          primaryColor !== "#f97316" ||
          secondaryColor !== "black" ||
          accentColor !== "#FFF5E6" ||
          borderRadius !== "8" ||
          showLogo !== "true" ||
          showApplyButton !== "true" ||
          note !== "" ||
          showBranding !== "true"
        ) {
          container.innerHTML = `<p style="color: red;">
     ERROR FROM JOBVERSE:
     Your subscription level does not allow you to customize the widget.
     </p>`;
          return;
        }
      }

      // Helper functions
      function formatDate(dateStr) {
        const date = new Date(dateStr);
        return date.toLocaleDateString();
      }

      function renderSalaryText({
        displayType,
        currency,
        exactAmount,
        maxAmount,
        startingAmount,
      }) {
        if (!displayType) return "";
        switch (displayType) {
          case "Exact":
            return `${currency} ${exactAmount}`;
          case "Range":
            return `${currency} ${startingAmount} - ${currency}${maxAmount}`;
          case "Maximum":
            return `${currency} ${maxAmount} (max)`;
          case "Starting":
            return `${currency} ${startingAmount} (starting)`;
          default:
            return "";
        }
      }

      const widgetHTML = `
      <div style="margin: 0 auto; background-color: white; border-radius: ${borderRadius}; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);">
        <div style="display: flex; align-items: center; padding: 20px; border-bottom: 1px solid #eee;">
          ${
            showLogo && job.company && job.company.logoUrl
              ? `
            <div style="width: 70px; height: 70px; background-color: #f8f8f8; border-radius: ${borderRadius}; overflow: hidden; margin-right: 15px; display: flex; justify-content: center; align-items: center;">
              <img src="${job.company.logoUrl}" alt="${job.company.name}" style="max-width: 100%; max-height: 100%;" />
            </div>
          `
              : ""
          }
          <div>
            <h2 style="margin: 0; color: ${primaryColor}; font-size: 20px;">${job.title}</h2>
            <p style="color: ${secondaryColor}; font-size: 12px; margin-top: 1px;">${job.company.name}</p>
            <div style="display: flex; align-items: center; margin-top: 5px;">
              <p style="background-color: ${accentColor}; color: ${primaryColor}; font-weight: bold; font-size: 12px; margin-right: 15px; display: flex; border-radius: ${borderRadius}; padding: 5px 10px; align-items: center;">
                <span>${job.location}</span>
              </p>
              <p style="background-color: ${accentColor}; color: ${primaryColor}; font-weight: bold; font-size: 12px; margin-right: 15px; display: flex; border-radius: ${borderRadius}; padding: 5px 10px; align-items: center;">
                <span>${job.workMode}</span>
              </p>
              <p style="background-color: ${accentColor}; color: ${primaryColor}; font-weight: bold; font-size: 12px; margin-right: 15px; display: flex; border-radius: ${borderRadius}; padding: 5px 10px; align-items: center;">
                <span>${job.jobType} Job</span>
              </p>
            </div>
          </div>
        </div>
        <div style="padding: 20px;">
          <div style="margin-top: 15px; display: flex; flex-wrap: wrap; justify-content: space-between;">
            <div style="background-color: ${accentColor}; color: ${primaryColor}; padding: 10px; border-radius: ${borderRadius}; margin-bottom: 10px; width: 45%;">
              <div style="font-size: 13px; color: ${primaryColor}; margin-bottom: 3px;">Salary</div>
              <div style="font-weight: bold;">
                <span>
                  ${renderSalaryText({
                    displayType: job.Salary ? job.Salary.type : null,
                    currency: job.Salary ? job.Salary.currency : "",
                    exactAmount: job.Salary ? job.Salary.amount : "",
                    maxAmount: job.Salary ? job.Salary.maxAmount : "",
                    startingAmount: job.Salary ? job.Salary.minAmount : "",
                  })}
                </span>
                <span style="font-size: 12px;"> / ${job.Salary ? job.Salary.rate : ""}</span>
              </div>
            </div>
            <div style="background-color: ${accentColor}; color: ${primaryColor}; padding: 10px; border-radius: ${borderRadius}; margin-bottom: 10px; width: 45%;">
              <div style="font-size: 13px; color: ${primaryColor}; margin-bottom: 3px;">Experience</div>
              <div style="font-weight: bold;">+${job.experienceLevel} years</div>
            </div>
          </div>
          ${
            note
              ? `
          <div style="background-color: ${accentColor}; color: ${primaryColor}; padding: 10px; border-radius: ${borderRadius}; margin-bottom: 10px; width: 100%;">
            <div style="font-size: 13px; color: ${primaryColor}; margin-bottom: 3px;">${note}</div>
          </div>
          `
              : ""
          }
          <div style="margin-top: 25px; display: flex; justify-content: space-between; align-items: center; padding-top: 15px; border-top: 1px solid #eee;">
            <div>
              <div style="font-size: 13px; color: ${secondaryColor};">
                <span style="color: ${primaryColor};">Posted:</span> ${formatDate(job.createdAt)}
              </div>
              <div style="font-size: 13px; color: ${secondaryColor}; margin-top: 5px;">
                <span style="color: ${primaryColor};">Deadline:</span> ${formatDate(job.deadline)}
              </div>
            </div>
            ${
              showApplyButton
                ? `
              <a target="_blank" style="color: white; text-decoration: none;" href="${productionURL}/job/description/${jobId}">
                <button style="background-color: ${primaryColor}; color: white; border: none; padding: 10px 20px; border-radius: ${borderRadius}; font-weight: bold; cursor: pointer; font-size: 15px;">
                  Apply Now
                </button>
              </a>
            `
                : ""
            }
          </div>
        </div>
        ${
          showBranding
            ? `
        <p style="color: black; text-align: center; padding-bottom: 10px; font-size: 12px;">
          Powered By <a href="${productionURL}" target="_blank" style="color: ${primaryColor}; font-weight: bold;">JobVerse</a>
        </p>
        `
            : ""
        }
      </div>
      `;

      container.innerHTML = widgetHTML;
    })
    .catch((err) => {
      container.innerHTML = `<p style="color: red;">Failed to load job data.</p>`;
      console.error("Error fetching job data:", err);
    });
})();
