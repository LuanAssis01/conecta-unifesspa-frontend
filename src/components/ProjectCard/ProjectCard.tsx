import Button from "../Button/Button";
import { Project } from "../../types";
import { Calendar, User } from "lucide-react";

interface ProjectCardProps {
  project: Project;
  showActions?: boolean;
  showDate?: boolean;
  showCourse?: boolean;
  showImage?: boolean;
  onEdit?: (project: Project) => void;
  onDelete?: (project: Project) => void;
  onView?: (project: Project) => void;
}

const ProjectCard = ({
  project,
  showActions = false,
  showDate = true,
  showCourse = true,
  showImage = true,
  onEdit,
  onDelete,
  onView,
}: ProjectCardProps) => {
  const getStatusBadge = (status: string) => {
    const statusMap: Record<
      string,
      { text: string; className: string; dotColor: string }
    > = {
      ACTIVE: {
        text: "Ativo",
        className: "bg-green-50 text-green-700 border-green-200",
        dotColor: "bg-green-500",
      },
      SUBMITTED: {
        text: "Aguardando Aprovação",
        className: "bg-yellow-50 text-yellow-700 border-yellow-200",
        dotColor: "bg-yellow-500",
      },
      FINISHED: {
        text: "Finalizado",
        className: "bg-gray-50 text-gray-700 border-gray-200",
        dotColor: "bg-gray-500",
      },
      APPROVED: {
        text: "Aprovado",
        className: "bg-blue-50 text-blue-700 border-blue-200",
        dotColor: "bg-blue-500",
      },
      REJECTED: {
        text: "Rejeitado",
        className: "bg-red-50 text-red-700 border-red-200",
        dotColor: "bg-red-500",
      },
    };

    return statusMap[status] || statusMap.ACTIVE;
  };

  const statusBadge = getStatusBadge(project.status);

  return (
    <div
      onClick={() => onView && onView(project)}
      className="
      bg-white rounded-2xl overflow-hidden shadow-sm border border-[var(--color-border)]
      transition-all duration-300 h-full flex flex-col cursor-pointer
      hover:-translate-y-1 hover:shadow-xl group
    ">
      {showImage && project.image && (
        <div className="relative w-full h-[220px] overflow-hidden">
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 z-10" />
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
          />

          {showCourse && (
            <div className="absolute top-4 left-4 z-20">
              <span className={`
                flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide
                bg-white/90 backdrop-blur-sm shadow-sm border border-gray-100 text-[var(--color-text-secondary)]
              `}>
                {project.course || project.category}
              </span>
            </div>
          )}
        </div>
      )}

      <div className="p-6 flex flex-col flex-1">
        <div className="flex justify-between items-start gap-4 mb-3">
          <div className={`
              inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold border
              ${statusBadge.className}
            `}>
            <span className={`w-2 h-2 rounded-full ${statusBadge.dotColor}`}></span>
            {statusBadge.text}
          </div>
        </div>

        <h3 className="text-xl font-bold text-[var(--color-text)] leading-tight mb-3 group-hover:text-[var(--color-primary)] transition-colors">
          {project.title}
        </h3>

        <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed mb-6 flex-1 line-clamp-3">
          {project.subtitle || project.description}
        </p>

        <div className="flex items-center gap-4 pt-4 border-t border-[var(--color-border)] mt-auto">
          {project.coordinator && (
            <div className="flex items-center gap-2 text-xs text-[var(--color-text-secondary)] font-medium">
              <User size={14} className="text-[var(--color-primary)]" />
              <span>{project.coordinator}</span>
            </div>
          )}
        </div>

        {showActions && (onEdit || onDelete) && (
          <div className="flex gap-2 mt-4 pt-4 border-t border-[var(--color-border)]">
            {onEdit && (
              <Button variant="secondary" size="small" onClick={(e) => { e.stopPropagation(); onEdit(project); }} className="flex-1">
                Editar
              </Button>
            )}
            {onDelete && (
              <Button variant="danger" size="small" onClick={(e) => { e.stopPropagation(); onDelete(project); }} className="flex-1">
                Excluir
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
