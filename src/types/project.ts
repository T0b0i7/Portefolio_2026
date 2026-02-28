export interface Project {
    id: number;
    title: string;
    category: string;
    description: string;
    tags: string[];
    metrics: { impact: string; type: string };
    color: "primary" | "secondary" | "accent" | "warning";
    image?: string;
    images?: string[];
    url?: string;
    status?: string;
    locked?: boolean;
    featured?: boolean;
}
