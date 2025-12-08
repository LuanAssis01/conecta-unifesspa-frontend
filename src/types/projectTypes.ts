export type ProjectStatus = 'SUBMITTED' | 'APPROVED' | 'REJECTED' | 'ACTIVE' | 'FINISHED';

export type Project = {
    id: number;
    title: string;
    description: string;
    image: string;
    status: ProjectStatus;
    category: string;
    coordinator: string;
    participants: number;
    startDate: string;
    endDate: string;
}