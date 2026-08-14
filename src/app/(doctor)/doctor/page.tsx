export default function DoctorDashboardPage() {
  return (
    <section className="space-y-6">
      <div>
        <p className="text-sm font-semibold text-primary">Today</p>
        <h1 className="text-2xl font-bold text-slate-950">Doctor Dashboard</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {[
          ["Appointments", "12"],
          ["Waiting Patients", "4"],
          ["Completed Visits", "8"],
        ].map(([label, value]) => (
          <div key={label} className="rounded-lg border border-slate-200 bg-white p-5">
            <p className="text-sm font-medium text-slate-500">{label}</p>
            <p className="mt-3 text-3xl font-bold text-slate-950">{value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
