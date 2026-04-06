import "./table.css";

export default function AnalyticsTable() {
  const data = [
    {
      name: "Toko Kopi Sejahtera",
      date: "20 Apr 2024",
      investment: "Rp 20.000.000",
      roi: "180%",
      status: "Completed",
    },
  ];

  return (
    <div className="table-container">
      <h3>New Analytics</h3>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Investment</th>
            <th>ROI</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item, i) => (
            <tr key={i}>
              <td>{item.name}</td>
              <td>{item.date}</td>
              <td>{item.investment}</td>
              <td>{item.roi}</td>
              <td className="status">{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}