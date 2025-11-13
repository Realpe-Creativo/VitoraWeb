export function formatDateISO(iso: string) {
    // Asume YYYY-MM-DD; si viene con tiempo, igual funciona
    const d = new Date(iso);
    // Asegura formato DD/MM/YYYY en zona local
    return d.toLocaleDateString("es-CO", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });
}