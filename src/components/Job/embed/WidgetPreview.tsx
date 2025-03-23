"use client";
import { JobDataBrowse } from "@/lib/prisma-types/Job";
import { WidgetConfig } from "@/lib/types";
import { formatDate, renderSalaryText } from "@/lib/utils";

interface WidgetPreviewProps {
  job: JobDataBrowse;
  config: WidgetConfig;
}

export default function WidgetPreview({ job, config }: WidgetPreviewProps) {
  const borderRadius = config.borderRadius;
  const primaryColor = config.primaryColor;
  const secondaryColor = config.secondaryColor;
  const accentColor = config.accentColor;
  const note = config.note;
  return (
    <div
      style={{
        margin: "0 auto",
        backgroundColor: "white",
        borderRadius: borderRadius,
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: 20,
          borderBottom: "1px solid #eee",
        }}
      >
        {config.showLogo && (
          <div
            style={{
              width: 70,
              height: 70,
              backgroundColor: "#f8f8f8",
              borderRadius: borderRadius,
              overflow: "hidden",
              marginRight: 15,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={job.company.logoUrl!}
              alt={job.company.name!}
              style={{ maxWidth: "100%", maxHeight: "100%" }}
            />
          </div>
        )}
        <div>
          <h2 style={{ margin: 0, color: primaryColor, fontSize: 20 }}>
            {job.title}
          </h2>
          <p style={{ color: secondaryColor, fontSize: 12, marginTop: -4 }}>
            {job.company.name}
          </p>
          <div style={{ display: "flex", alignItems: "center", marginTop: 5 }}>
            <p
              style={{
                backgroundColor: accentColor,
                color: primaryColor,
                fontWeight: "bold",
                fontSize: 12,
                marginRight: 15,
                display: "flex",
                borderRadius: borderRadius,
                padding: "5px 10px",
                alignItems: "center",
              }}
            >
              <span>{job.location}</span>
            </p>
            <p
              style={{
                backgroundColor: accentColor,
                color: primaryColor,
                fontWeight: "bold",
                fontSize: 12,
                marginRight: 15,
                display: "flex",
                borderRadius: borderRadius,
                padding: "5px 10px",
                alignItems: "center",
              }}
            >
              <span>{job.workMode}</span>
            </p>
            <p
              style={{
                backgroundColor: accentColor,
                color: primaryColor,
                fontWeight: "bold",
                fontSize: 12,
                marginRight: 15,
                display: "flex",
                borderRadius: borderRadius,
                padding: "5px 10px",
                alignItems: "center",
              }}
            >
              <span>{job.jobType} Job</span>
            </p>
          </div>
        </div>
      </div>
      {/* Job details */}
      <div style={{ padding: 20 }}>
        <div
          style={{
            marginTop: 15,
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              backgroundColor: accentColor,
              color: primaryColor,
              padding: 10,
              borderRadius: borderRadius,
              marginBottom: 10,
              width: "45%",
            }}
          >
            <div style={{ fontSize: 13, color: primaryColor, marginBottom: 3 }}>
              Salary
            </div>
            <div style={{ fontWeight: "bold" }}>
              <span>
                {renderSalaryText({
                  displayType: job?.Salary?.type as
                    | "Maximum"
                    | "Starting"
                    | "Range"
                    | "Exact"
                    | null,
                  currency: job?.Salary?.currency,
                  exactAmount: job?.Salary?.amount,
                  maxAmount: job?.Salary?.maxAmount,
                  startingAmount: job?.Salary?.minAmount,
                })}
              </span>
              <span style={{ fontSize: 12 }}> / {job?.Salary?.rate}</span>
            </div>
          </div>
          <div
            style={{
              backgroundColor: accentColor,
              color: primaryColor,
              padding: 10,
              borderRadius: borderRadius,
              marginBottom: 10,
              width: "45%",
            }}
          >
            <div style={{ fontSize: 13, color: primaryColor, marginBottom: 3 }}>
              Experience
            </div>
            <div style={{ fontWeight: "bold" }}>
              +{job.experienceLevel} years
            </div>
          </div>
        </div>
        {note && (
          <div
            style={{
              backgroundColor: accentColor,
              color: primaryColor,
              padding: 10,
              borderRadius: borderRadius,
              marginBottom: 10,
              width: "100%",
            }}
          >
            <div style={{ fontSize: 13, color: primaryColor, marginBottom: 3 }}>
              {note}
            </div>
          </div>
        )}
        <div
          style={{
            marginTop: 25,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: 15,
            borderTop: "1px solid #eee",
          }}
        >
          <div>
            <div style={{ fontSize: 13, color: secondaryColor }}>
              <span style={{ color: primaryColor }}>Posted:</span>{" "}
              {formatDate(job.createdAt!)}
            </div>
            <div style={{ fontSize: 13, color: secondaryColor, marginTop: 5 }}>
              <span style={{ color: primaryColor }}>Deadline:</span>{" "}
              {formatDate(job.deadline!)}
            </div>
          </div>
          {config.showApplyButton && (
            <button
              style={{
                backgroundColor: primaryColor,
                color: "white",
                border: "none",
                padding: "10px 20px",
                borderRadius: borderRadius,
                fontWeight: "bold",
                cursor: "pointer",
                fontSize: 15,
              }}
            >
              Apply Now
            </button>
          )}
        </div>
      </div>
      {config.showBranding && (
        <p
          style={{
            color: "black",
            textAlign: "center",
            paddingBottom: "10px",
            fontSize: "12px",
          }}
        >
          Powered By{" "}
          <span style={{ color: primaryColor, fontWeight: "bold" }}>
            JobVerse
          </span>
        </p>
      )}
    </div>
  );
}
