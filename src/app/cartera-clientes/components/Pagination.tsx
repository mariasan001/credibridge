import "./Pagination.css"
interface Props {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}
export function Pagination({ currentPage, totalPages, onPageChange }: Props) {
  const getPages = () => {
    const pages: (number | string)[] = []
    if (totalPages <= 10) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }
    pages.push(1)
    if (currentPage > 3) pages.push("...")
    const start = Math.max(2, currentPage - 1)
    const end = Math.min(totalPages - 1, currentPage + 1)
    for (let i = start; i <= end; i++) {
      pages.push(i)
    }
    if (currentPage < totalPages - 2) pages.push("...")
    pages.push(totalPages)
    return pages
  }
  return (
    <div className="pagination">
      <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
        ←
      </button>
      {getPages().map((p, i) =>
        typeof p === "number" ? (
          <button
            key={i}
            className={`page-btn ${p === currentPage ? "active" : ""}`}
            onClick={() => onPageChange(p)}
          >
            {p}
          </button>
        ) : (
          <span key={i} className="dots">...</span>
        )
      )}
      <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
        →
      </button>
      <div className="pagination-jump">
        Página
        <select
          value={currentPage}
          onChange={(e) => onPageChange(Number(e.target.value))}
        >
          {Array.from({ length: totalPages }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
        de {totalPages}
      </div>
    </div>
  )
}
