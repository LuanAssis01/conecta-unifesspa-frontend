export type ApprovalStatus = 'pendente' | 'aprovado' | 'rejeitado';

export type PendingApproval = {
    id: number;
    projectTitle: string;
    submittedBy: string;
    submissionDate: string;
    status: ApprovalStatus;
    category: string;
}