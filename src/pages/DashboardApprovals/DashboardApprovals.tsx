// src/pages/DashboardApprovals/DashboardApprovals.tsx
import React, { useState } from "react";
import { mockPendingApprovals } from "../../services/mockData";
import Sidebar from "../../components/Sidebar/SideBar";
import Card from "../../components/Card/Card";
import Button from "../../components/Button/Button";

interface Approval {
  id: string | number;
  projectTitle: string;
  category: string;
  submittedBy: string;
  submissionDate: string;
}

const DashboardApprovals: React.FC = () => {
  const [approvals, setApprovals] = useState<Approval[]>(mockPendingApprovals);

  const handleApprove = (id: string | number) => {
    if (window.confirm("Aprovar este projeto?")) {
      setApprovals(approvals.filter((a) => a.id !== id));
      alert("Projeto aprovado com sucesso!");
    }
  };

  const handleReject = (id: string | number) => {
    if (window.confirm("Rejeitar este projeto?")) {
      setApprovals(approvals.filter((a) => a.id !== id));
    }
  };

  return (
    <div className="flex min-h-screen bg-(--color-surface)">
      <Sidebar />

      <main className="flex-1 p-8 overflow-y-auto md:p-4">
        <div className="mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-(--color-text) mb-2">
              Aprovações Pendentes
            </h1>
            <p className="text-lg text-(--color-text-secondary)">
              Gerencie as solicitações de novos projetos
            </p>
          </div>
        </div>

        <div className="grid gap-6 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
          {approvals.length > 0 ? (
            approvals.map((approval) => (
              <Card
                key={approval.id}
                className="flex flex-col h-full bg-white"
              >
                <div className="flex justify-between items-center mb-4">
                  <span className="bg-emerald-100 text-(--color-primary) px-3 py-1 rounded-full text-xs font-semibold uppercase">
                    {approval.category}
                  </span>
                  <span className="text-(--color-text-secondary) text-sm">
                    {new Date(approval.submissionDate).toLocaleDateString()}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-(--color-text) mb-6 leading-snug">
                  {approval.projectTitle}
                </h3>

                <div className="flex items-center gap-3 mb-6 pt-4 border-t border-(--color-border)">
                  <div className="w-10 h-10 bg-(--color-secondary) text-white rounded-full flex items-center justify-center font-bold text-lg">
                    {approval.submittedBy.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-(--color-text) text-sm">
                      {approval.submittedBy}
                    </p>
                    <p className="text-xs text-(--color-text-secondary)">
                      Solicitante
                    </p>
                  </div>
                </div>

                <div className="mt-auto flex gap-3">
                  <Button
                    variant="primary"
                    fullWidth
                    onClick={() => handleApprove(approval.id)}
                  >
                    Aprovar
                  </Button>
                  <Button
                    variant="outline"
                    fullWidth
                    className="border-(--color-error) text-(--color-error) hover:bg-(--color-error) hover:text-white"
                    onClick={() => handleReject(approval.id)}
                  >
                    Rejeitar
                  </Button>
                </div>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center px-16 py-16 bg-white rounded-2xl flex flex-col items-center gap-4">
              <img
                src="/src/assets/icons/aprovacoes.svg"
                alt=""
                className="w-16 h-16 opacity-20"
              />
              <h3 className="text-2xl font-bold text-(--color-text)">
                Nenhuma aprovação pendente
              </h3>
              <p className="text-(--color-text-secondary)">
                Todos os projetos solicitados foram processados.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default DashboardApprovals;
