import type { VisitorWithJourney, VisitorEvent } from "@/hooks/useVisitorTracking";

export function exportToCSV(data: Record<string, unknown>[], filename: string) {
  if (data.length === 0) return;

  const headers = Object.keys(data[0]);
  const csvRows = [
    headers.join(","),
    ...data.map((row) =>
      headers
        .map((header) => {
          const value = row[header];
          const stringValue = String(value ?? "");
          if (stringValue.includes(",") || stringValue.includes('"') || stringValue.includes("\n")) {
            return `"${stringValue.replace(/"/g, '""')}"`;
          }
          return stringValue;
        })
        .join(",")
    ),
  ];

  const csvContent = csvRows.join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `${filename}-${new Date().toISOString().split("T")[0]}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function exportVisitorsToCSV(visitors: VisitorWithJourney[], filename = "visitors") {
  const data = visitors.map((v) => ({
    id: v.id,
    city: v.city,
    country: v.country,
    device: v.device,
    browser: v.browser,
    os: v.os,
    started_at: v.startedAt,
    last_seen: v.lastSeenAt,
    pages_visited: v.pagesVisited,
    clicks: v.clicksCount,
    sections_viewed: v.sectionsViewed,
    first_page: v.firstPage,
    last_page: v.lastPage,
  }));

  exportToCSV(data, filename);
}

export function exportJourneysToCSV(visitors: VisitorWithJourney[], filename = "journeys") {
  const rows: Record<string, unknown>[] = [];

  for (const visitor of visitors) {
    for (const event of visitor.journey) {
      rows.push({
        visitor_id: visitor.id,
        city: visitor.city,
        country: visitor.country,
        event_type: event.type,
        page_path: event.pagePath,
        section_id: event.sectionId,
        element_text: event.elementText,
        occurred_at: event.occurredAt,
      });
    }
  }

  exportToCSV(rows, filename);
}